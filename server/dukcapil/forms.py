from django import forms
from .models import Religion, MaritalStatus, DukcapilData
from datetime import date

class AddForm(forms.Form):
  name = forms.CharField(label='Name', max_length=50)
  nik = forms.CharField(label='NIK', max_length=50)
  maiden_name = forms.CharField(label='Maiden Name' ,max_length=50)
  birth_date = forms.DateField(
    label='Birth Date',
    initial=date.today,
    widget=forms.DateInput(attrs={'class': 'datepicker'})
  )
  gender = forms.CharField(
    max_length=10,
    widget=forms.RadioSelect(choices=[('Male','Male'), ('Female', 'Female')])
  )
  religion_id = forms.ModelChoiceField(queryset=Religion.objects.all())
  marital_status = forms.ModelChoiceField(queryset=MaritalStatus.objects.all())
  # class Meta:
  #   model = DukcapilData
  #   fields = '__all__'
