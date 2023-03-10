# Generated by Django 3.2.3 on 2022-12-06 13:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0002_alter_lesson_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='lesson',
            options={'ordering': ('-create_at',), 'verbose_name': 'Classes'},
        ),
        migrations.AddField(
            model_name='lesson',
            name='create_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
