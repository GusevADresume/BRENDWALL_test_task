from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from product.serializers import ProductSerializer

from product.models import Product


def main_page(request):
    return render(request, 'index.html')


class ProductViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    http_method_names = ['get', 'post']