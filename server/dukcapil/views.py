from django.shortcuts import render
from django.http import  HttpResponse
from .serializers import DukcapilDataSerializer
from .models import DukcapilData, Religion, MaritalStatus
from rest_framework import viewsets
# Create your views here.

def index(request):
  # return HttpResponse("gasss")
  return render(request, 'index.html')

class DukcapilViewSet(viewsets.ModelViewSet):
  queryset = DukcapilData.objects.all()
  serializer_class = DukcapilDataSerializer
