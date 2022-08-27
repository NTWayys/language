pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers


# language

A web app that will allow me to keep track of my language learning progress

As I was studying Japanese I came across a guide which explains that you should be learning with pictures as a way to 'bind' the word with an image allowing you to memorize the word easily.

The app will provide the user with a place to enter words and upload an image with the word such as 林檎 | りんご | image | Ringo | apple -- currently it is based on user input as I do not know enough of the language to build my own database as well as actually having to upload the input yourself could help in remembering.

There will also be a test mode, which will test you on ones you uploaded. with options to see one of the inputs E.g the image   

<img src="./appleExample.png" width="350" alt="accessibility text">

Making this as my own code along / guide

## Django setup


if struggling with server port in use "sudo fuser -k 8000/tcp"

run below to add django and rest_framework

    pip install django djangorestframework
    django-admin startproject name-of-project

add rest_framework to the bottom of settings.py

    E.g:
    INSTALLED_APP =[
    ...
    'rest_framework',]

run below to add app

    django-admin startapp app-name # I will use frontend

add app-name to the bottom of settings.py

    E.g: 
    INSTALLED_APP =[
    ...
    'frontend.apps.FrontendConfig',] # this can be found in apps.py the first class

### Add URLS

#### Create end points

Add the end points to urls.py file in the main app (includes settings.py file)

    path('end-point-name/', include('app-name.urls')),

and add 'includes' to the import

    from django.urls import path, include

Create a urls.py file in your new app (does NOT include settings.py file)

#### Create a view and add it to urls.py

Inside views.py (app that does NOT include settings.py file) add

> HttpResponse is temporary so we can test if it's working

    from django.shortcuts import render
    from django.http import HttpResponse
    # Create your views here.
    def index(request):
        return HttpResponse("<h1>Working</h1>")

Inside urls.py (same folder) add

    from django.urls import path
    from .views import index
    urlpatterns = [
        path('', index)
    ]

#### Test that all is working by running the server

Run the following commands from the main directory to test that all is working

    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver

## React setup

In your frontend app create the following folders

    .
    ├─ static/
    │    ├─ frontend
    │    ├─ css
    │    └─ images
    ├─ templates/
    │    └─ frontend
    └─ src/
         └─ components

Once done run

    npm init -y
    npm i webpack webpack-cli --save-dev
    npm i react react-dom --save-dev
    npm install react-router-dom
    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
    npm install @babel/plugin-proposal-class-properties

Create a babel.config.json file and paste the following

    {
      "presets": [
        [
          "@babel/preset-env",
          {
            "targets": {
              "node": "10"
            }
          }
        ],
        "@babel/preset-react"
      ],
      "plugins": ["@babel/plugin-proposal-class-properties"]
    }

Create a webpack.config.js file and paste the following

    const path = require("path");
    const webpack = require("webpack");
    module.exports = {
      entry: "./src/App.js",
      output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
      },
      module: {
        rules: [
          {
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/,
          },
        ],
      },
      optimization: {
        minimize: true,
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            // This has effect on the react lib size
            NODE_ENV: JSON.stringify("development"),
          },
        }),
      ],
    };

Inside package.json find "scripts": and update it to the following

    "scripts": {
        "dev": "webpack --mode development --watch",
        "build": "webpack --mode production"
    },

Inside src folder create a index.js file and inside templates/frontend folder create a index.html file

    .
    ├─ static/
    │    ├─ frontend
    │    ├─ css
    │    └─ images
    ├─ templates/
    │    └─ frontend
    │           └─ index.html # created file
    └─ src/
         ├─ components
         └─ App.js # created file

Add the default index.html code !-Emmet and add the following

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        {% load static %}  <!-- add this -->
        <title>Document</title>
        <link rel="stylesheet" type="text/css" href="{% static "css/index.css" %}"/> <!-- add this; it's css -->
    </head>
    <body>
        <div id="main"> <!-- add this -->
            <div id="appRoot"></div> <!-- add this -->
        </div> <!-- add this -->
        <script src="{% static "frontend/main.js"%}"> </script> <!-- add this; it's JS files / React; cant close with "/>"-->
    </body>
    </html>

In views.py update the code to

    from django.shortcuts import render
    # Create your views here.
    def index(request, *args, **kawrgs):
        return render(request, 'frontend/index.html')

In src/App.js you can create your React app

Create React component inside src/components

