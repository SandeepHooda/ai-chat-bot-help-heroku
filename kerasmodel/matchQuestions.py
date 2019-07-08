
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

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

ps = PorterStemmer()
regex = re.compile('[^a-zA-Z0-9 ]')
def getStemSentence(question):
   word_tokens = nltk.word_tokenize(regex.sub('', question).lower()) 
   stemSentence = "";
   for w in word_tokens:
      stemSentence += ps.stem(w) + ' '
   return stemSentence.rstrip();



nltk.download('punkt') # first-time use only # for downloading packages
nltk.download('wordnet') # first-time use only # for downloading packages
#sent_tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')
sentences_tokens_answers = []


lemmer = nltk.stem.WordNetLemmatizer()
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]
remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))




# Generating response
def response(user_query, reminders ):
    sentences_tokens = []
    for a_reminder in reminders:
       sentences_tokens.append(getStemSentence(a_reminder))
    #Term frequency gives a sparse matric of length equal to the size of dictionary
    #inverse document frequency penalises teh most frequent terms e.g. that, that. by keeping their frequency count less even for the same number of occurance 
    #of less frequent words
    #TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    TfidfVec = TfidfVectorizer()
    #tfidf contains the frequency matrix for each document/question sentence. So if there are 20 questions the its size is [20][dictionary size]
    tfidf = TfidfVec.fit_transform(sentences_tokens)
    user_chat_text_org = user_query
    user_query = getStemSentence(user_query)
    chatterBot_response=''
    #tfidf_user size is [1][dictionary size]. It contains TFIDF for users question
    tfidf_user = TfidfVec.transform([user_query])
    #vals contains the similarity index of user's question w.r.t. each questions in the corpus.
    vals = cosine_similarity(tfidf_user, tfidf)
    #argsort Returns the indices that would sort an array. take the last element whoich gives the index of most similar question
    idx=vals.argsort()[0][-1]
    flat = vals.flatten()
    flat.sort()
    #req_tfidf contains the similarity coeficient of most similar question. 0 means that noi match found 
    req_tfidf = flat[-1]
    if(req_tfidf==0):
        return ""
    else:
        return reminders[idx]
        

"""
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
            print("ChatterBot: ",end="")
            print(response(user_response, ["dentist","GSt","NPS contribution","Gurukul fee","Pollution check","cars service"]))
                
    else:
        flag=False
        print("ChatterBot: Bye! have a nice day..")  
		
"""