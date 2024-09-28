const DOMAIN = process.env.REACT_APP_ROOT_API;
const API_PREFIXES = {
  AUTH: "/api/auth",
  PAYMENT: "/api/payment",
};

const URI_AUTH_SERVICE = {
  LOGIN: API_PREFIXES.AUTH + "/login",
  LOGIN_WITH_GOOGLE: DOMAIN + API_PREFIXES.AUTH + "/google/callback",
  REGISTER: API_PREFIXES.AUTH + "/register",
  FORGOT_PASSWORD: API_PREFIXES.AUTH + "/forgot-password",
  RESET_PASSWORD: API_PREFIXES.AUTH + "/reset-password",
  VERIFY_EMAIL: API_PREFIXES.AUTH + "/verify-email",
  SEND_ACTIVATION: API_PREFIXES.AUTH + "/send-activation",

  CURRENT_USER: API_PREFIXES.AUTH + "/current-user",
  LOGOUT: API_PREFIXES.AUTH + "/logout",
  TOKEN: API_PREFIXES.AUTH + "/token",
};

export const AUTH_SERVER_URI = {
  DOMAIN: DOMAIN,
  AUTH_SERVICE: URI_AUTH_SERVICE,
};
