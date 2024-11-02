// File: src/pages/AdminPage/PremiumManagement/index.js

import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import TablePremiumPack from "../../../components/Table/TablePremiumPack";
import { getAllPackages, createPackage } from "../../../services/AdminService";

const PremiumManagement = () => {
  // Dữ liệu thẻ thông tin
  const hocVien = [
    {
      id: 1,
      title: "Số tài khoản trả phí",
      value: "100",
      icon: <BellOutlined />,
    },
    {
      id: 2,
      title: "Học viên đăng ký gói 6 tháng",
      value: "100",
      icon: <BellOutlined />,
    },
    {
      id: 3,
      title: "Học viên đăng ký gói 12 tháng",
      value: "100",
      icon: <BellOutlined />,
    },
    {
      id: 4,
      title: "Học viên đăng ký gói trọn đời",
      value: "100",
      icon: <BellOutlined />,
    },
  ];

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all packages from the server
  const fetchPackages = async () => {
    try {
      const result = await getAllPackages();
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

  // Function to add a new package
  const addPackage = async (newPackageData) => {
    try {
      const response = await createPackage(newPackageData);
      const createdPackage = response.data; // Adjusted based on API response
      setPackages((prevPackages) => {
        const updatedPackages = [...prevPackages, createdPackage];
        console.log("Updated Packages:", updatedPackages);
        return updatedPackages;
      });
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };

  // Function to update an existing package
  const updatePackage = (updatedPackageData) => {
    setPackages((prevPackages) => prevPackages.map((pkg) => (pkg._id === updatedPackageData._id ? updatedPackageData : pkg)));
  };

  // Function to delete a package
  const deletePackage = (packageId) => {
    setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== packageId));
  };

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
        <TablePremiumPack packages={packages} addPackage={addPackage} updatePackage={updatePackage} deletePackage={deletePackage} />
      </div>
    </div>
  );
};

export default PremiumManagement;
