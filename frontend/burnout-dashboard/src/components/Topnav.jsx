import React from "react";
import { FiBell } from "react-icons/fi";

export default function Topnav(){
  return (
    <header className="bg-transparent border-b border-[rgba(255,255,255,0.04)] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-slate-100 font-semibold">Burnout Predictor</h2>
        <span className="text-slate-400 text-sm">Admin dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-[rgba(255,255,255,0.03)] px-3 py-1 rounded text-sm">Reports</button>
        <FiBell className="text-slate-200" />
        <div className="ml-2 text-sm text-slate-200">Admin</div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-500 ml-2"/>
      </div>
    </header>
  )
}
