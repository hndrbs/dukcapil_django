from rest_framework import serializers
from .models import DukcapilData, Religion, MaritalStatus
# , Religion, MaritalStatus

class DukcapilDataSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = DukcapilData
    fields = ['dukcapil_data_id', 'nik', 'name', 'maiden_name', 'birth_date', 'gender', 'religion_id', 'marital_status' ]
