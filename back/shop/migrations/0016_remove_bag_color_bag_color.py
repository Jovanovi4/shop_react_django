# Generated by Django 5.2 on 2025-05-05 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0015_remove_bag_color_bag_color'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bag',
            name='color',
        ),
        migrations.AddField(
            model_name='bag',
            name='color',
            field=models.ManyToManyField(blank=True, to='shop.color', verbose_name='Цвет'),
        ),
    ]
