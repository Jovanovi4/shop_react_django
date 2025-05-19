from .models import Bag, Color
from django.shortcuts import render, get_object_or_404
from .serializers import BagSerializer
from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
# from .models import TelegramUser
# from .serializers import TelegramUserSerializer

def product_list(request):
    # Загружаем сумки с оптимизацией запросов
    bags = Bag.objects.select_related('brand', 'bag_type', 'material', 'size').prefetch_related('images', 'color')
    
    # Передаем данные в контекст для шаблона
    context = {
        'bags': bags,
        'colors': Color.objects.all()  # Получаем все цвета для отображения на странице
    }
    
    return render(request, 'shop/index.html', context)


def product_detail(request, product_id):
    # Получаем товар по ID
    product = get_object_or_404(Bag, pk=product_id)
    context = {
        'product': product,
    }
    return render(request, 'shop/product_detail.html', context)



class BagListAPIView(generics.ListAPIView):
    queryset = Bag.objects.all()
    serializer_class = BagSerializer

class BagRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Bag.objects.all()  # Запрашиваем товар по ID
    serializer_class = BagSerializer  # Используем тот же сериализатор

# class TelegramUserView(APIView):
#     def post(self, request):
#         data = request.data
#         user, created = TelegramUser.objects.update_or_create(
#             telegram_id=data['telegram_id'],
#             defaults=data
#         )
#         serializer = TelegramUserSerializer(user)
#         return Response(serializer.data)