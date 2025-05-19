from django.urls import path
from . import views
from .views import BagListAPIView
from .views import BagRetrieveAPIView
# from .views import TelegramUserView

urlpatterns = [
    # path('', views.product_list, name='product_list'),
    # path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('api/products/', BagListAPIView.as_view(), name='api-product-list'),
    path('api/products/<int:pk>/', BagRetrieveAPIView.as_view(), name='api-product-detail'), 
    # path('api/telegram-user/', TelegramUserView.as_view()),
]
