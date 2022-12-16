import datetime

from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.db.models import SET_NULL
from accounts.models import User
from gym_plan.models.Card import Card
from gym_plan.models.GymPlan import GymPlan


class GeneralUserManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.GENERAL)


class GeneralUser(User):
    base_role = User.Role.GENERAL
    generalUser = GeneralUserManager()
    card = models.OneToOneField(to=Card, on_delete=SET_NULL, null=True, blank=True,
                                related_name="using_by")
    plan = models.ForeignKey(to=GymPlan, on_delete=SET_NULL, null=True, blank=True,
                             related_name="subscriptions")
    paid_until = models.DateField(null=True, blank=True)

    def has_paid(self, current_date=datetime.date.today()):
        if self.paid_until is None:
            return True
        return current_date < self.paid_until

    def set_paid_until(self, paid_until: datetime.date):
        self.paid_until = paid_until
        self.save()
