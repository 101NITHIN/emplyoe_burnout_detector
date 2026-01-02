import React from "react";
import { FiHome, FiUsers, FiBell, FiSettings } from "react-icons/fi";

export default function Sidebar(){
  return (
    <aside className="w-64 bg-[#071725] border-r border-[rgba(255,255,255,0.03)] min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <div className="text-xl font-bold">Company</div>
        <div className="text-xs text-slate-400">Employee Health Suite</div>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<FiHome/>} label="Dashboard" />
        <NavItem icon={<FiUsers/>} label="Employees" />
        <NavItem icon={<FiBell/>} label="Alerts" />
        <NavItem icon={<FiSettings/>} label="Settings" />
      </nav>

      <div className="mt-6">
        <div className="text-xs text-slate-400 mb-2">Model Status</div>
        <div className="w-full bg-[rgba(255,255,255,0.06)] rounded h-3 relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#06b6d4] to-[#0ea5a3]" style={{width:"68%"}}/>
        </div>
        <div className="text-xs text-slate-400 mt-2">Running</div>
      </div>
    </aside>
  )
}

function NavItem({icon, label}){
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[rgba(255,255,255,0.02)] cursor-pointer">
      <div className="text-slate-300">{icon}</div>
      <div className="text-sm text-slate-200">{label}</div>
    </div>
  )
}
