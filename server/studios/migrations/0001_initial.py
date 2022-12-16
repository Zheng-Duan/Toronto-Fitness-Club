from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Studio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('address', models.TextField()),
                ('geographical_location', models.TextField()),
                ('postal_code', models.TextField()),
                ('phone_number', models.TextField(blank=True, null=True)),
                ('amenities', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
