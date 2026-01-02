import React from "react";

export default function ChartCard({title, children, subtitle}) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-100 font-semibold">{title}</h3>
        {subtitle && <div className="text-sm text-slate-400">{subtitle}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}
