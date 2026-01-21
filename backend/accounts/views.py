
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from predictions.models import Prediction
from .serializers import RegisterSerializer, UserSerializer

# User Registration

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    # JWT login handled via SimpleJWT at /login/


# Get Logged-in User Info

class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# User Dashboard

class DashboardView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # All predictions for this user
        qs = Prediction.objects.filter(user=request.user).order_by("-created_at")
        latest = qs.first()

        # Serialize prediction list
        predictions = [
            {
                "id": p.id,
                "created_at": p.created_at,
                "seed_variety": p.seed_variety,
                "yield_prediction": p.yield_prediction,
            }
            for p in qs
        ]

        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "welcome_message": f"Welcome {request.user.username} 👋",
            "total_predictions": qs.count(),
            "latest_yield": latest.yield_prediction if latest else None,
            "predictions": predictions,
        })
