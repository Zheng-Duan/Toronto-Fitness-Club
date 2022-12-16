from datetime import date, timedelta
from rest_framework.generics import ListAPIView, RetrieveAPIView, \
    get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models.GeneralUser import GeneralUser
from classes.serializers import ClassSerializer, InstanceSerializer


class UserFutureInstanceView(ListAPIView):
    serializer_class = InstanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        today = date.today()
        return user.classInstances.filter(time__gte=today)

class UserPassedInstanceView(ListAPIView):
    serializer_class = InstanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(GeneralUser, id=self.request.user.id)
        today = date.today()
        return user.classInstances.filter(time__lt=today)