Run the following to see if all is working.

    npm run dev                         #inside the frontend folder
    python manage.py makemigrations     #inside the main folder
    python manage.py migrate            #inside the main folder
    python manage.py runserver          #inside the main folder


## User authentication

### create the folder for the API endpoint

create a api app

    django-admin startapp app-name # I will use api

add app-name to the bottom of settings.py

    E.g. INSTALLED_APP =[
    ...
    'api.apps.ApiConfig',] # this can be found in apps.py the first class
    
once made go into the api folder and add the following.

    from django.urls import path, include
    from .views import main
    urlpatterns = [
        path('', main),
        path('account/',include('api.account.urls')),
    ]

in the views.py file add

    from django.shortcuts import render
    from django.http import HttpResponse
    # Create your views here.
    def main(request):
        return HttpResponse("<h1>Working</h1>")

inside the api app create an "account" folder 
and create the following files

    __init__.py
    serializers.py
    urls.py
    views.py

add the following to urls.py

    from django.urls import path
    from . import views
    from rest_framework_simplejwt.views import (
        TokenObtainPairView,
        TokenRefreshView,
    )
    urlpatterns = [
        path('', views.getRoutes),
        path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ]

add the following to views.py

    from rest_framework.response import Response
    from rest_framework.decorators import api_view
    # Create your views here.
    @api_view(['GET'])
    def getRoutes(request):
        routes = [
            '/account/token',
            '/account/refresh'
        ]
        return Response(routes)

once done Add the end points to urls.py file in the main app (includes settings.py file)

    path('end-point-name/', include('app-name.urls')),

Run the following command to install django JWT

    pip install djangorestframework-simplejwt

inside settings.py add the following under installed apps

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        )
    }

can now login at the following URL if we had a user http://localhost:8000/api/account/token/

Create a user by stopping the server then running the following
    
    python manage.py createsuperuser

fill in the details and run "runserver" once more

    python manage.py runserver

now try logging in at http://localhost:8000/api/account/token/ | you should get a refresh and access token

inside settings.py add the following (it's the default config for jwt)

    from datetime import timedelta          #add this on top
                                            #add the rest at the bottom
    SIMPLE_JWT = {
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
        'ROTATE_REFRESH_TOKENS': False,     #change this to True if you want infinite login duration (have to login before REFRESH_TOKEN_LIFETIME expires though -- I will be using True)
        'BLACKLIST_AFTER_ROTATION': False, #if using True for ROTATE_REFRESH_TOKENS, set this to True as well
        'UPDATE_LAST_LOGIN': False,
        'ALGORITHM': 'HS256',
        'SIGNING_KEY': SECRET_KEY,
        'VERIFYING_KEY': None,
        'AUDIENCE': None,
        'ISSUER': None,
        'JWK_URL': None,
        'LEEWAY': 0,
        'AUTH_HEADER_TYPES': ('Bearer',),
        'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
        'USER_ID_FIELD': 'id',
        'USER_ID_CLAIM': 'user_id',
        'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
        'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
        'TOKEN_TYPE_CLAIM': 'token_type',
        'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
        'JTI_CLAIM': 'jti',
        'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
        'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
        'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
    }

if ROTATE_REFRESH_TOKENS was set to True above, add the following to INSTALLED_APPS in settings.py

    'rest_framework_simplejwt.token_blacklist',

Once done stop the server then running the following
    
    python manage.py migrate

run "runserver" once more

    python manage.py runserver


### customize tokens

copy the following into your views.py folder under account

    from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
    from rest_framework_simplejwt.views import TokenObtainPairView

    class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        # ...
        return token
    class MyTokenObtainPairView(TokenObtainPairView):
        serializer_class = MyTokenObtainPairSerializer

in the urls.py file 
the following lines need to be added

    from .views import MyTokenObtainPairView

the following lines need to be changed

    from rest_framework_simplejwt.views import (
        MyTokenObtainPairView, #notice the "My"
        TokenRefreshView,
    )


### time for CORS, maybe if you want React seperate? 

stop server and run 

    python -m pip install django-cors-headers

once done, go to settings.py and in INSTALLED_APPS add

    'corsheaders',

in middleware add 

    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",

At the bottom of the settings.py file add 

    CORS_ALLOW_ALL_ORIGINS = True


<!-- React authentication taking a while to figure out since most of the "help" is outdated such as component being element and not being allowed inside routes-->