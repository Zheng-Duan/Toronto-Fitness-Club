from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, \
    SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, \
    permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenViewBase
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from accounts.models import User


class MyTokenObtainPairView(TokenObtainPairView):


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        refresh = serializer.validated_data['refresh']
        access = serializer.validated_data['access']
        
        name = request.data["username"]
        user = User.objects.get(username=name)
        login(request, user)

        return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'role': user.role
        },
        "access": access,
        "refresh": refresh
        })



# @api_view(["POST"])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([AllowAny])
# def login_user(request):
#     serializer = AuthTokenSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.validated_data['user']
#     login(request, user)
#     # _, token = AuthToken.objects.create(user)
#     return Response({
#         'user_info': {
#             'id': user.id,
#             'username': user.username,
#             'role': user.role
#         }
#     })



