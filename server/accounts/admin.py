from django.contrib import admin
from accounts.models import User
from accounts.models.GeneralUser import GeneralUser as General
from accounts.models.WebAdminUser import WebAdminUser as WebAdmin


admin.site.register(User)
admin.site.register(General)
admin.site.register(WebAdmin)

