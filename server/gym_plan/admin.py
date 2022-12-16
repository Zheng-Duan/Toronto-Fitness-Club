from django.contrib import admin
from gym_plan.models.Card import Card
from gym_plan.models.GymPlan import GymPlan
from gym_plan.models.Payment import Payment


admin.site.register(GymPlan)
admin.site.register(Card)
admin.site.register(Payment)
