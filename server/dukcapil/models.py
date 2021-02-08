from django.db import models

# Create your models here.

class Religion (models.Model):
  religion_name = models.CharField(max_length=50)
  
  def __str__(self):
      return self.religion_name

  class Meta:
    db_table = 'm_religion'

class MaritalStatus (models.Model):
  marital_status_desc = models.CharField(max_length=50)

  class Meta:
    db_table = 'm_marital_status'
  
  def __str__(self):
      return self.marital_status_desc

class DukcapilData (models.Model):
  nik = models.CharField(max_length=50)
  name = models.CharField(max_length=30)
  maiden_name = models.CharField(max_length=30)
  birth_date = models.DateField(auto_now=False, auto_now_add=False)
  gender = models.CharField(max_length=10)
  religion_id = models.OneToOneField('Religion', on_delete=models.CASCADE)
  marital_status = models.OneToOneField('MaritalStatus', on_delete=models.CASCADE)

  class Meta :
    db_table = 'm_dukcapil_data'
  
  def __str__(self):
      return self.name