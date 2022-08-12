from django.urls import path, include
from .views import hiragana

urlpatterns = [
    path('hiragana', hiragana),
    path('account/',include('api.account.urls')),
]
