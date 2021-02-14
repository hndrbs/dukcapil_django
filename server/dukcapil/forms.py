from django import forms
from .models import Religion, MaritalStatus, DukcapilData

class AddForm(forms.Form):
  religions_choices = [
    (religion.religion_id, religion.religion_name)
    for religion in Religion.objects.all()
  ]
  marital_status_choices = [
    (marital.marital_status_id, marital.marital_status_desc)
    for marital in MaritalStatus.objects.all()
  ]
  name = forms.CharField(label='Name' ,max_length=50)
  nik = forms.CharField(label='NIK' ,max_length=50)
  maiden_name = forms.CharField(label='Maiden Name' ,max_length=50)
  birth_date = forms.DateField(label='Birth Date')
  religion_id = forms.Select(choices=religions_choices)
  marital_status = forms.Select(choices=marital_status_choices)