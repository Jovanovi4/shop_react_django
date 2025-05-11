from rest_framework import serializers
from .models import Bag, BagImage, Brand, BagType, Material, Color, Size
from .models import TelegramUser

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name', 'hex_code']

class BagImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BagImage
        fields = ['id', 'image']

class BagSerializer(serializers.ModelSerializer):
    brand = serializers.StringRelatedField()
    bag_type = serializers.StringRelatedField()
    material = serializers.StringRelatedField()
    size = serializers.StringRelatedField()
    color = ColorSerializer(many=True)
    images = BagImageSerializer(many=True, read_only=True)
    main_image = serializers.ImageField()

    class Meta:
        model = Bag
        fields = [
            'id', 'name', 'brand', 'article', 'price', 'sale_price',
            'description', 'characteristics', 'color', 'bag_type',
            'material', 'size', 'main_image', 'images'
        ]


class TelegramUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramUser
        fields = '__all__'