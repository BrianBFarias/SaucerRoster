# Generated by Django 4.2.2 on 2023-08-23 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SaucerRoster', '0014_alter_rating_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.AutoField(editable=False, primary_key=True, serialize=False),
        ),
    ]
