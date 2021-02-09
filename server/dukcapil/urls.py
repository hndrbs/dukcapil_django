from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', views.DukcapilViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    # path('api/', include(router.urls))
    path('api/<int:dukcapil_data_id>', views.dukcapilDetail),
    path('api/', views.dukcapilList),
]
