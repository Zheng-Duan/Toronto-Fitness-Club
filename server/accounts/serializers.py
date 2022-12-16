from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from accounts.models.GeneralUser import GeneralUser
from gym_plan.serializers import CardSerializer, PlanSerializer
from rest_framework.generics import get_object_or_404


class GeneralUserSerializer(serializers.ModelSerializer):

    role = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True, allow_blank=True)
    password2 = serializers.CharField(write_only=True, allow_blank=True)
    plan = PlanSerializer(read_only=True)
    card = CardSerializer(read_only=True)

    class Meta:
        model = GeneralUser
        fields = ['username', 'password', 'password2', 'role', 'plan',
                  'card', 'first_name', 'last_name', 'email', 'phone_number',
                  'avatar']

    def validate(self, attrs):
        request = self.context["request"]
        if request.method == 'POST' or request.method == 'PUT':
            if attrs["password"] != attrs["password2"]:
                raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        if request.method == 'POST':
            password = validated_data.pop('password')
            validated_data.pop('password2')

            user = GeneralUser(**validated_data)
            user.set_password(password)
            user.role = GeneralUser.Role.GENERAL
            user.save()
            return user
        return get_object_or_404(GeneralUser, id=request.user.id)

    def update(self, instance, validated_data):
        request = self.context["request"]
        if request.method == 'PUT':
            password = validated_data.pop('password')
            validated_data.pop('password2')
            if password != "":
                instance.set_password(password)

        instance = super(GeneralUserSerializer, self)\
            .update(instance, validated_data)
        instance.save()
        update_session_auth_hash(self.context["request"], instance)
        return instance
