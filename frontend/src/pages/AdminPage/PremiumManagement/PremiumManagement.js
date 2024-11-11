// File: src/pages/AdminPage/PremiumManagement/index.js

import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import UserInfo from "../../../components/Header/AdminHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import TablePremiumPack from "../../../components/Table/TablePremiumPack";
import { getAllPackages, createPackage, updatePackage as updatePackageService, deletePackage as deletePackageService } from "../../../services/AdminService";

const PremiumManagement = () => {
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

  // // Function to update an existing package
  // const handleUpdatePackage = async (packageId, updatedPackageData) => {
  //   try {
  //     const response = await updatePackageService(packageId, updatedPackageData);
  //     const updatedPackage = response.data; // Adjusted based on API response
  //     setPackages((prevPackages) => prevPackages.map((pkg) => (pkg._id === packageId ? updatedPackage : pkg)));
  //   } catch (error) {
  //     console.error("Error updating package:", error);
  //   }
  // };
  // Function to update an existing package
  const handleUpdatePackage = async (packageId, updatedPackageData) => {
    try {
      const response = await updatePackageService(packageId, updatedPackageData);
      const updatedPackage = response.data;

      // Update packages state
      setPackages((prevPackages) => prevPackages.map((pkg) => (pkg._id === packageId ? updatedPackage : pkg)));
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  // Function to delete a package
  const handleDeletePackage = async (packageId) => {
    try {
      await deletePackageService(packageId);
      setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== packageId));
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <UserInfo />

      {/* Premium control panel */}
      <div style={{ marginTop: "20px" }}>
        <TablePremiumPack packages={packages} addPackage={addPackage} updatePackage={handleUpdatePackage} deletePackage={handleDeletePackage} />
      </div>
    </div>
  );
};

export default PremiumManagement;
