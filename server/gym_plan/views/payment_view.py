import datetime
from datetime import timedelta
from rest_framework.generics import ListAPIView, RetrieveAPIView, \
    get_object_or_404
from rest_framework.permissions import IsAuthenticated
from accounts.models.GeneralUser import GeneralUser
from gym_plan.models.Payment import Payment
from gym_plan.serializers import NextPaymentSerializer, PaymentSerializer
from rest_framework.response import Response
from django.http import JsonResponse


class PaymentView(ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        return Payment.objects.filter(owner=user)

    def make_new_payment(self):
        print("check for new payment!!!!!!")
        users = GeneralUser.generalUser.all()
        for user in users:
            # cur = datetime.date(2100, 1, 1)
            if not user.has_paid():
                plan = user.plan
                if plan is None:
                    user.paid_until = None
                    user.save()
                    continue
                if user.card is None:
                    user.plan = None
                    user.save()
                    continue
                payment = Payment.objects.create(
                    owner=user, plan=user.plan, card=user.card, price=plan.price
                )
                payment.save()
                if plan.period == "DAY":
                    paid_until = timedelta(days=1)
                elif plan.period == "MONTH":
                    paid_until = timedelta(days=30)
                elif plan.period == "SEASON":
                    paid_until = timedelta(days=90)
                else:
                    paid_until = timedelta(days=365)
                user.paid_until += paid_until
                print(user.paid_until)
                user.save()


class NextPaymentView(RetrieveAPIView):
    serializer_class = NextPaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        return user

    def get_object(self):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        return user

    def retrieve(self, request, number):
        instance = self.get_object()
        if instance.plan is None:
            return Response("no plan, no pay", 400)
        period = instance.plan.period
        if period == "DAY":
            paid_until = timedelta(days=1*number)
        elif period == "MONTH":
            paid_until = timedelta(days=30*number)
        elif period == "SEASON":
            paid_until = timedelta(days=90*number)
        else:
            paid_until = timedelta(days=365*number)
        try:
            date = str(instance.paid_until + paid_until)
        except OverflowError:
            return Response("This payment will conduct more than 7000 years later", 400)

        serializer = self.get_serializer(instance, context={'date': date})

        # time = serializer.data['time']
        # period = serializer.data['period']
        # period = str(datetime.date(2100, 1, 1))
        # price = serializer.data['price']
        # return JsonResponse({
        #     'time':time,
        #     'period': period,
        #     'price': price
        # })
        return Response(serializer.data)

