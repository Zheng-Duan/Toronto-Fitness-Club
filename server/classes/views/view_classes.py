import datetime
from datetime import date, timedelta
from rest_framework.generics import ListAPIView, RetrieveAPIView, \
    get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models.GeneralUser import GeneralUser
from classes.models.classInstance import ClassInstance
from classes.models.classType import ClassType
from classes.serializers import ClassSerializer, InstanceSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from studios.models import Studio
from .filters import *
from rest_framework.filters import SearchFilter


class ClassView(ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ClassFilter

    def get_queryset(self):
        name = self.kwargs.get("name")
        studio = get_object_or_404(Studio, name=name)
        return ClassType.objects.filter(studio=studio)


class AllInstanceView(ListAPIView):
    queryset = ClassInstance.objects.filter(time__gte=date.today())
    serializer_class = InstanceSerializer
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend, SearchFilter)
    filterset_class = InstanceFilter
    search_fields = ('type__name', 'type__coach')


class OneStudioInstanceView(ListAPIView):
    serializer_class = InstanceSerializer
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend, SearchFilter)
    filterset_class = InstanceFilter
    search_fields = ('type__name', 'type__coach')


    def get_queryset(self):
        name = self.kwargs.get("name")
        studio = get_object_or_404(Studio, name=name)
        classes = studio.classes.all()
        return ClassInstance.objects.filter(type__in=classes, time__gte=date.today())


