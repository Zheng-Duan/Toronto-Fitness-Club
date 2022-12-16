from django.urls import path
from .views import *

app_name = 'lesson'

urlpatterns = [
    path('create/', LessonCreateView.as_view(), name='lesson_create'),
    path('<int:pk>/update/', LessonUpdateView.as_view(), name='lesson_update'),
    path('times/create/', LessonTimesCreateView.as_view(),
         name='lesson_times_create'),
    path('times/<int:pk>/update/', LessonTimesUpdateView.as_view(),
         name='lesson_times_update'),
    path('times/schedule/<int:pk>/cancel/', LessonScheduleCancelView.as_view(),
         name='lesson_times_update'),
    path('enroll/create/', UserEnrollCreateView.as_view(),
         name='user_enroll_create'),
    path('enroll/schedule/create/', UserScheduleCreateView.as_view(),
         name='user_schedule_create'),
    path('enroll/schedule/<int:pk>/cancel/', UserScheduleCancelView.as_view(),
         name='user_schedule_cancel'),
    path('studio/<int:sid>/list/', LessonListView.as_view(),
         name='lesson_list'),
    path('studio/<int:sid>/myschedule/', UserScheduleListView.as_view(),
         name="user_schedule")
]
