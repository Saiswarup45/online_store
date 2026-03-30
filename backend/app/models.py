from django.db import models
from cloudinary.models import CloudinaryField

class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)

    def __str__(self):
        return self.name