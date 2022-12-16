from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import SET_NULL
import datetime

from accounts.models.GeneralUser import GeneralUser
from gym_plan.models.Card import Card
from gym_plan.models.GymPlan import GymPlan


class Payment(models.Model):
    objects = models.Manager()
    owner = models.ForeignKey(to=GeneralUser, on_delete=SET_NULL, null=True,
                              related_name="payment")
    plan = models.ForeignKey(to=GymPlan, on_delete=SET_NULL,
                             null=True, related_name="payment")
    card = models.ForeignKey(to=Card, on_delete=SET_NULL,
                             null=True, related_name="payment")
    price = models.FloatField(validators=[MinValueValidator(0.0)],
                              blank=False, null=False)
    time = models.DateField(default=datetime.date.today)

    def __str__(self):
        return str(self.owner) + ' paid $' + str(self.price)
