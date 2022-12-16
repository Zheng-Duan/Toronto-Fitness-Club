import json
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, \
    DestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from accounts.models.GeneralUser import GeneralUser
from classes.models.classInstance import ClassInstance
from classes.models.classType import ClassType
from classes.serializers import CancelInstanceSerializer, CancelTypeSerializer, ClassSerializer, ErollInstanceSerializer, ErollTypeSerializer, InstanceSerializer
from rest_framework.response import Response

from studios.models import Studio


class EnrollClassTypeView(UpdateAPIView):
    serializer_class = ErollTypeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        name = self.kwargs.get("studioname")
        studio = get_object_or_404(Studio, name=name)
        body_unicode = self.request.body.decode('utf-8')
        body = json.loads(body_unicode)
        classname = body['classname']
        start_time = body['start_time']
        instance = get_object_or_404(ClassType, name=classname, studio=studio, start_time=start_time)
        return instance

    def perform_update(self, serializer):
        serializer.save()

    def update(self, request, *args, **kwargs):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        if not user.plan:
            return Response("no plan, no enrolment", 400)
        return super().update(request, *args, **kwargs)


class CancelClassTypeView(UpdateAPIView):
    serializer_class = CancelTypeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        name = self.kwargs.get("studioname")
        studio = get_object_or_404(Studio, name=name)
        body_unicode = self.request.body.decode('utf-8')
        body = json.loads(body_unicode)
        classname = body['classname']
        start_time = body['start_time']
        instance = get_object_or_404(ClassType, name=classname, studio=studio, start_time=start_time)
        return instance

    def perform_update(self, serializer):
        serializer.save()
