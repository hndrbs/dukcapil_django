from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    # path('', views.index, name='index'),
    # path('api/', include(router.urls))
    path('dukcapil/<int:dukcapil_data_id>/', views.dukcapilDetail),
    path('dukcapil/', views.dukcapilList),
    path('religion/', views.religionList),
    path('marital_status/', views.maritalStatusList)
]
