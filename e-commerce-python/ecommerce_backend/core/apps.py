from django.apps import AppConfig
from mongoengine import connect

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        connect(
            db="pasara",
            host="mongodb://localhost:27017/pasara"
        )
