from django.contrib.auth.models import BaseUserManager
from accounts.models import User


class WebAdminUserManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.WEB_ADMIN)


class WebAdminUser(User):
    base_role = User.Role.WEB_ADMIN
    webAdminUser = WebAdminUserManager()

    class Meta:
        proxy = True
