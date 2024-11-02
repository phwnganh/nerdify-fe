// path : src/pages/AdminPage/PremiumManagement/index.js
import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import TablePremiumPack from "../../../components/Table/TablePremiumPack";
import { getAllPackages } from "../../../services/AdminService";

const PremiumManagement = () => {
  // Dữ liệu thẻ thông tin
  const hocVien = [
    { id: 1, title: "Số tài khoản trả phí", value: "100", icon: <BellOutlined /> },
    { id: 2, title: "Học viên đăng ký gói 6 tháng", value: "100", icon: <BellOutlined /> },
    { id: 3, title: "Học viên đăng ký gói 12 tháng", value: "100", icon: <BellOutlined /> },
    { id: 4, title: "Học viên đăng ký gói trọn đời", value: "100", icon: <BellOutlined /> },
  ];

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // function call api get all package
  const fetchPackages = async () => {
    try {
      const result = await getAllPackages();
      // console.log("result", result.data);
      setPackages(result.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <UserInfo />

      {/* Thẻ thông tin */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {hocVien.map((item) => (
            <HoverableCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Premium control panel */}
      <div style={{ marginTop: "20px" }}>
        <TablePremiumPack dataResponse={packages} />
        {/* <TablePremiumPack /> */}
      </div>
    </div>
  );
};

export default PremiumManagement;
