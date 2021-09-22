import axios from "axios";
import LoginHelper from "../pages/shared/LoginHelper";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});
api.interceptors.request.use(config => {
  const token = LoginHelper.getToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
