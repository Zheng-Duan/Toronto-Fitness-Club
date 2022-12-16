from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    class Role(models.TextChoices):
        ADMIN = "ADMIN", 'admin'
        GENERAL = "GENERAL", 'general'
        WEB_ADMIN = "WEB_ADMIN", 'web_admin'
    base_role = Role.WEB_ADMIN # very bad design here
    role = models.CharField(max_length=50, choices=Role.choices, null=False)

    phone_number = models.CharField(max_length=50, blank=True, null=True)
    avatar = models.ImageField(upload_to='store_avatars/',
                               null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.role:
            self.role = self.base_role
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.username + ' (' + self.role + ')'
