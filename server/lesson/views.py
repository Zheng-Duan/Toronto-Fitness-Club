from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters import rest_framework as filters
from rest_framework.response import Response
import datetime
from .filters import *
from .serializers import *


class UserEnrollCheckMixin:
    def enroll_check(self, request):
        user = request.user
        enroll_id = request.data.get('enroll')
        schedule_id = request.data.get('schedule')

        enroll = get_object_or_404(UserEnroll, id=enroll_id)
        schedule = get_object_or_404(LessonTimeSchedule, id=schedule_id)

        if enroll.user.id != request.user.id:
            return Response({"data": "not your enroll! please only enroll "
                                     "class for yourself"},
                            status=status.HTTP_403_FORBIDDEN)

        lesson = enroll.lesson

        if LessonTimeSchedule.objects.filter(
                time__in=LessonTimes.objects.filter(
                        lesson=lesson)).count() == 0:
            return Response(
                {"data": "The enrolling lesson does not match the scheduled "
                         "lesson"},
                status=status.HTTP_403_FORBIDDEN)

        if schedule.status == '0':
            return Response({"data": "the schedule has been cancelled!"},
                            status=status.HTTP_403_FORBIDDEN)

        if schedule.date <= datetime.datetime.now().date():
            return Response({"data": "the schedule has expired"},
                            status=status.HTTP_403_FORBIDDEN)

        if UserSchedule.objects.filter(schedule=schedule,
                                       enroll=enroll).count() > 0:
            return Response({"data": "you have enrolled in this schedule"},
                            status=status.HTTP_403_FORBIDDEN)

        return True


# Create your views here.

class LessonCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = LessonSerializer


class LessonTimesCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = LessonTimesSerializer


class LessonUpdateView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    model = Lesson
    queryset = Lesson.objects.all()
    serializer_class = LessonUpdateSerializer


class LessonTimesUpdateView(RetrieveUpdateAPIView):
    permission_classes = ()
    model = LessonTimes
    queryset = LessonTimes.objects.all()
    serializer_class = LessonTimesSerializer


class LessonScheduleCancelView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    model = LessonTimeSchedule
    queryset = LessonTimeSchedule.objects.filter(status=1)
    serializer_class = LessonScheduleSerializer


class UserEnrollCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    model = UserEnroll
    queryset = UserEnroll.objects.all()
    serializer_class = UserEnrollSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        lesson_id = request.data.get('lesson')

        if UserEnroll.objects.filter(user=user,
                                     lesson__id=lesson_id).count() > 0:
            return Response({"data": "you have enrolled this class!"},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user=self.request.user)
        return qs


class UserScheduleCreateView(UserEnrollCheckMixin, CreateAPIView):
    permission_classes = (IsAuthenticated,)
    model = UserSchedule
    serializer_class = UserScheduleForCreateSerializer

    def create(self, request, *args, **kwargs):

        r = self.enroll_check(request)
        if not r:
            return r

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class UserScheduleCancelView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    model = UserSchedule
    queryset = UserSchedule.objects.filter(status='1')
    serializer_class = UserScheduleSerializer

    def get_object(self):
        _obj = super().get_object()
        return _obj

    def update(self, request, *args, **kwargs):

        user = request.user
        enroll_id = request.data.get('enroll')
        schedule_id = request.data.get('schedule')

        enroll = get_object_or_404(UserEnroll, id=enroll_id)
        schedule = get_object_or_404(LessonTimeSchedule, id=schedule_id)

        if enroll.user.id != request.user.id:
            return Response({"data": "not your enroll, please only cancel "
                                     "your own enrollment"},
                            status=status.HTTP_403_FORBIDDEN)

        lesson = enroll.lesson

        if LessonTimeSchedule.objects.filter(
                time__in=LessonTimes.objects.filter(
                        lesson=lesson)).count() == 0:
            return Response(
                {"data": "The schedule lesson and enrolled lesson does not "
                         "match"},
                status=status.HTTP_403_FORBIDDEN)

        if schedule.status == '0':
            return Response({"data": "the schedule has been cancelled!"},
                            status=status.HTTP_403_FORBIDDEN)

        if schedule.date <= datetime.datetime.now().date():
            return Response({"data": "the schedule has expired"},
                            status=status.HTTP_403_FORBIDDEN)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data,
                                         partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class LessonListView(ListAPIView):
    model = Lesson
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = LessonFilter

    def get_queryset(self):
        sid = self.kwargs.get('sid', -1)
        studios = Studio.objects.filter(id=sid)
        get_object_or_404(studios)
        studio = studios.first()
        qs = super().get_queryset()
        qs = qs.filter(studio=studio)
        return qs


class UserScheduleListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    model = UserSchedule
    serializer_class = UserScheduleWithInfoSerializer
    queryset = UserSchedule.objects.filter(status='1').filter(
        schedule__status=1)

    def get_queryset(self):
        sid = self.kwargs.get('sid', -1)
        studios = Studio.objects.filter(id=sid)
        # print(studios)
        # get_object_or_404(studios)
        studio = studios.first()
        qs = super().get_queryset()
        qs = qs.filter(enroll__user=self.request.user)
        qs = qs.filter(enroll__lesson__studio=studio)
        return qs
