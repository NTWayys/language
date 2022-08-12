from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('japanese/', index),
    path('japanese/<slug:language>/', index),
    path('japanese/<str:language>/<slug:character>/', index),
    path('login/', index),
]
