from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import SET_NULL
from accounts.models.GeneralUser import GeneralUser
from classes.models.ClassKeyword import Keywords
from studios.models import Studio


class ClassType(models.Model):
    objects = models.Manager()
    studio = models.ForeignKey(to=Studio, on_delete=models.CASCADE, related_name="classes")
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(max_length=200, blank=True, null=True)
    coach = models.CharField(max_length=200, blank=False, null=False)
    start_time = models.TimeField(blank=False, null=False)
    end_time = models.TimeField(blank=False, null=False)
    default_capacity = models.IntegerField(validators=[MinValueValidator(0)],
                              blank=False, null=False)
    keywords = models.ManyToManyField(Keywords, related_name="classes", blank=True)


    def clean(self):
        if self.start_time > self.end_time:
            raise ValidationError('Start should be before end')
        return super().clean()


    class WeekDay(models.TextChoices):
        MONDAY = "MONDAY", 'monday'
        TUESDAY = "TUESDAY", 'thuesday'
        WEDNESDAY = "WEDNESDAY", 'wednesday'
        THURSDAY = "THURSDAY", 'thursday'
        FRIDAY = "FRIDAY", 'friday'
        SATUREDAY = "SATURDAY", 'saturday'
        SUNDAY = "SUNDAY", 'sunday'
    date = models.CharField(max_length=10, default="monday",
                              choices=WeekDay.choices, null=False)

    def __str__(self):
        return self.name + ' in ' + str(self.studio)
