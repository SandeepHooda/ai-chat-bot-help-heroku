
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
   #print(word_tokens)
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
with open('faq.json') as json_file:  
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


INPUTS = ("hello", "hi", "greetings", "good morning", "good evening","good afternoon",)
RESPONSES = ["hi", "hello",]



# Checking for greetings
def greeting(sentence):
    """If user's input is a greeting, return a greeting response"""
    for word in sentence.split():
        if word.lower() in INPUTS:
            return random.choice(RESPONSES)


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
#Term frequency gives a sparse matric of length equal to the size of dictionary
#inverse document frequency penalises teh most frequent terms e.g. that, that. by keeping their frequency count less even for the same number of occurance 
#of less frequent words
#TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
TfidfVec = TfidfVectorizer()
#tfidf contains the frequency matrix for each document/question sentence. So if there are 20 questions the its size is [20][dictionary size]
print(sentences_tokens)
tfidf = TfidfVec.fit_transform(sentences_tokens)

# Generating response
def response(user_chat_text):
    #print(user_chat_text)
    user_chat_text = getStemSentence(user_chat_text)
    #print(user_chat_text)
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
        greeting_text = greeting(user_chat_text)
        
        if(greeting_text!=None):
             return greeting_text
        chatterBot_response="I am sorry! I am not able to get you"
        return chatterBot_response
    else:
        print(sentences_tokens[idx])
        return sentences_tokens_answers[idx]
        


flag=True
print("MS Chat Bot: My name is MS Chat Bot. I will answer your queries about MS Chat Bot. If you want to exit, sat bye or thanks!")

while(flag==True):
    user_response = input()
    user_response=user_response.lower()
    if(user_response!='bye'):
        if(user_response=='thanks' or user_response=='thank you' ):
            flag=False
            print("ChatterBot: You are welcome..")
        else:
            if(greeting(user_response)!=None):
                print("ChatterBot: "+greeting(user_response))
            else:
                print("ChatterBot: ",end="")
                print(response(user_response))
                
    else:
        flag=False
        print("ChatterBot: Bye! have a nice day..")    
        
        

