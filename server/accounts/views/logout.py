from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return HttpResponseRedirect(
        reverse('accounts:login')
    )
