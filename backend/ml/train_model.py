import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

# Load dataset
df = pd.read_csv(r"C:\Users\ANTONY\Downloads\maize_yield_dataset_20000 (1).csv")

X = df.drop("yield", axis=1)
y = df["yield"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestRegressor(n_estimators=300, random_state=42, n_jobs=-1)
model.fit(X_train_scaled, y_train)

# Save model **directly to backend/ml/**
joblib.dump(model, r"C:\Users\ANTONY\Desktop\Yield_Predictor\backend\ml\yield_model.pkl")
joblib.dump(scaler, r"C:\Users\ANTONY\Desktop\Yield_Predictor\backend\ml\scaler.pkl")

print("Model saved successfully in backend/ml/")
