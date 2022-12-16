# Generated by Django 4.1.3 on 2022-12-09 01:44

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0002_alter_classtype_studio'),
    ]

    operations = [
        migrations.RenameField(
            model_name='classtype',
            old_name='duration',
            new_name='default_compacity',
        ),
        migrations.AddField(
            model_name='classtype',
            name='end_time',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
