# Generated by Django 4.1.3 on 2022-11-12 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gym_plan", "0004_card_cvv_card_number"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="card",
            name="name",
        ),
        migrations.AlterField(
            model_name="card",
            name="CVV",
            field=models.CharField(max_length=3),
        ),
        migrations.AlterField(
            model_name="card",
            name="number",
            field=models.CharField(max_length=50),
        ),
    ]
