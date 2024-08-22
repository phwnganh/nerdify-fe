const DOMAIN = process.env.REACT_APP_ROOT_API;
// const TEST_DOMAIN = process.env.REACT_APP_MOCK_API;
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

const URI_PAYMENT_SERVICE = {};

export const SERVER_URI = {
  DOMAIN: DOMAIN,
  AUTH_SERVICE: URI_AUTH_SERVICE,
  PAYMENT_SERVICE: URI_PAYMENT_SERVICE,
};

export const CLIENT_URI = {
  // GUEST
  LANDING_PAGE: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email/:emailToken",
  MODAL_REQUIRE_TO_LOGIN: "/modal-require-to-login",
  // LEARNER
  HOME_PAGE: "/home",
  LEVEL_DETAIL: "/level-detail",
  ONE_EXERCISE: "/one-exercise",
  FINAL_EXAM: "/final-exam",
  PROFILE: "/personal-profile",
  FLASH_CARD: "/flash-card",
  CREATE_FLASH_CARD: "/create-flash-card",
  // ADMIN
  DASHBOARD: "/dashboard",
};
