from pydoc import describe
from django.db import models

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=200)
    notes = models.CharField(max_length=500)
    address = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    url = models.URLField()
    all_dates = models.CharField(max_length=100)
    latitude = models.DecimalField(decimal_places=6, max_digits=10)
    longitude = models.DecimalField(decimal_places=6, max_digits=10)

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    website = models.URLField()
    rating = models.DecimalField(decimal_places=2, max_digits=3)
    description = models.CharField(max_length=500)
    tags = models.CharField(max_length=100)
    image_urls = models.CharField(max_length=800)
    latitude = models.DecimalField(decimal_places=6, max_digits=10)
    longitude = models.DecimalField(decimal_places=6, max_digits=10)
