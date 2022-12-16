from rest_framework import serializers
from .models import *
from studios.serializers import StudioSerializer
from accounts.serializers import GeneralUserSerializer


class LessonScheduleSerializer(serializers.ModelSerializer):
    date = serializers.ReadOnlyField(read_only=True)

    class Meta:
        model = LessonTimeSchedule
        fields = ('id', 'time', 'date', 'status')


class LessonTimesSerializer(serializers.ModelSerializer):
    schedules = LessonScheduleSerializer(many=True, read_only=False,
                                         required=False)

    class Meta:
        model = LessonTimes
        fields = ('id',
            'lesson', 'weekday', 'start_hour', 'start_min', 'end_hour',
            'end_min',
            'schedules')


class LessonBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ('id',
            'studio', 'name', 'description', 'coach', 'capacity', 'keywords')


class LessonSerializer(serializers.ModelSerializer):
    times = LessonTimesSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = Lesson
        fields = ('id',
            'studio', 'name', 'description', 'coach', 'capacity', 'keywords',
            'times')
        # depth = 1


class LessonUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = (
            'id', 'studio', 'name', 'description', 'coach', 'capacity', 'keywords')


class UserEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEnroll
        fields = ('id', 'user', 'lesson', 'has_all_times')


class UserScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSchedule
        fields = ('id', 'enroll', 'schedule', 'status')


class UserScheduleForCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSchedule
        fields = ('id', 'enroll', 'schedule')


class UserEnrollWithInfoSerializer(serializers.ModelSerializer):
    lesson = LessonBaseSerializer()

    class Meta:
        model = UserEnroll
        fields = ('id', 'lesson',)


class UserScheduleWithInfoSerializer(serializers.ModelSerializer):
    enroll = UserEnrollWithInfoSerializer()

    class Meta:
        model = UserSchedule
        fields = ('id', 'enroll', 'schedule', 'status',)
        depth = 1
