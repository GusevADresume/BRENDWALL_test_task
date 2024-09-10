from rest_framework import serializers

from product.models import Product
from rest_framework.exceptions import ValidationError


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def validate(self, value):
        if value['price'] > 0:
            return value
        raise ValidationError('price must be greater than zero')