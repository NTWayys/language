from django.shortcuts import render
from django.http import JsonResponse
from .endpoints import Hiragana


def hiragana(request):
    return JsonResponse(Hiragana.Dict) 