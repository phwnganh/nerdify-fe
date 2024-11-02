// Initial Path src/services/LearnerService/url.js

import { BASE_SERVER } from "../../constants/common.constant";

const DOMAIN = BASE_SERVER;
const API_PREFIXES = {
  ADMIN: "/api/auth/admin",
  PAYMENT: "/api/payment",
};

const URI_ADMIN_SERVICE = {
  USERS: {
    GET_ALL: API_PREFIXES.ADMIN + "/users",
    GET_DETAIL: API_PREFIXES.ADMIN + "/users/:userId",
    BAN: API_PREFIXES.ADMIN + "/ban-user/:userId",
    UPDATE_ROLE: API_PREFIXES.ADMIN + "/users/:userId/role",
    CREATE: API_PREFIXES.ADMIN + "/create-user",
  },
  PACKAGES: {
    GET_ALL: API_PREFIXES.PAYMENT + "/packages",
    CREATE: API_PREFIXES.PAYMENT + "/packages",
  },
};

export const ADMIN_SERVICE_URI = {
  DOMAIN: DOMAIN,
  USERS: URI_ADMIN_SERVICE.USERS,

  // Get all packages
  PACKAGES: URI_ADMIN_SERVICE.PACKAGES,
};
