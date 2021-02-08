from django.contrib import admin
from .models import Religion, MaritalStatus, DukcapilData

# Register your models here.
admin.site.register(Religion)
admin.site.register(MaritalStatus)
admin.site.register(DukcapilData)
