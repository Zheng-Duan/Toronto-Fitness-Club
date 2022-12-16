from django.urls import path
from classes.views.enroll_class import CancelClassTypeView, EnrollClassTypeView
from classes.views.enroll_class_instance import CancelClassInstanceView, EnrollClassInstanceView

from classes.views.view_classes import AllInstanceView, ClassView, OneStudioInstanceView
from classes.views.view_user_classes import UserFutureInstanceView, UserPassedInstanceView


app_name = 'classes'

urlpatterns = [
    path('studios/<str:name>/classes/', ClassView.as_view(), name='Classes'),
    path('studios/classes/instance/', AllInstanceView.as_view(), name='allInstance'),
    path('studios/<str:name>/classes/instance/', OneStudioInstanceView.as_view(), name='allInstanceOfOneStudio'),
    path('<str:studioname>/enroll/instance/', EnrollClassInstanceView.as_view(), name='enrollInstance'),
    path('<str:studioname>/cancel/instance/', CancelClassInstanceView.as_view(), name='cancelInstance'),
    path('<str:studioname>/enroll/type/', EnrollClassTypeView.as_view(), name='enrollType'),
    path('<str:studioname>/cancel/type/', CancelClassTypeView.as_view(), name='cancelType'),
    path('myclasses/future/', UserFutureInstanceView.as_view(), name='futureClasses'),
    path('myclasses/history/', UserPassedInstanceView.as_view(), name='historyClasses'),
]