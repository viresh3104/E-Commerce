from mongoengine import *
import datetime

# class Product(Document):
#     product_id = IntField(unique=True)
#     category_id = IntField(required=True)
#     name = StringField(required=True, min_length=5)
#     description = StringField(required=True, max_length=50)
#     brand = StringField(required=True)
#     price = FloatField(required=True, min_value=1)
#     discountedPrice = FloatField()
#     stock = IntField(required=True, min_value=1)
#     size = StringField(choices=["Clothing", "Footware"])
#     image_urls = ListField(StringField())
#     created_at = DateTimeField(default=datetime.datetime.utcnow)
#     is_active = BooleanField(default=True)

#     def clean(self):
#         if not self._created:
#             return
#         last = Product.objects.order_by('-product_id').first()
#         self.product_id = (last.product_id + 1) if last else 1


# core/models.py
from mongoengine import Document, StringField, IntField

class Product(Document):
    name = StringField(required=True)
    price = IntField()
    meta = {'collection': 'products'}  # this defines the collection name
