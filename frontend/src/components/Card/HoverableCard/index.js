import React, { useState } from "react";

export const HoverableCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  // const dataSample = () => {
  //   const doanhThu = [
  //     {
  //       id: 1,
  //       title: "Doanh thu tháng này",
  //       value: "1,000,000,000 VND",
  //       icon: <BellOutlined />,
  //     },
  //     {
  //       id: 2,
  //       title: "Doanh thu trong năm",
  //       value: "1,000,000,000 VND",
  //       icon: <BellOutlined />,
  //     },
  //   ];

  //   const taiKhoanDangKyGoi = [
  //     {
  //       id: 1,
  //       title: "Tài khoản đăng ký gói 6 tháng",
  //       value: "100",
  //       icon: <BellOutlined />,
  //     },
  //     {
  //       id: 2,
  //       title: "Tài khoản đăng ký gói 12 tháng",
  //       value: "100",
  //       icon: <BellOutlined />,
  //     },
  //   ];
  // };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "5px",
        boxShadow: "0 0 1px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "300px",
        border: `2px solid ${isHovered ? "orange" : "transparent"}`,
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.icon}
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "0.9rem", color: "#666" }}>{item.title}</span>
        </div>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{item.value}</span>
      </div>
    </div>
  );
};

export default HoverableCard;
