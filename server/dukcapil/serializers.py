from rest_framework import serializers
from .models import DukcapilData, Religion, MaritalStatus

class DukcapilDataSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = DukcapilData
    fields = ['nik', 'name', 'maiden_name', 'birth_date', 'gender', 'religion_name', 'marital_status_desc' ]
