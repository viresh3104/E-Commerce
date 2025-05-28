from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('product', views.create_product, name='product')
]