import axios from "axios";

import LoginHelper from "../pages/shared/LoginHelper";

class APIHelper {
  static getInstance() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_HOST,
    });
    instance.interceptors.request.use(config => {
      const token = LoginHelper.getToken();
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });

    return instance;
  }
}

export default APIHelper;
