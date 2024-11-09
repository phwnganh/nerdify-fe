// Initial Path: src/services/AdminService/index.js

import client from "../client";
import { ADMIN_SERVICE_URI } from "./url";

// Fetch all users (Authenticated with token)
export const getAllUsers = async () => {
  const res = await client.get(ADMIN_SERVICE_URI.USERS.GET_ALL);
  return res.data;
};

// Get user detail by user ID
export const getUserDetail = async (userId) => {
  const res = await client.get(ADMIN_SERVICE_URI.USERS.GET_DETAIL.replace(":userId", userId));
  return res.data;
};

// Ban user by ID
export const banUser = async (userId) => {
  const res = await client.put(ADMIN_SERVICE_URI.USERS.BAN.replace(":userId", userId));
  return res.data;
};

// Update user role
export const updateUserRole = async (userId, role) => {
  const res = await client.put(ADMIN_SERVICE_URI.USERS.UPDATE_ROLE.replace(":userId", userId), { role });
  return res.data;
};

// Create a new user
export const createUser = async (userData) => {
  const res = await client.post(ADMIN_SERVICE_URI.USERS.CREATE, userData);
  return res.data;
};

// Get all packages
export const getAllPackages = async () => {
  const res = await client.get(ADMIN_SERVICE_URI.PACKAGES.GET_ALL);
  return res.data;
};

// Create a new package
export const createPackage = async (packageData) => {
  const res = await client.post(ADMIN_SERVICE_URI.PACKAGES.CREATE, packageData);
  return res.data;
};

// Update package by ID
export const updatePackage = async (packageId, packageData) => {
  const res = await client.put(ADMIN_SERVICE_URI.PACKAGES.UPDATE.replace(":packageId", packageId), packageData);
  return res.data;
};

// Delete package by ID
export const deletePackage = async (packageId) => {
  const res = await client.delete(ADMIN_SERVICE_URI.PACKAGES.DELETE.replace(":packageId", packageId));
  return res.data;
};

// get statistics
export const getStatistics = async () => {
  const res = await client.get(ADMIN_SERVICE_URI.STATISTICS.GET_ALL);
  return res.data;
};
