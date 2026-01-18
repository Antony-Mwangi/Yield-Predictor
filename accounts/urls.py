from django.urls import path

from predictions.views import MeView
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path("me/", MeView.as_view(), name="me"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]