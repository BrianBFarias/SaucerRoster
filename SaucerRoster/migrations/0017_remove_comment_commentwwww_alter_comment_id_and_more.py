# Generated by Django 4.2.2 on 2023-08-23 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SaucerRoster', '0016_comment_commentwwww'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='commentwwww',
        ),
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.UUIDField(editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rating',
            name='id',
            field=models.UUIDField(editable=False, primary_key=True, serialize=False),
        ),
    ]