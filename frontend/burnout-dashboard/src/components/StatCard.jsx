import React from "react";

export default function StatCard({title, value, sub, accent}) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-300">{title}</div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
      </div>
      <div className={`w-10 h-10 rounded-md ${accent ? '' : 'bg-slate-600'}`} style={{background: accent || 'linear-gradient(90deg,#334155,#0f1724)'}}/>
    </div>
  )
}
