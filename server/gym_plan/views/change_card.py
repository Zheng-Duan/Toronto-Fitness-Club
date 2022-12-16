from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    UpdateAPIView, DestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from accounts.models.GeneralUser import GeneralUser
from gym_plan.serializers import UserCardSerializer


class ChangeCardView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'delete', 'put']

    def get_object(self):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        return user

    def perform_update(self, serializer):
        serializer.save()
    
    def perform_destroy(self, instance):
        instance.card = None
        instance.save()
