from django.urls import path, include
from .views import hiragana,katakana

urlpatterns = [
    path('hiragana/', hiragana),
    path('katakana/', katakana),

    path('account/',include('api.account.urls')),
]
