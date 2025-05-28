from django.http import HttpResponse
from django.shortcuts import render
def home(request):
    return HttpResponse("Hello World")

# core/views.py
from django.http import JsonResponse
from .models.product import Product
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_product(request):
    if request.method == "POST":
        data = json.loads(request.body)
        product = Product(
            name=data.get("name"),
            price=data.get("price")
        )
        product.save()  # This triggers MongoDB to create the collection if not already present
        return JsonResponse({"message": "Product saved"})
