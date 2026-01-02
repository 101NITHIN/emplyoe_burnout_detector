export default function EmployeeTable({ employees, onSelect }) {
  const riskColor = (score) => {
    if (score >= 70) return "text-red-500";
    if (score >= 40) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-slate-400 border-b border-slate-700">
          <tr>
            <th className="py-2">Name</th>
            <th>Burnout</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr
              key={emp.id}
              className="border-b border-slate-800 hover:bg-slate-800 cursor-pointer"
              onClick={() => onSelect(emp)}
            >
              <td className="py-2">{emp.name}</td>
              <td className={riskColor(emp.burnout_score)}>
                {emp.burnout_score.toFixed(1)}%
              </td>
              <td className={riskColor(emp.burnout_score)}>
                {emp.burnout_score >= 70
                  ? "High Risk"
                  : emp.burnout_score >= 40
                  ? "Moderate"
                  : "Healthy"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
