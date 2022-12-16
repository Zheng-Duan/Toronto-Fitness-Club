from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from accounts.serializers import GeneralUserSerializer


class RegisterView(CreateAPIView):
    # queryset = GeneralUser.generalUser.all()
    serializer_class = GeneralUserSerializer
    permission_classes = (AllowAny, )

    def perform_create(self, serializer):
        serializer.save()
