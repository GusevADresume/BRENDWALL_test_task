from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500)
    price = models.FloatField()
