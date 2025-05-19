from django.contrib import admin
from .models import Bag, Brand, BagType, Material, Color, Size, BagImage
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
import uuid

class BagImageInline(admin.TabularInline):
    model = BagImage
    extra = 2  # Показывать 2 дополнительных изображения
    readonly_fields = ('preview',)

    def preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 100px;"/>', obj.image.url)
        return ""


@admin.register(Bag)
class BagAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'article', 'price', 'sale_price', 'created_at', 'preview_main_image')
    list_editable = ('price', 'sale_price')
    ordering = ('-created_at',)
    list_filter = ('brand', 'bag_type', 'material', 'color', 'size')
    search_fields = ('name', 'article', 'description')
    inlines = [BagImageInline]
    
    def save_model(self, request, obj, form, change):
        if not obj.article:
            obj.article = str(uuid.uuid4()).split("-")[0]  # простой пример генерации
        super().save_model(request, obj, form, change)

    def preview_main_image(self, obj):
        if obj.main_image:
            return format_html('<img src="{}" style="height: 80px;" />', obj.main_image.url)
        return "-"
    preview_main_image.short_description = 'Main Image'


admin.site.register(Brand)
admin.site.register(BagType)
admin.site.register(Material)
admin.site.register(Color)
admin.site.register(Size)
admin.site.register(BagImage)
