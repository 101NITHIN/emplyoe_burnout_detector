import React from "react";
import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";
import DashboardMain from "./pages/DashboardMain";

function App(){
  return (
    <div className="min-h-screen flex text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topnav />
        <main className="p-6">
          <DashboardMain />
        </main>
      </div>
    </div>
  )
}

export default App;
