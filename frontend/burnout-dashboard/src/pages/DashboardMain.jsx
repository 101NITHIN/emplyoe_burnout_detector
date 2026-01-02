import React, { useEffect, useState } from "react";

export default function DashboardMain() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/employees")
      .then(res => res.json())
      .then(setEmployees);
  }, []);

  const predictBurnout = async (emp) => {
    setSelectedEmployee(emp);
    setPrediction(null);

    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avg_key_interval: emp.avg_key_interval,
        backspace_rate: emp.backspace_rate,
        mouse_move_count: emp.mouse_move_count,
        app_switch_count: emp.app_switch_count
      })
    });

    const data = await res.json();
    setPrediction(data);
  };

  const badge = (status) =>
    status === "High"
      ? "bg-red-600"
      : status === "Medium"
      ? "bg-yellow-500"
      : "bg-green-600";

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">

      {/* TABLE */}
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-4">HR Burnout Dashboard</h1>

        <table className="w-full border border-slate-700">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Burnout</th>
              <th className="p-2">Risk</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr
                key={emp.id}
                onClick={() => predictBurnout(emp)}
                className="border-t border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                <td className="p-2">{emp.name}</td>
                <td className="p-2 text-center">{emp.burnout_score}%</td>
                <td className="p-2 text-center">
                  <span className={`px-3 py-1 rounded ${badge(emp.status)}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LIVE PREDICTION */}
      <div className="bg-slate-800 p-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Live Prediction</h2>

        {!selectedEmployee ? (
          <p className="text-gray-400">Select an employee</p>
        ) : !prediction ? (
          <p className="text-gray-400">Predicting...</p>
        ) : (
          <>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>Burnout:</strong> {prediction.burnout_score}%</p>
            <span className={`inline-block mt-2 px-4 py-1 rounded ${badge(prediction.status)}`}>
              {prediction.status} Risk
            </span>
          </>
        )}
      </div>
    </div>
  );
}
