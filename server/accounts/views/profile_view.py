from rest_framework.generics import RetrieveAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from accounts.models.GeneralUser import GeneralUser
from accounts.serializers import GeneralUserSerializer


class ProfileViewView(RetrieveAPIView):
    serializer_class = GeneralUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(GeneralUser, id=self.request.user.id)

