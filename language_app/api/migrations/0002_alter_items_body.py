# Generated by Django 4.0.6 on 2022-08-17 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='items',
            name='body',
            field=models.JSONField(),
        ),
    ]
