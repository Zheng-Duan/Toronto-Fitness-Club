from itertools import chain

from django.http import JsonResponse
from rest_framework.generics import ListAPIView
from rest_framework import filters
from studios.models import Studio, Amenity
from studios.serializers import StudioNameSerializer


class ListStudios(ListAPIView):
    serializer_class = StudioNameSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'amenity__type', 'classes__name', 'classes__coach']

    def get_queryset(self):
        studios = Studio.objects.all()
        location_list = []
        for i in range(len(studios)):
            location_list.append((studios[i].latitude, studios[i].longitude, studios[i].id))

        location_list.sort(
            key=lambda p: (p[0] - float(self.kwargs['latitude'])) ** 2 + (p[1] - float(self.kwargs['longitude'])) ** 2)
        order_index = []
        for k in range(len(location_list)):
            order_index.append(int(location_list[k][2]))
        for index in range(len(location_list)):
            temp = Studio.objects.get(id=order_index[index])
            temp.location_order = index
            temp.save()
        new = Studio.objects.order_by('location_order')
        return new
