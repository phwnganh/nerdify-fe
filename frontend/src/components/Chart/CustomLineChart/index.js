import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// ============================  Sample data ============================ |
// const dataChart = [
//     { month: "Tháng 7", "Gói 6 tháng": 10, "Gói 12 tháng": 5 },
//     { month: "Tháng 8", "Gói 6 tháng": 15, "Gói 12 tháng": 7 },
//     { month: "Tháng 9", "Gói 6 tháng": 14, "Gói 12 tháng": 6 },
//     { month: "Tháng 10", "Gói 6 tháng": 14, "Gói 12 tháng": 6 },
//     { month: "Tháng 11", "Gói 6 tháng": 12, "Gói 12 tháng": 5 },
//     { month: "Tháng 12", "Gói 6 tháng": 13, "Gói 12 tháng": 5 },
//     { month: "Tháng 1", "Gói 6 tháng": 11, "Gói 12 tháng": 4 },
//   ];
//   const chartTitle = "Lượng học viên mới đăng ký gói Premium trong tháng";
//   const dataKey = [
//     { dataKey: "Gói 6 tháng", color: "#fa8c16" },
//     { dataKey: "Gói 12 tháng", color: "#722ed1" },
//   ];
// ====================================================================== |

const CustomLineChart = ({ dataChart, chartTitle, dataKey }) => {
  console.log(dataChart);
  return (
    <div
      style={{
        width: "100%",
        // maxWidth: "800px",
        height: "auto",
        // margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* chart title */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <h3>{chartTitle}</h3>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dataChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
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
