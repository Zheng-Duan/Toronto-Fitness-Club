from django.db import models
from django.core.validators import MinLengthValidator


class Card(models.Model):
    objects = models.Manager()
    number = models.CharField(max_length=50, blank=False, null=False)
    CVV = models.CharField(blank=False, null=False, max_length=3, validators=[MinLengthValidator(3)])

    class Type(models.TextChoices):
        CREDIT = "CREDIT", 'credit'
        DEBIT = "DEBIT", 'debit'
    type = models.CharField(max_length=50, choices=Type.choices, null=False)

    def __str__(self):
        return str(self.number) + '(' + str(self.type) + ')'
