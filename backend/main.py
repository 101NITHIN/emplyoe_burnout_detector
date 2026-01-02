from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import joblib

from database import SessionLocal, engine, Base
from models import Employee

# ---------- App ----------
app = FastAPI(title="Employee Burnout API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Load model ----------
model = joblib.load("burnout_model.joblib")

# ---------- DB ----------
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- Seed ----------
def seed_employees():
    db = SessionLocal()
    if db.query(Employee).count() == 0:
        db.add_all([
            Employee(
                name="John Doe",
                avg_key_interval=0.32,
                backspace_rate=0.08,
                mouse_move_count=85,
                app_switch_count=6,
                burnout_score=72,
                status="High"
            ),
            Employee(
                name="Alice Smith",
                avg_key_interval=0.22,
                backspace_rate=0.04,
                mouse_move_count=140,
                app_switch_count=3,
                burnout_score=35,
                status="Low"
            )
        ])
        db.commit()
    db.close()

seed_employees()

# ---------- Schemas ----------
class PredictRequest(BaseModel):
    avg_key_interval: float
    backspace_rate: float
    mouse_move_count: int
    app_switch_count: int

# ---------- Routes ----------
@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@app.post("/predict")
def predict_burnout(data: PredictRequest):
    X = [[
        data.avg_key_interval,
        data.backspace_rate,
        data.mouse_move_count,
        data.app_switch_count
    ]]
    prediction = model.predict(X)[0]

    if prediction >= 70:
        status = "High"
    elif prediction >= 40:
        status = "Medium"
    else:
        status = "Low"

    return {
        "burnout_score": round(float(prediction), 2),
        "status": status
    }
