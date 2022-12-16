import datetime
from datetime import timedelta

from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from accounts.models.GeneralUser import GeneralUser
from gym_plan.models.Card import Card
from gym_plan.models.GymPlan import GymPlan
from gym_plan.models.Payment import Payment


class PlanSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(read_only=True)

    class Meta:
        model = GymPlan
        fields = ['owner', 'name', 'description', 'price', 'period']

    def create(self, validated_data):
        plan = GymPlan(**validated_data)
        plan.owner = self.context["request"].user
        plan.save()
        return plan


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = ['number', 'CVV', 'type']


class UserCardSerializer(serializers.ModelSerializer):
    card = CardSerializer()

    class Meta:
        model = GeneralUser
        fields = ['card']

    def create(self, validated_data):
        uid = self.context["request"].user.id
        user = get_object_or_404(GeneralUser, id=uid)
        # if user.card is None:
        #     card_data = validated_data.pop('card')
        #     card, created = Card.objects.get_or_create(**card_data)
        #     card.save()
        #     user.card = card
        #     user.save()
        return user

    def update(self, instance, validated_data):
        card_data = validated_data.pop('card')

        card, created = Card.objects.get_or_create(**card_data)
        instance.card = card
        instance.save() 
        return instance

    def delete(self, instance, validated_data):
        instance.card = None
        instance.save()
        return instance


class SubscribeSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True)
    name = serializers.CharField(write_only=True, allow_blank=True)
    paid_until = serializers.DateField(read_only=True)

    class Meta:
        model = GeneralUser
        fields = ['plan', 'name', 'paid_until']

    def create(self, validated_data):
        uid = self.context["request"].user.id
        user = get_object_or_404(GeneralUser, id=uid)
        return user

    def update(self, instance, validated_data):
        name = validated_data.pop('name')
        if name:
            plan = get_object_or_404(GymPlan, name=name)
            plan.save()
            
            # won't charge immedately after switch plan
            if not instance.paid_until or (instance.paid_until < datetime.date.today()):
                instance.plan = plan
                instance.save()
                payment = Payment.objects.create(owner=instance, plan=plan, card=instance.card, price=plan.price)
                instance.payment.add(payment)
                if plan.period == "DAY":
                    paid_until = timedelta(days=1)
                elif plan.period == "MONTH":
                    paid_until = timedelta(days=30)
                elif plan.period == "SEASON":
                    paid_until = timedelta(days=90)
                else:
                    paid_until = timedelta(days=365)
                instance.paid_until = datetime.date.today() + paid_until
                instance.save()
            else:
                instance.plan = plan
                instance.save()

        elif name == '':
            instance.plan = None
            instance.save()
        return instance


class PaymentPlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = GymPlan
        fields = ['name', 'price']


class PaymentSerializer(serializers.ModelSerializer):
    plan = PaymentPlanSerializer()
    card = CardSerializer()

    class Meta:
        model = Payment
        fields = ['plan', 'card', 'price', 'time']


class NextPaymentSerializer(serializers.ModelSerializer):

    next_payment = serializers.DateField(source="paid_until")
    price = serializers.FloatField(source="plan.price")
    period = serializers.CharField(source="plan.period")

    class Meta:
        model = GeneralUser
        fields = ['next_payment', 'price', 'period']

    def to_representation(self, data):
        data = super(NextPaymentSerializer, self).to_representation(data)
        data['next_payment'] = self.context['date']
        return data

    
