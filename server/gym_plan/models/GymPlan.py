from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import SET_NULL
from accounts.models.WebAdminUser import WebAdminUser


class GymPlan(models.Model):
    objects = models.Manager()
    owner = models.ForeignKey(to=WebAdminUser, on_delete=SET_NULL, null=True,
                              related_name="plans")
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(max_length=200, blank=True, null=True)
    price = models.FloatField(validators=[MinValueValidator(0.0)],
                              blank=False, null=False)

    class Period(models.TextChoices):
        DAY = "DAY", 'day'
        MONTH = "MONTH", 'month'
        SEASON = "SEASON", 'season'
        ANNUL = "ANNUL", 'annul'
    period = models.CharField(max_length=10, default="DAY",
                              choices=Period.choices, null=False)

    def __str__(self):
        return str(self.name) + ': ' + str(self.price)
