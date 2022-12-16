from django.contrib import admin
from lesson.models import Lesson
from lesson.models import LessonTimes
from lesson.models import LessonTimeSchedule
from lesson.models import UserEnroll

from lesson.models import Lesson

# Register your models here.

admin.site.register(Lesson)
admin.site.register(LessonTimes)
admin.site.register(LessonTimeSchedule)
