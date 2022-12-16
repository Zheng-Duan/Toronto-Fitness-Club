import datetime
from datetime import date, timedelta
from rest_framework import serializers
from rest_framework.generics import get_object_or_404
from accounts.models.GeneralUser import GeneralUser
from classes.models.classInstance import ClassInstance

from classes.models.classType import ClassType
from classes.models.ClassKeyword import Keywords
from studios.models import Studio
from studios.serializers import StudioNameSerializer


class KeywordsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Keywords
        fields = ['keyword']



class ClassSerializer(serializers.ModelSerializer):
    keywords = KeywordsSerializer(many=True, read_only=True)
    studio = StudioNameSerializer(read_only=True)

    class Meta:
        model = ClassType
        fields = ['name', 'studio', 'coach', 'date', 'start_time', 'end_time', 'description', 'keywords']
        

class GeneralUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralUser
        fields = ['username']

class InstanceSerializer(serializers.ModelSerializer):
    type = ClassSerializer(read_only=True)
    members = GeneralUserSerializer(many=True, read_only=True)

    class Meta:
        model = ClassInstance
        fields = ['type', 'capacity', 'time', 'members']


class ErollInstanceSerializer(serializers.ModelSerializer):
    classname = serializers.CharField(write_only=True)
    start_time = serializers.CharField(write_only=True)
    start_date = serializers.CharField(write_only=True)
    members = GeneralUserSerializer(many=True, read_only=True)

    class Meta:
        model = ClassInstance
        fields = ['classname', 'start_time', 'start_date', 'members']

    def create(self, validated_data):
        studioname = validated_data.pop('studioname')
        studio = get_object_or_404(Studio, name=studioname)
        classname = validated_data.pop('classname')
        class_ = get_object_or_404(Studio, name=classname, studio=studio)
        instance = get_object_or_404(Studio, type=class_)
        return instance


    def update(self, instance, validated_data):
        uid = self.context["request"].user.id
        user = get_object_or_404(GeneralUser, id=uid)
        if instance.members.count() < instance.capacity:
            instance.members.add(user)
            
        return instance


class CancelInstanceSerializer(serializers.ModelSerializer):
    classname = serializers.CharField(write_only=True)
    start_time = serializers.CharField(write_only=True)
    start_date = serializers.CharField(write_only=True)
    members = GeneralUserSerializer(many=True, read_only=True)

    class Meta:
        model = ClassInstance
        fields = ['classname', 'start_time', 'start_date', 'members']

    def create(self, validated_data):
        studioname = validated_data.pop('studioname')
        studio = get_object_or_404(Studio, name=studioname)
        classname = validated_data.pop('classname')
        class_ = get_object_or_404(Studio, name=classname, studio=studio)
        instance = get_object_or_404(Studio, type=class_)
        return instance


    def update(self, instance, validated_data):
        uid = self.context["request"].user.id
        user = get_object_or_404(GeneralUser, id=uid)
        instance.members.remove(user)
            
        return instance


class InstanceUserSerializer(serializers.ModelSerializer):
    members = GeneralUserSerializer(many=True, read_only=True)

    class Meta:
        model = ClassInstance
        fields = ['time', 'capacity', 'members']


class ErollTypeSerializer(serializers.ModelSerializer):
    classname = serializers.CharField(write_only=True)
    start_time = serializers.CharField(write_only=True)
    classInstance = InstanceUserSerializer(many=True, read_only=True)

    class Meta:
        model = ClassType
        fields = ['classname', 'start_time', 'classInstance']

    def create(self, validated_data):
        studioname = validated_data.pop('studioname')
        studio = get_object_or_404(Studio, name=studioname)
        classname = validated_data.pop('classname')
        instance = get_object_or_404(Studio, name=classname, studio=studio)
        return instance


    def update(self, instance, validated_data):
        uid = self.context["request"].user.id
        user = get_object_or_404(GeneralUser, id=uid)
        for item in instance.classInstance.filter(time__gte=date.today()):
            if item.members.count() < item.capacity:
                item.members.add(user)

        return instance


class CancelTypeSerializer(serializers.ModelSerializer):
    classname = serializers.CharField(write_only=True)
    start_time = serializers.CharField(write_only=True)
    classInstance = InstanceUserSerializer(many=True, read_only=True)

    class Meta:
        model = ClassType
        fields = ['classname', 'start_time', 'classInstance']

    def create(self, validated_data):
        studioname = validated_data.pop('studioname')
        studio = get_object_or_404(Studio, name=studioname)
        classname = validated_data.pop('classname')
        instance = get_object_or_404(Studio, name=classname, studio=studio)
        return instance


    def update(self, instance, validated_data):
        uid = self.context["request"].user.id
        user = get_object_or_404(GeneralUser, id=uid)
        for item in instance.classInstance.filter(time__gte=date.today()):
            item.members.remove(user)
            
        return instance

