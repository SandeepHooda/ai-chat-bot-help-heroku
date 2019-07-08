
# coding: utf-8

# # Meet MS Chat Bot:

import nltk
import warnings
warnings.filterwarnings("ignore")

# nltk.download() # for downloading packages

import random
import io
import string # to process standard python strings
import json
from nltk.stem import PorterStemmer
from nltk.tokenize import sent_tokenize, word_tokenize
import re

ps = PorterStemmer()
regex = re.compile('[^a-zA-Z0-9 ]')
def getStemSentence(question):
   word_tokens = nltk.word_tokenize(regex.sub('', question).lower()) 
   stemSentence = "";
   for w in word_tokens:
      stemSentence += ps.stem(w) + ' '
   return stemSentence.rstrip();

#readFile=io.open('kerasmodel/data.txt','r',errors = 'ignore')
#data=readFile.read()
#lowerData=data.lower()# converts to lowercase

nltk.download('punkt') # first-time use only # for downloading packages
nltk.download('wordnet') # first-time use only # for downloading packages
sent_tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
sentences_tokens_answers = []
sentences_tokens = [] #nltk.sent_tokenize(lowerData)# converts to list of sentences 
data = {};
with open('kerasmodel/faq.json') as json_file:  
    data = json.load(json_file)
    for faq in data['faqs']:
        for question in faq['questions']:
             sentences_tokens_answers.append(faq['answer'])
             sentences_tokens.append(getStemSentence(question))
        

lemmer = nltk.stem.WordNetLemmatizer()
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]
remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


INPUTS = ("hello", "hi", "greetings", "good morning", "good evening","good afternoon")
RESPONSES = ["hi", "hello"]

end_INPUTS = ("thanks","bye", "Have a nice day", "Have a good day")
end_RESPONSES = ["Have a good day"]




# Checking for greetings
def greeting(sentence):
    """If user's input is a greeting, return a greeting response"""
    if sentence.lower() in INPUTS:
       return random.choice(RESPONSES)
    for word in sentence.split():
        if word.lower() in INPUTS:
            return random.choice(RESPONSES)

def end(sentence):
    """If user's input is a greeting, return a greeting response"""
    if sentence.lower() in end_INPUTS:
       return random.choice(end_RESPONSES)
    for word in sentence.split():
        if word.lower() in end_INPUTS:
            print("checking " ,word.lower())  
            return random.choice(end_RESPONSES)

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
#Term frequency gives a sparse matric of length equal to the size of dictionary
#inverse document frequency penalises teh most frequent terms e.g. that, that. by keeping their frequency count less even for the same number of occurance 
#of less frequent words
#TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
TfidfVec = TfidfVectorizer()
#tfidf contains the frequency matrix for each document/question sentence. So if there are 20 questions the its size is [20][dictionary size]
tfidf = TfidfVec.fit_transform(sentences_tokens)

# Generating response
def response(user_chat_text):
    user_chat_text_org = user_chat_text
    user_chat_text = getStemSentence(user_chat_text)
    chatterBot_response=''
    #tfidf_user size is [1][dictionary size]. It contains TFIDF for users question
    tfidf_user = TfidfVec.transform([user_chat_text])
    #vals contains the similarity index of user's question w.r.t. each questions in the corpus.
    vals = cosine_similarity(tfidf_user, tfidf)
    #argsort Returns the indices that would sort an array. take the last element whoich gives the index of most similar question
    idx=vals.argsort()[0][-1]
    flat = vals.flatten()
    flat.sort()
    #req_tfidf contains the similarity coeficient of most similar question. 0 means that noi match found 
    req_tfidf = flat[-1]
    if(req_tfidf==0):
        greeting_text = greeting(user_chat_text_org)
        end_text = end(user_chat_text_org)
        if(greeting_text!=None):
             return greeting_text
        if(end_text!=None):
             return end_text
        chatterBot_response="I am sorry! I am not able to get you"
        return chatterBot_response
    else:
        return sentences_tokens_answers[idx]
        


flag=True
print("MS Chat Bot: My name is MS Chat Bot. I will answer your queries about MS Chat Bot. If you want to exit, sat bye or thanks!")

"""while(flag==True):
    user_chat_text = input()
    user_chat_text=user_chat_text.lower()
    if(user_chat_text!='bye'):
        if(user_chat_text=='thanks' or user_chat_text=='thank you' ):
            flag=False
            print("MS Chat Bot: You are welcome..")
        else:
            if(greeting(user_chat_text)!=None):
                print("MS Chat Bot: "+greeting(user_chat_text))
            else:
                print("MS Chat Bot: ",end="")
                print(response(user_chat_text))
                sentences_tokens.remove(user_chat_text)
    else:
        flag=False
        print("MS Chat Bot: Bye! have a nice day..")    
        
"""       