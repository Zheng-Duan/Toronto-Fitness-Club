from datetime import date
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, \
    DestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from accounts.models.GeneralUser import GeneralUser
from gym_plan.serializers import SubscribeSerializer
from rest_framework.response import Response


class SubscribeView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = SubscribeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        return user

    def perform_update(self, serializer):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        if user.card is not None:
            serializer.save()

    def perform_destroy(self, instance):
        instance.plan= None
        instance.save()
        for classInstance in instance.classInstances.filter(time__gt=instance.paid_until):
            instance.classInstances.remove(classInstance)
        instance.save()

    def retrieve(self, request, *args, **kwargs):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        if user.card is None:
            return Response("no card, no subscription", 400)
        return super().retrieve(request, *args, **kwargs)
