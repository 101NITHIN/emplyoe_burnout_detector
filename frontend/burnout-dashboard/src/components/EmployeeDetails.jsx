export default function EmployeeDetails({ employee }) {
  if (!employee) {
    return (
      <div className="text-slate-400 text-sm">
        Select an employee to view details
      </div>
    );
  }

  const risk =
    employee.burnout_score >= 70
      ? "High Risk"
      : employee.burnout_score >= 40
      ? "Moderate"
      : "Healthy";

  const riskColor =
    risk === "High Risk"
      ? "bg-red-500"
      : risk === "Moderate"
      ? "bg-yellow-400"
      : "bg-green-500";

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{employee.name}</h2>
        <span
          className={`inline-block mt-1 px-3 py-1 text-xs rounded-full text-black ${riskColor}`}
        >
          {risk}
        </span>
      </div>

      <div className="text-sm space-y-2">
        <p>
          <strong>Burnout Score:</strong>{" "}
          {employee.burnout_score.toFixed(1)}%
        </p>
        <p>
          <strong>Typing Interval:</strong>{" "}
          {employee.avg_key_interval}
        </p>
        <p>
          <strong>Backspace Rate:</strong>{" "}
          {employee.backspace_rate}
        </p>
        <p>
          <strong>App Switches:</strong>{" "}
          {employee.app_switch_count}
        </p>
      </div>
    </div>
  );
}
