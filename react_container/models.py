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
