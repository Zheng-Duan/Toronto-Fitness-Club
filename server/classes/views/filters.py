import django_filters
from django_filters import rest_framework as filters
from classes.models.classType import *
from classes.models.classInstance import ClassInstance


class ClassFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name')
    coach = filters.CharFilter(field_name='coach')
    keywords = django_filters.ModelMultipleChoiceFilter(field_name="keywords__keyword",
                                                lookup_expr='contains',
                                                to_field_name="keyword",
                                                queryset=Keywords.objects.all())

    class Meta:
        model = ClassType
        fields = ('name', 'coach', 'keywords')


class InstanceFilter(django_filters.FilterSet):
    start_hour = django_filters.TimeFilter(field_name="type__start_time", lookup_expr='gte')
    end_hour = django_filters.TimeFilter(field_name="type__end_time", lookup_expr='lte')

    classname = django_filters.CharFilter(field_name="type__name")
    coach = django_filters.CharFilter(field_name="type__coach")

    keywords = django_filters.ModelMultipleChoiceFilter(field_name="type__keywords__keyword",
                                                lookup_expr='contains',
                                                to_field_name="keyword",
                                                queryset=Keywords.objects.all())

    class Meta:
        model = ClassInstance
        fields = ['classname', 'coach', 'time', 'start_hour', 'end_hour', 'keywords']
