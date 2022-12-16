from datetime import date, time, timedelta
from django.db.models import CASCADE
from django.core.validators import MinValueValidator
from django.db import models
from classes.models.classType import ClassType
from accounts.models.GeneralUser import GeneralUser
from django.db.models.signals import post_save
from django.db.transaction import atomic
from django.dispatch import receiver



class ClassInstance(models.Model):
    objects = models.Manager()
    type = models.ForeignKey(to=ClassType, on_delete=CASCADE, null=True,
                              related_name="classInstance")
    capacity = models.IntegerField(validators=[MinValueValidator(0)],
                              blank=False, null=False)
    time = models.DateField(blank=False, null=False)

    members = models.ManyToManyField(GeneralUser, related_name="classInstances", blank=True)

    class Meta:
        ordering = ['time']

    def __str__(self):
        return str(self.type.name) + " at " + str(self.type.studio) + " on " + str(self.time) + " at " + str(self.type.start_time)



@atomic
@receiver(post_save, sender=ClassType)
def generate_class_instance(sender, instance, created, **kwargs):
    """
    """
    classType = instance
    if not created:
        for classInstance in classType.classInstance.filter(time__gte=date.today()):
            classInstance.delete()

    dic = {"MONDAY": 0, "TUESDAY": 1, "WEDNESDAY": 2, "THURSDAY": 3, "FRIDAY": 4, "SATURDAY":5, "SUNDAY": 6}
    classWeekday = dic[classType.date]
    index = 1
    while index <= 365:
        check_date = date.today() + timedelta(days=index)
        if classWeekday == check_date.weekday():
            classInstance = ClassInstance(type=classType, capacity=classType.default_capacity, time=check_date)
            classInstance.save()
        index += 1
            