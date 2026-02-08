from django.contrib import admin

# Register your models here.
from .models import Prediction

admin.site.register(Prediction)
admin.site.register

admin.site.site_header = "Yield Predictor Admin"
admin.site.site_url = "http://localhost:3000"
