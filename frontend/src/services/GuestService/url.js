import { BASE_SERVER } from "../../constants/common.constant";

const DOMAIN = BASE_SERVER;
const API_AUTH_PREFIXES = {
  AUTH: "/api/auth",
};

const URI_AUTH_SERVICE = {
  LOGIN: API_AUTH_PREFIXES.AUTH + "/login",
  LOGIN_WITH_GOOGLE: BASE_SERVER + API_AUTH_PREFIXES.AUTH + "/google/callback",
  REGISTER: API_AUTH_PREFIXES.AUTH + "/register",
  FORGOT_PASSWORD: API_AUTH_PREFIXES.AUTH + "/forgot-password",
  RESET_PASSWORD: API_AUTH_PREFIXES.AUTH + "/reset-password",
  VERIFY_EMAIL: API_AUTH_PREFIXES.AUTH + "/verify-email",
  SEND_ACTIVATION: API_AUTH_PREFIXES.AUTH + "/send-activation",
  
  CURRENT_USER: API_AUTH_PREFIXES.AUTH + "/current-user",
  LOGOUT: API_AUTH_PREFIXES.AUTH + "/logout",
  TOKEN: API_AUTH_PREFIXES.AUTH + "/token",
  VIEW_PROFILE: API_AUTH_PREFIXES.AUTH + "/view-profile",
  CHANGE_PROFILE: API_AUTH_PREFIXES.AUTH + "/change-profile",
  CHANGE_PASSWORD: API_AUTH_PREFIXES.AUTH + "/change-password"
};

export const AUTH_SERVER_URI = {
  DOMAIN: DOMAIN,
  AUTH_SERVICE: URI_AUTH_SERVICE,
};
