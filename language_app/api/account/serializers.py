from xml.parsers.expat import model
from rest_framework.serializers import ModelSerializer

from api.models import items

class itemsSerializer(ModelSerializer):
    class Meta:
        model = items
        read_only_fields = ('user',)
        fields = '__all__'