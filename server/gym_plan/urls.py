from django.urls import path
from gym_plan.views.add_plan import CreatePlanView, UpdatePlanView, AllPlanView
from gym_plan.views.change_card import ChangeCardView
from gym_plan.views.payment_view import NextPaymentView, PaymentView
from gym_plan.views.subscribe import SubscribeView

app_name = 'gym_plan'

urlpatterns = [
    path('plan/<str:name>', UpdatePlanView.as_view(), name='plan'),
    path('plan/', AllPlanView.as_view(), name='allPlan'),
    path('new-plan/', CreatePlanView.as_view(), name='newPlan'),
    path('payment/', PaymentView.as_view(), name='payment'),
    path('next/<int:number>', NextPaymentView.as_view(), name='nextPayment'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('card/', ChangeCardView.as_view(), name='card')
]
