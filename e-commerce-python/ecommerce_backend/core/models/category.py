from mongoengine import *
import datetime

class Category(Document):
    category_id = IntField(unique=True)
    name = StringField(required=True)
    description = StringField()
    created_At = DateTimeField()
    isActive = BooleanField(default=True)

    meta = {
        'indexes': [
            '-category_id'
        ],
    }

    def clean(self):
        if not self._created:
            return
        last = Category.objects.order_by('-category_id').first()
        self.category_id = (last.category_id + 1) if last else 1
        self.created_At = datetime.datetime.utcnow()
