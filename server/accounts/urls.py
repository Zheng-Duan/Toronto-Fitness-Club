from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views.login import MyTokenObtainPairView
from accounts.views.logout import logout_user
from accounts.views.profile_edit import ProfileEditView
from accounts.views.profile_view import ProfileViewView
from accounts.views.register import RegisterView


app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('logout/', logout_user, name='logout'),
    path('profile/view/', ProfileViewView.as_view(), name='profile_view'),
    path('profile/edit/', ProfileEditView.as_view(), name='profile_edit'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refresh_token')
]
