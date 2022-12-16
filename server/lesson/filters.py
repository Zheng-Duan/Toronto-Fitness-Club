from django_filters import rest_framework as filters
from .models import *


class LessonFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name')
    coach = filters.CharFilter(field_name='coach')
    keywords = filters.CharFilter(field_name='keywords', lookup_expr='contains')

    class Meta:
        model = Lesson
        fields = ('name', 'coach', 'keywords')
