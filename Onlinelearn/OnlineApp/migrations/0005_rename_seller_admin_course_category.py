# Generated by Django 4.1.7 on 2023-05-05 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OnlineApp', '0004_cart_course_order_cart_course'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Seller',
            new_name='Admin',
        ),
        migrations.AddField(
            model_name='course',
            name='category',
            field=models.CharField(default=0, max_length=200),
            preserve_default=False,
        ),
    ]
