import axios from "axios";

export const apiAxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000,
  withCredentials: true,
  headers: {'Access-Control-Allow-Origin': true}
});
