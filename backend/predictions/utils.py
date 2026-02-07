
import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error


DATA_PATH = r"c:\Users\ANTONY\Downloads\maize_yield_dataset_20000 (1).csv"


try:
    df = pd.read_csv(DATA_PATH)
except FileNotFoundError:
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")
except Exception as e:
    raise Exception(f"Failed to load dataset: {e}")


FEATURES = ["rainfall", "temperature", "nitrogen", "phosphorus", "potassium", "ph"]
TARGET = "yield"

X = df[FEATURES]
y = df[TARGET]


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)


y_pred_test = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
print(f"Random Forest trained! RMSE on test set: {rmse:.2f}")


def predict_yield(rainfall, temperature, nitrogen, phosphorus, potassium, ph):
    """
    Predict crop yield based on input features.
    """
    features = np.array([[rainfall, temperature, nitrogen, phosphorus, potassium, ph]])
    try:
        prediction = model.predict(features)[0]
        return round(float(prediction), 2)
    except Exception as e:
        raise ValueError(f"Prediction failed: {e}")


def generate_recommendations(predicted_yield, rainfall, temperature, nitrogen, phosphorus, potassium, ph):
    """
    Generate detailed recommendations based on predicted yield and individual input factors.
    """
    recommendations = []

    # Soil nutrient recommendations
    if nitrogen < 50:
        recommendations.append("Increase nitrogen fertilization")
    elif nitrogen > 200:
        recommendations.append("Reduce nitrogen application to avoid soil degradation")

    if phosphorus < 20:
        recommendations.append("Add phosphorus-rich fertilizer")
    elif phosphorus > 80:
        recommendations.append("Avoid excess phosphorus to prevent runoff")

    if potassium < 100:
        recommendations.append("Apply potassium fertilizer to improve crop health")
    elif potassium > 250:
        recommendations.append("Reduce potassium application to prevent soil imbalance")

    # Soil pH recommendations
    if ph < 5.8:
        recommendations.append("Apply lime to raise soil pH")
    elif ph > 7.2:
        recommendations.append("Add sulfur or acidifying amendments to lower pH")

    # Environmental recommendations
    if rainfall < 500:
        recommendations.append("Improve irrigation to compensate for low rainfall")
    elif rainfall > 1000:
        recommendations.append("Ensure proper drainage to avoid waterlogging")

    if temperature < 20:
        recommendations.append("Consider early-maturing crop varieties")
    elif temperature > 30:
        recommendations.append("Provide shade or mulching to protect crops from heat stress")

    # Yield-based recommendations
    if predicted_yield < 50:
        recommendations.extend([
            "Increase overall crop management attention",
            "Test soil for deficiencies",
            "Implement pest and disease control measures"
        ])
    elif predicted_yield < 100:
        recommendations.extend([
            "Maintain current practices and monitor crop health",
            "Ensure irrigation and fertilization are adequate"
        ])
    else:
        recommendations.extend([
            "Maintain sustainable practices to preserve high yield",
            "Optimize harvesting to prevent losses"
        ])

    return recommendations
