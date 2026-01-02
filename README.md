# Employee Burnout Detection System 🧠💼

An end-to-end full-stack application that predicts employee burnout levels using machine learning and visualizes risk insights through an admin dashboard.

---

## 🚀 Project Overview

The Employee Burnout Detection System is designed to help organizations proactively identify employees at risk of burnout.  
It combines behavioral telemetry data, a machine learning prediction model, and a real-time dashboard for HR teams.

The system predicts burnout percentage and categorizes employees into **Low**, **Medium**, or **High** risk levels.

---

## 🛠️ Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Scikit-learn
- Joblib

### Machine Learning
- Random Forest Regressor
- Feature engineering on typing & usage patterns
- Model persistence with joblib

### Frontend
- React.js
- JavaScript (ES6)
- Tailwind CSS
- Fetch API

---

## 🔍 Features

- Predicts employee burnout percentage using ML
- Risk classification: Low / Medium / High
- REST API built with FastAPI
- Admin dashboard displaying employee burnout metrics
- SQLite database with seeded employee data
- Frontend ↔ Backend live integration (CORS enabled)

---

## 📊 Input Signals Used

- Average key press interval
- Backspace rate
- Mouse movement count
- Application switch count

---

## ▶️ How to Run the Project

### 1️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
