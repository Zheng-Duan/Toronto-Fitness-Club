from django.contrib import admin
from classes.models.ClassKeyword import Keywords
from classes.models.classInstance import ClassInstance
from classes.models.classType import ClassType


admin.site.register(ClassType)
admin.site.register(ClassInstance)
admin.site.register(Keywords)
