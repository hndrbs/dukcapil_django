from django.shortcuts import render
from django.http import  HttpResponse, JsonResponse
from .serializers import DukcapilDataSerializer
from .models import DukcapilData, Religion, MaritalStatus
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser


# Create your views here.

def index(request):
  # return HttpResponse("gasss")
  return render(request, 'index.html')

class DukcapilViewSet(viewsets.ModelViewSet):
  queryset = DukcapilData.objects.all()
  serializer_class = DukcapilDataSerializer

@api_view(['GET', 'POST'])
def dukcapilList (request):
  if request.method == 'GET':
    # get all dukcail
    allDukcapil = DukcapilData.objects.all()
    dukcapil_serializer = DukcapilDataSerializer(allDukcapil, many=True)
    return JsonResponse(dukcapil_serializer.data, safe=False)

  elif request.method == 'POST':
    new_dukcapil = JSONParser().parse(request)
    dukcapil_serializer = DukcapilDataSerializer(data=new_dukcapil)
    if dukcapil_serializer.is_valid():
      dukcapil_serializer.save()
      return JsonResponse(dukcapil_serializer.data, status=status.HTTP_201_CREATED, safe=False)
    return JsonResponse(dukcapil_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def dukcapilDetail (request, dukcapil_data_id):
  # still need error handling here
    oneDukcapil = DukcapilData.objects.get(dukcapil_data_id=dukcapil_data_id)
    if request.method == 'GET':
      # get one dukcapil
      dukcapil_serializer = DukcapilDataSerializer(oneDukcapil)
      return JsonResponse(dukcapil_serializer.data, safe=False)
    
    elif request.method == 'PUT':
    # update one dukcapil
      updatedData = JSONParser().parse(request)
      dukcapil_serializer = DukcapilDataSerializer(oneDukcapil, data=updatedData)
      if dukcapil_serializer.is_valid():
        dukcapil_serializer.save()
        return JsonResponse(dukcapil_serializer.data, status=status.HTTP_200_OK, safe=False)
      return JsonResponse(dukcapil_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
      # delete one dukcapil
      copyOfDukcapil = DukcapilDataSerializer(oneDukcapil)
      oneDukcapil.delete()
      return JsonResponse(copyOfDukcapil.data, safe=False)