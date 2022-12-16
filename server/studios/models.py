from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Studio(models.Model):
    name = models.TextField()  # repeated name is not allowed
    address = models.TextField()
    longitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])
    latitude = models.FloatField(validators=[MinValueValidator(-90), MaxValueValidator(90)])
    postal_code = models.TextField()
    phone_number = models.TextField(null=True, blank=True)
    images = models.ImageField(upload_to='static/studios', null=True, blank=True)
    location_order = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class Amenity(models.Model):
    type = models.TextField()
    studio_name = models.ForeignKey(Studio, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(0)])  # should be greater than 0
