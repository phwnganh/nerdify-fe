// import React from "react";
// import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const CustomPieChart = ({ data01, data02, chartTitle }) => {
//   return (
//     <div
//       style={{
//         width: "100%",
//         maxWidth: "800px",
//         padding: "20px",
//         backgroundColor: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Chart Title */}
//       <div
//         style={{
//           marginBottom: "20px",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <h3>{chartTitle}</h3>
//       </div>

//       <ResponsiveContainer width="100%" height={400}>
//         <PieChart>
//           <Tooltip />
//           <Legend verticalAlign="top" height={36} />

//           {/* First Pie - Using the fill color from the data */}
//           <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} label />

//           {/* Optional Second Pie */}
//           {data02 && <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" />}
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CustomPieChart;

import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomPieChart = ({ data01, data02, chartTitle }) => {
  return (
    <div
      style={{
        // width: "100%",
        // maxWidth: "800px",
        // padding: "20px", // Optional: More padding for larger size
        // backgroundColor: "#fff",
        // borderRadius: "8px",
        // boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "800px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Chart Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>{chartTitle}</h3>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {/* Increased height */}
        <PieChart>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />

          {/* First Pie - Larger radius */}
          <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label />

          {/* Optional Second Pie */}
          {data02 && <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={110} outerRadius={140} fill="#82ca9d" />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
