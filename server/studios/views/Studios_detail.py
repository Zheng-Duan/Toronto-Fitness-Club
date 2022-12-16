from rest_framework.generics import get_object_or_404, ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from studios.models import Studio
from studios.serializers import StudioSerializer, StudioLocationSerializer


class StudioDetail(RetrieveAPIView):
    serializer_class = StudioLocationSerializer

    def get_object(self):
        return get_object_or_404(Studio, name=self.kwargs['name'])
