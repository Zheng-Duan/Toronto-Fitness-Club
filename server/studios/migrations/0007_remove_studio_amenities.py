# Generated by Django 4.1.3 on 2022-11-15 23:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0006_studio_directions_amenity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studio',
            name='amenities',
        ),
    ]