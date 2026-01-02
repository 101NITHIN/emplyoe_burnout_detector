import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { day: "Mon", burn: 28 },
  { day: "Tue", burn: 42 },
  { day: "Wed", burn: 48 },
  { day: "Thu", burn: 60 },
  { day: "Fri", burn: 70 },
  { day: "Sat", burn: 62 },
  { day: "Sun", burn: 40 },
];

export default function LineTrend(){
  return (
    <div style={{width:"100%", height: 300}}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradLine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="day" stroke="var(--muted)" />
          <YAxis stroke="var(--muted)" />
          <CartesianGrid stroke="rgba(255,255,255,0.02)" />
          <Tooltip contentStyle={{background:"#0b1220", border:'1px solid rgba(255,255,255,0.04)'}} itemStyle={{color:'#fff'}}/>
          <Line type="monotone" dataKey="burn" stroke="#06b6d4" strokeWidth={2} dot={{r:3, fill:'#fff'}} activeDot={{r:5}} fill="url(#gradLine)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
