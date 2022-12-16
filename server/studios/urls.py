from django.urls import path

from studios.views.ListStudios import ListStudios
from studios.views.Studios_detail import StudioDetail

app_name = 'studios'

urlpatterns = [
    path('<name>/detail/', StudioDetail.as_view()),
    path('<latitude>,<longitude>/', ListStudios.as_view()),

]
