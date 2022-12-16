# Generated by Django 4.1.3 on 2022-12-08 00:49

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('studios', '0009_studio_location_order'),
        ('accounts', '0007_alter_generaluser_card_alter_generaluser_plan'),
    ]

    operations = [
        migrations.CreateModel(
            name='Keywords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='ClassType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, max_length=200, null=True)),
                ('coach', models.CharField(max_length=200)),
                ('start_time', models.TimeField()),
                ('duration', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('date', models.CharField(choices=[('MONDAY', 'monday'), ('TUESDAY', 'thuesday'), ('WEDNESDAY', 'wednesday'), ('THURSDAY', 'thursday'), ('FRIDAY', 'friday'), ('SATURDAY', 'saturday'), ('SUNDAY', 'sunday')], default='monday', max_length=10)),
                ('keywords', models.ManyToManyField(blank=True, related_name='classes', to='classes.keywords')),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
        ),
        migrations.CreateModel(
            name='ClassInstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('capacity', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('time', models.DateField()),
                ('members', models.ManyToManyField(blank=True, related_name='classInstances', to='accounts.generaluser')),
                ('type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='classInstance', to='classes.classtype')),
            ],
            options={
                'ordering': ['time'],
            },
        ),
    ]
