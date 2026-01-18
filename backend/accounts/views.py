# from rest_framework import generics
# from django.contrib.auth.models import User
# from .serializers import RegisterSerializer

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer
    
#     #JWT Login will be handled by simpleJWT [no custom view needed]


from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from predictions.models import Prediction
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    DashboardSerializer,
)


# 🔹 EXISTING — KEEP AS IS
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    # JWT login handled by SimpleJWT


# ==================================================
# ✅ NEW: CURRENT LOGGED-IN USER (Profile)
# ==================================================
class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ==================================================
# ✅ NEW: USER DASHBOARD DATA
# ==================================================
class DashboardView(generics.GenericAPIView):
    serializer_class = DashboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        qs = Prediction.objects.filter(user=request.user).order_by("-created_at")
        latest = qs.first()

        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "total_predictions": qs.count(),
            "latest_yield": latest.yield_prediction if latest else None,
        })
