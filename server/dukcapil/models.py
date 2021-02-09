from django.db import models

# Create your models here.

class Religion (models.Model):
  religion_id = models.AutoField(primary_key=True)
  religion_name = models.CharField(max_length=50, unique=True)
  
  def __str__(self):
      return self.religion_name

  class Meta:
    db_table = 'm_religion'

class MaritalStatus (models.Model):
  marital_status_id = models.AutoField(primary_key=True)
  marital_status_desc = models.CharField(max_length=50, unique=True)

  class Meta:
    db_table = 'm_marital_status'
  
  def __str__(self):
      return self.marital_status_desc

class DukcapilData (models.Model):
  dukcapil_data_id = models.AutoField(primary_key=True)
  nik = models.CharField(max_length=50, unique=True)
  name = models.CharField(max_length=30)
  maiden_name = models.CharField(max_length=30)
  birth_date = models.DateField(auto_now=False, auto_now_add=False)
  gender = models.CharField(max_length=10, choices=[
    ('male', 'Male'), ('female', 'Female')
  ])
  religion_id = models.ForeignKey(Religion, on_delete=models.CASCADE)
  marital_status = models.ForeignKey(MaritalStatus, on_delete=models.CASCADE, to_field='marital_status_desc')

  class Meta :
    db_table = 'm_dukcapil_data'
  
  def __str__(self):
      return self.name