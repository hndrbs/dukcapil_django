from django.contrib import admin
from .models import Religion, MaritalStatus, DukcapilData, DukcapilCheckResult

# Register your models here.
admin.site.register(Religion)
admin.site.register(MaritalStatus)
admin.site.register(DukcapilData)
admin.site.register(DukcapilCheckResult)
