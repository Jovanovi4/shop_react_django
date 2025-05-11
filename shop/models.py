from django.db import models
from django.utils.translation import gettext_lazy as _

class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        verbose_name = "Брэнд"
        verbose_name_plural = "Брэнды"
    def __str__(self):
        return self.name


class BagType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        verbose_name = "Тип"
        verbose_name_plural = "Типы"    
    def __str__(self):
        return self.name


class Material(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        verbose_name = "Материал"
        verbose_name_plural = "Материалы"    
    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7, blank=True, null=True)  # Например, "#ffffff"
    class Meta:
        verbose_name = "Цвет"
        verbose_name_plural = "Цвета"   
    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=20)  # можно использовать размеры в виде строки, например: "30x20x10 см"
    class Meta:
        verbose_name = "Размер"
        verbose_name_plural = "Размеры"
    def __str__(self):
        return self.name


class Bag(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Название'))
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name=_('Бренд'))
    article = models.CharField(max_length=100, unique=True, blank=True, verbose_name=_('Артикул'))
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Цена'))
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name=_('Цена по акции'))
    description = models.TextField(blank=True, verbose_name=_('Описание'))
    characteristics = models.TextField(blank=True, verbose_name=_('Характеристики'))
    color = models.ManyToManyField(Color, blank=True, verbose_name=_('Цвет'))
    bag_type = models.ForeignKey(BagType, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_('Тип сумки'))
    material = models.ForeignKey(Material, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_('Материал'))
    size = models.ForeignKey(Size, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_('Размер'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата создания'))

    main_image = models.ImageField(upload_to='bags/', blank=True, null=True, verbose_name=_('Главное изображение'))

    class Meta:
        verbose_name = "Сумку"
        verbose_name_plural = "Сумки"

    def __str__(self):
        return f"{self.name} ({self.article})"




class BagImage(models.Model):
    bag = models.ForeignKey(Bag, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='bags/')
    
    class Meta:
        verbose_name = "Изображение сумки"  # Это изменяет отображаемое название модели
        verbose_name_plural = "Изображения сумок"  # Это изменяет отображаемое во множественном числе название



class TelegramUser(models.Model):
    telegram_id = models.BigIntegerField(unique=True)
    username = models.CharField(max_length=150, blank=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    photo_url = models.URLField(blank=True)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.username or str(self.telegram_id)