# Generated by Django 4.1.3 on 2022-11-12 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gym_plan", "0003_remove_card_owner_card_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="card",
            name="CVV",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AddField(
            model_name="card",
            name="number",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
