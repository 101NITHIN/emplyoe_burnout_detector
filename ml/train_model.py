import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib

# ------------------ 1. Generate synthetic behavioral data ------------------

np.random.seed(42)
n = 3000  # more data = better learning

avg_key_interval = np.random.normal(0.28, 0.06, n)       # typing delay
backspace_rate = np.random.normal(0.06, 0.02, n)         # typing errors
mouse_move_count = np.random.poisson(110, n)             # mouse activity
app_switch_count = np.random.poisson(6, n)               # task switching

# ------------------ 2. Feature Engineering (IMPORTANT) ------------------

# Stress-related derived features
stress_index = (
    avg_key_interval * 3 +
    backspace_rate * 4 +
    app_switch_count * 1.5
)

focus_score = mouse_move_count / (app_switch_count + 1)

# ------------------ 3. Burnout score logic (realistic) ------------------

burnout_score = (
    stress_index * 18 -
    focus_score * 0.8 +
    np.random.normal(0, 4, n)
)

burnout_score = np.clip(burnout_score, 0, 100)

# ------------------ 4. Create DataFrame ------------------

df = pd.DataFrame({
    "avg_key_interval": avg_key_interval,
    "backspace_rate": backspace_rate,
    "mouse_move_count": mouse_move_count,
    "app_switch_count": app_switch_count,
    "stress_index": stress_index,
    "focus_score": focus_score,
    "burnout_score": burnout_score
})

# ------------------ 5. Train-test split ------------------

X = df.drop(columns=["burnout_score"])
y = df["burnout_score"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ------------------ 6. Train Improved Random Forest ------------------

model = RandomForestRegressor(
    n_estimators=500,
    max_depth=14,
    min_samples_split=5,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# ------------------ 7. Evaluate Model ------------------

predictions = model.predict(X_test)
rmse = mean_squared_error(y_test, predictions) ** 0.5

print(f"Model RMSE: {rmse:.4f}")

# ------------------ 8. Save Model ------------------

joblib.dump(model, "burnout_model.joblib")
print("burnout_model.joblib saved successfully!")
