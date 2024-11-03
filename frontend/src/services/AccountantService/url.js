//Initial path : src/components/Table/TableTransaction.js

import { BASE_SERVER } from "../../constants/common.constant";

const DOMAIN = BASE_SERVER;
const API_PREFIXES = {
  ACCOUNTANT: "/api/payment/accountant",
};

const URI_ACCOUNTANT_SERVICE = {
  TRANSACTIONS: {
    GET_ALL: API_PREFIXES.ACCOUNTANT + "/transactions",
    UPDATE: API_PREFIXES.ACCOUNTANT + "/transactions/:transactionId",

    STATISTICS: API_PREFIXES.ACCOUNTANT + "/transactions/statistic",
  },
};

export const ACCOUNTANT_SERVICE_URI = {
  DOMAIN: DOMAIN,
  TRANSACTIONS: URI_ACCOUNTANT_SERVICE.TRANSACTIONS,
};
