# Generated by Django 4.2.2 on 2023-07-26 23:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SaucerRoster', '0007_rename_title_post_brand_post_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
