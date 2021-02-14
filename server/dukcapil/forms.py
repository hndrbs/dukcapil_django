from django import forms
from .models import Religion, MaritalStatus, DukcapilData
from datetime import date

class AddEditForm(forms.ModelForm):
  # name = forms.CharField(label='Name', max_length=50)
  # nik = forms.CharField(label='NIK', max_length=50)
  # maiden_name = forms.CharField(label='Maiden Name' ,max_length=50)
  birth_date = forms.DateField(
    label='Birth Date',
    initial=date.today,
    widget=forms.SelectDateWidget(years=range(1930, 2022))
  )
  gender = forms.CharField(
    max_length=10,
    widget=forms.RadioSelect(choices=[('Male','Male'), ('Female', 'Female')])
  )
  religion_id = forms.ModelChoiceField(queryset=Religion.objects.all(), label='Religion')
  marital_status = forms.ModelChoiceField(queryset=MaritalStatus.objects.all(), label="Marital Status")

  class Meta:
    model = DukcapilData
    fields = '__all__'