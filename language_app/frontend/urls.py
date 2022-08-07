from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('learn/', index),
    path('learn/<slug:language>/', index),
    path('learn/<str:language>/<slug:character>/', index),
    path('login/', index),
]
