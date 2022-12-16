# Generated by Django 4.1.3 on 2022-11-12 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gym_plan", "0002_card_gymplan_period_payment"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="card",
            name="owner",
        ),
        migrations.AddField(
            model_name="card",
            name="name",
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]
