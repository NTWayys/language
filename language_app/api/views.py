from django.shortcuts import render
from django.http import JsonResponse
from .endpoints import Hiragana ,Katakana


def hiragana(request):
    return JsonResponse(Hiragana.Dict) 

def katakana(request):
    return JsonResponse(Katakana.Dict) 