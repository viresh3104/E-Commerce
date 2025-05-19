from mongoengine import *
import bcrypt
import datetime

class User(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True, min_length=8)
    role = StringField(default="user", choices=["user", "admin"])
    profile_photo = StringField(default="/")
    cart = DictField()
    wishlist = ListField(IntField())
    phoneNumber = StringField(default="")
    gender = StringField(choices=["male", "female", "other"], default="")
    address = StringField(default="")
    dateOfBirth = DateTimeField()

    def clean(self):
        if not self._created:
            return
        self.password = bcrypt.hashpw(self.password.encode(), bcrypt.gensalt()).decode()

    def compare_password(self, entered_password):
        return bcrypt.checkpw(entered_password.encode(), self.password.encode())
