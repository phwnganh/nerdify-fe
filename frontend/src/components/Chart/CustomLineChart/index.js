import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomLineChart = ({ dataChart, chartTitle, dataKey, xAxisKey }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* chart title */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>{chartTitle}</h3>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dataChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* Sử dụng xAxisKey được truyền vào */}
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {dataKey.map((key) => (
            <Line key={key.dataKey} type="monotone" dataKey={key.dataKey} stroke={key.color} activeDot={{ r: 8 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
