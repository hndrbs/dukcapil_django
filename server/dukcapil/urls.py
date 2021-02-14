from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('web/', views.web_dukcapil_list, name="dukcapiil_list"),
    path('web/add/', views.web_add_form, name="dukcapil_add_form"),
    path('dukcapil/<int:dukcapil_data_id>/', views.dukcapilDetail),
    path('dukcapil/', views.dukcapilList),
    path('religion/', views.religionList),
    path('marital_status/', views.maritalStatusList)
]
