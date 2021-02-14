from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('web/', views.web_dukcapil_list, name='dukcapil_list'),
    path('web/add/', views.web_add_form, name='dukcapil_add'),
    path('web/edit/<int:dukcapil_data_id>/', views.web_edit_form),
    path('web/delete/<int:dukcapil_data_id>/', views.web_delete),
    path('dukcapil/<int:dukcapil_data_id>/', views.dukcapilDetail),
    path('dukcapil/', views.dukcapilList),
    path('religion/', views.religionList),
    path('marital_status/', views.maritalStatusList)
]
