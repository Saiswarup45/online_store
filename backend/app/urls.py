from django.urls import path
from .views import ProductList, AddProduct

urlpatterns = [
    path('products/', ProductList.as_view()),
    path('add-product/', AddProduct.as_view()),
]