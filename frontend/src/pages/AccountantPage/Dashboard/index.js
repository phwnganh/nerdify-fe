import React from "react";
import { BellOutlined } from "@ant-design/icons";

const AccountantDashboard = () => {
  const doanhThu = [
    {
      id: 1,
      title: "Doanh thu tháng này",
      value: "1,000,000,000 VND",
      icon: <BellOutlined />,
    },
    {
      id: 2,
      title: "Doanh thu trong năm",
      value: "1,000,000,000 VND",
      icon: <BellOutlined />,
    },
  ];

  const taiKhoanDangKyGoi = [
    {
      id: 1,
      title: "Tài khoản đăng ký gó 6 tháng",
      value: "100",
      icon: <BellOutlined />,
    },
    {
      id: 2,
      title: "Tài khoản đăng ký gói 12 tháng",
      value: "100",
      icon: <BellOutlined />,
    },
  ];
  return (
    <>
      <div style={{ padding: "20px" }}>
        {/* information  */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Xin chào, Đoàn Thành Chung 🎉</span>
          <span style={{ fontSize: "0.9rem", color: "#666" }}>Tài khoản quyền : Accountant - Ngày tạo : 10/01/2025</span>
        </div>

        {/* doanh thu card + ố tài khoản đăng ký gói card*/}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            {doanhThu.map((item) => (
              <>
                <div
                  key={item.id}
                  style={{ padding: "20px", background: "#fff", borderRadius: "5px", boxShadow: "0 0 1px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-around", alignItems: "center" }}
                >
                  {/* icon  */}
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

                  {/* content  */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.9rem", color: "#666" }}>{item.title}</span>
                    </div>
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{item.value}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountantDashboard;
