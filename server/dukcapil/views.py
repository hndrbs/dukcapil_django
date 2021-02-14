from django.shortcuts import render, redirect
from django.http import  HttpResponse, JsonResponse, Http404
from .serializers import DukcapilDataSerializer, ReligionSerializer, MaritalStatusSerializer
from .models import DukcapilData, Religion, MaritalStatus, DukcapilCheckResult
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .forms import AddEditForm

# Rest API section
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
  try:
    oneDukcapil = DukcapilData.objects.get(dukcapil_data_id=dukcapil_data_id)
  except:
    # return Response(status=status.HTTP_404_NOT_FOUND)
    raise Http404
    # return HttpResponse('<h2> Data Not found </h2>')

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


@api_view(['GET'])
def religionList(request):
  religions = Religion.objects.all()
  religionsSerializer = ReligionSerializer(religions, many=True)
  return JsonResponse(religionsSerializer.data, safe=False)

@api_view(['GET'])
def maritalStatusList(request):
  allMaritalStatus = MaritalStatus.objects.all()
  allMaritalStatusSerializer = MaritalStatusSerializer(allMaritalStatus, many=True)
  return JsonResponse(allMaritalStatusSerializer.data, safe=False)


# web section
def web_dukcapil_list(request):
  dukcapil_data = DukcapilData.objects.all()
  context = { 'data': dukcapil_data }
  return render(request, 'dukcapil/dukcapil_list.html', context)

def web_add_form(request):
  if request.method == 'GET':
    form = AddEditForm()  
  else:
    form = AddEditForm(request.POST)
    if form.is_valid():
      # data = form.cleaned_data
      form.save()
      return redirect('dukcapil_list')
  return render(request, 'dukcapil/form.html', { 'form': form, 'action': '/web/add/' })
  
def web_edit_form(request, dukcapil_data_id):
  data = DukcapilData.objects.get(dukcapil_data_id=dukcapil_data_id)
  if request.method == 'GET':
    form = AddEditForm(instance=data)
  else:
    form = AddEditForm(request.POST, instance=data)
    if form.is_valid():
      # data = form.cleaned_data
      form.save()
      return redirect('dukcapil_list')
  return render(request, 'dukcapil/form.html', { 'form': form, 'action': '/web/edit/' + str(dukcapil_data_id) + '/'})

def web_delete (request, dukcapil_data_id):
  if request.method == 'POST':
    data = DukcapilData.objects.get(dukcapil_data_id=dukcapil_data_id)
    data.delete()
  
  return redirect('dukcapil_list')