from rest_framework import serializers
from .models import DukcapilData, Religion, MaritalStatus, DukcapilCheckResult
# , Religion, MaritalStatus

class DukcapilDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = DukcapilData
    fields = ['dukcapil_data_id', 'nik', 'name', 'maiden_name', 'birth_date', 'gender', 'religion_id', 'marital_status' ]

class ReligionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Religion
    fields = ['religion_id', 'religion_name']

class MaritalStatusSerializer(serializers.ModelSerializer):
  class Meta:
    model = MaritalStatus
    fields = ['marital_status_id', 'marital_status_desc']

class DukcapilCheckResultSerializer(serializers.ModelSerializer):
  class Meta:
    model = DukcapilCheckResult
    fields = '__all__'