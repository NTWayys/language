# language

A web app that will allow me to keep track of my language learning progress

As I was studying Japanese I came across a guide which explains that you should be learning with pictures as a way to 'bind' the word with an image allowing you to memorize the word easily.

The app will provide the user with a place to enter words and upload an image with the word such as 林檎 | りんご | image | Ringo | apple -- currently it is based on user input as I do not know enough of the language to build my own database as well as actually having to upload the input yourself could help in remembering.

There will also be a test mode, which will test you on ones you uploaded. with options to see one of the inputs E.g the image   <img src="./appleExample.png" width="350" alt="accessibility text">

Making this as my own code along / guide

## Django setup

run below to add django and rest_framework

    pip install django djangorestframework
    django-admin startproject name-of-project

add rest_framework to the bottom of settings.py

    E.g. INSTALLED_APP =[
    ...
    'rest_framework',]

run below to add app

    django-admin startapp app-name

add app-name to the bottom of settings.py

    E.g. INSTALLED_APP =[
    ...
    'frontend.apps.FrontendConfig',] # this can be found in apps.py the first class

## Add URLS

### Create end points

Add the end points to urls.py file in the main app (includes settings.py file)

    path('end-point-name/', include('app-name.urls')),

and add 'includes' to the import

    from django.urls import path, include

Create a urls.py file in your new app (does NOT include settings.py file)

### Create a view and add it to urls.py

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

### Test that all is working by running the server

Run the following commands from the main directory to test that all is working

    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver

# React setup

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
        <script src="{% static "frontend/main.js"%}"> </script> <!-- add this; it's JS files / React; cant close with />-->
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
