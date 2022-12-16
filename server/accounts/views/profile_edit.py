from rest_framework.generics import RetrieveAPIView, \
    UpdateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from accounts.models.GeneralUser import GeneralUser
from accounts.serializers import GeneralUserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class ProfileEditView(RetrieveAPIView, UpdateAPIView):
    serializer_class = GeneralUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(GeneralUser, id=self.request.user.id)
