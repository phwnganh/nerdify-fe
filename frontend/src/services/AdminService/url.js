// Initial Path src/services/LearnerService/url.js

import { BASE_SERVER } from "../../constants/common.constant";

const DOMAIN = BASE_SERVER;
const API_PREFIXES = {
  ADMIN: "/api/auth/admin",
};

const URI_ADMIN_SERVICE = {
  USERS: {
    GET_ALL: API_PREFIXES.ADMIN + "/users",
    GET_DETAIL: API_PREFIXES.ADMIN + "/users/:userId",
    BAN: API_PREFIXES.ADMIN + "/users/:userId/ban",
    UPDATE_ROLE: API_PREFIXES.ADMIN + "/users/:userId/role",
  },
};

export const ADMIN_SERVICE_URI = {
  DOMAIN: DOMAIN,
  USERS: URI_ADMIN_SERVICE.USERS,
};
