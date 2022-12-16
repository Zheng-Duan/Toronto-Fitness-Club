from rest_framework import serializers

from studios.models import Studio, Amenity


class StudioLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['name', 'postal_code', 'phone_number', 'images', 'address', 'longitude', 'latitude']
        # piazza said creating a link doesn't have to be backend


# class AmenitiesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Amenity
#         fields = ['type', 'quantity']
#         # , 'class_names', 'coaches'
#

class StudioNameSerializer(serializers.ModelSerializer):
    # amenity = AmenitiesSerializer(many=True, read_only=True)

    class Meta:
        model = Studio
        fields = ['name', 'address', 'longitude', 'latitude']




class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['name', 'amenities']
        # , 'class_names', 'coaches'
