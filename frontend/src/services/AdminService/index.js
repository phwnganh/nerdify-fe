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
