from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Greeting
from kerasmodel import chatbot
from kerasmodel import matchQuestions
import urllib.request
import requests
import json   

 
# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    return render(request, "index.html")

def questions(request):
    # return HttpResponse('Hello from Python!')
    return render(request, "questions.html")

	

@csrf_exempt 
def chatresponse(request):
    user_text = request.GET.get("user_text", "");
    res = chatbot.response(user_text);
    return HttpResponse(res)

@csrf_exempt 
def questionMatch(request):
    a_question = request.POST.get("a_question", "");
    all_question = request.POST.get("all_question", "");
    print("a_question post: " , a_question);
    #print("a_question get:::##  " , request.GET.get("a_question", ""));
    print("all_question: " , all_question);
    res =  matchQuestions.response(a_question, json.loads(all_question));
    return HttpResponse(res)
     
def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, "db.html", {"greetings": greetings})
