

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Prediction
from .serializers import PredictionSerializer
from .utils import predict_yield, generate_recommendations


class PredictionCreateView(generics.CreateAPIView):
    serializer_class = PredictionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data

        # Validate input fields
        required_fields = ["rainfall", "temperature", "nitrogen", "phosphorus", "potassium", "ph"]
        try:
            inputs = {field: float(data[field]) for field in required_fields}
        except KeyError as ke:
            return Response({"error": f"Missing field: {ke}"}, status=400)
        except ValueError:
            return Response({"error": "All inputs must be numeric."}, status=400)

        seed_variety = data.get("seed_variety", "")

        try:
            # Make prediction
            predicted_yield = predict_yield(
                rainfall=inputs["rainfall"],
                temperature=inputs["temperature"],
                nitrogen=inputs["nitrogen"],
                phosphorus=inputs["phosphorus"],
                potassium=inputs["potassium"],
                ph=inputs["ph"]
            )

            # Generate recommendations using all input features
            recommendations = generate_recommendations(
                predicted_yield,
                rainfall=inputs["rainfall"],
                temperature=inputs["temperature"],
                nitrogen=inputs["nitrogen"],
                phosphorus=inputs["phosphorus"],
                potassium=inputs["potassium"],
                ph=inputs["ph"]
            )

            # Save prediction
            prediction = Prediction.objects.create(
                user=request.user,
                rainfall=inputs["rainfall"],
                temperature=inputs["temperature"],
                nitrogen=inputs["nitrogen"],
                phosphorus=inputs["phosphorus"],
                potassium=inputs["potassium"],
                ph=inputs["ph"],
                seed_variety=seed_variety,
                yield_prediction=predicted_yield
            )

            # Serialize response
            serializer = self.get_serializer(prediction)
            response_data = serializer.data
            response_data["recommendations"] = recommendations

            return Response(response_data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)


class PredictionListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        predictions = Prediction.objects.filter(user=request.user).order_by("-created_at")
        response_list = []

        for pred in predictions:
            serializer = PredictionSerializer(pred)
            data = serializer.data
            # Use all input features for generating recommendations
            data["recommendations"] = generate_recommendations(
                pred.yield_prediction,
                pred.rainfall,
                pred.temperature,
                pred.nitrogen,
                pred.phosphorus,
                pred.potassium,
                pred.ph
            )
            response_list.append(data)

        return Response(response_list)


class PredictionDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            pred = Prediction.objects.get(pk=pk, user=request.user)
        except Prediction.DoesNotExist:
            return Response({"detail": "Prediction not found."}, status=404)

        serializer = PredictionSerializer(pred)
        data = serializer.data
        # Generate recommendations with all features
        data["recommendations"] = generate_recommendations(
            pred.yield_prediction,
            pred.rainfall,
            pred.temperature,
            pred.nitrogen,
            pred.phosphorus,
            pred.potassium,
            pred.ph
        )
        return Response(data)
