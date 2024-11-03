import client from "../client";
import { AUTH_SERVER_URI } from "./url";

export const register = async (params) => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.REGISTER, params);
  return res.data;
};

export const login = async (params) => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.LOGIN, params);
  return res.data;
};

export const logout = async () => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.LOGOUT);
  return res.data;
};

export const verifyEmail = async (params) => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.VERIFY_EMAIL, params);
  return res.data;
};

export const sendActivation = async (params) => {
  const res = await client.post(
    AUTH_SERVER_URI.AUTH_SERVICE.SEND_ACTIVATION,
    params
  );
  return res.data;
};

export const forgotPassword = async (params) => {
  const res = await client.post(
    AUTH_SERVER_URI.AUTH_SERVICE.FORGOT_PASSWORD,
    params
  );
  return res.data;
};

export const resetPassword = async (params) => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.RESET_PASSWORD, params);
  return res.data;
};

export const token = async (params) => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.TOKEN, params);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await client.get(AUTH_SERVER_URI.AUTH_SERVICE.CURRENT_USER);
  return res.data;
};

export const viewUserProfile = async() => {
  const res = await client.get(AUTH_SERVER_URI.AUTH_SERVICE.VIEW_PROFILE);
  return res.data;
}

export const changeUserProfile = async(params) => {
  const res = await client.put(AUTH_SERVER_URI.AUTH_SERVICE.CHANGE_PROFILE, params);
  return res.data;
}

export const changePassword = async (params) => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.CHANGE_PASSWORD, params);
  return res.data;
}

export const cancelPremium = async() => {
  const res = await client.post(AUTH_SERVER_URI.AUTH_SERVICE.CANCEL_PREMIUM);
  return res.data;
}
