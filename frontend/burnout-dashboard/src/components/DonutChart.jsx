import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Typing patterns", value: 40 },
  { name: "Mouse activity", value: 25 },
  { name: "Sentiment", value: 20 },
  { name: "Sleep", value: 15 },
];

const COLORS = ["#06b6d4","#f97316","#ef4444","#a3e635"];

export default function DonutChart(){
  return (
    <div style={{width:"100%", height: 250}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
            {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Legend verticalAlign="bottom" wrapperStyle={{color:'#94a3b8', fontSize:12}} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
