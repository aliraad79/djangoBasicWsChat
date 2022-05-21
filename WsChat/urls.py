from django.contrib import admin
from django.urls import path
from chat.views import index, chat

urlpatterns = [
    path("admin/", admin.site.urls),
    path('chat/<room_code>', chat),
    path("", index),
]
