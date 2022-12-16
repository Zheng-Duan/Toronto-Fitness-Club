from django.contrib import admin

from studios.models import Studio, Amenity


class AmenityInline(admin.TabularInline):
    model = Amenity


class StudioAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'location_order',)
    inlines = [
        AmenityInline,
    ]


# Register your models here.
admin.site.register(Studio, StudioAdmin)
