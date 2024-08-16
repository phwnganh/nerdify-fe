import axios from "axios";
import { SERVER_URI } from "../constants";

const client = axios.create({
  baseURL: SERVER_URI.DOMAIN,
  withCredentials: true,
  timeout: 10000,
  timeoutErrorMessage: "The connection has timed out",
});

client.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
