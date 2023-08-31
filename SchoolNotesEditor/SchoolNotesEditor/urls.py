from django.contrib import admin
from django.urls import path
from notes_editor import views

urlpatterns = [
    path('admin/',admin.site.urls),
    path('', views.home, name='home')
]
