//Initial path : src/services/AccountantService/url.js
import client from "../client";
import { ACCOUNTANT_SERVICE_URI } from "./url";

// Fetch all transactions
export const getAllTransactions = async () => {
  const res = await client.get(ACCOUNTANT_SERVICE_URI.TRANSACTIONS.GET_ALL);
  return res.data;
};

// Update transaction by ID
export const updateTransaction = async (transactionId, transactionData) => {
  const res = await client.put(ACCOUNTANT_SERVICE_URI.TRANSACTIONS.UPDATE.replace(":transactionId", transactionId), transactionData);
  return res.data;
};

// Fetch transaction statistics
export const getTransactionStatistics = async () => {
  const res = await client.get(ACCOUNTANT_SERVICE_URI.TRANSACTIONS.STATISTICS);
  return res.data;
};
