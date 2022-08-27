from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.
from .serializers import itemsSerializer
from api.models import items


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, auser):
        token = super().get_token(auser)

        # Add custom claims
        token['username'] = auser.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/account/token',
        '/account/refresh'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def postItems(request, format=None):

    if request.method == 'GET':
        item = items.objects.all()
        serializer = itemsSerializer(item, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = itemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def updateItems(request, id, format=None):
    try:
        item = items.objects.get(pk=id)
    except item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if item.user == request.user:
        if request.method == 'GET':
            serializer = itemsSerializer(item)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = itemsSerializer(item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def getItems(request, format=None):
    item = items.objects.get(user=request.user.id)
    serializer = itemsSerializer(item)
    return Response(serializer.data)
