/* eslint-disable */
import axios from "axios";

import LoginHelper from "../pages/shared/LoginHelper";
import { ReleaseMode } from "./ReleaseMode";

class APIHelper {
  static RELEASE_MODE: ReleaseMode = ReleaseMode.PRODUCTION;

  static getBaseURL() {
    switch (this.RELEASE_MODE) {
      case ReleaseMode.LOCAL_DEV:
      case ReleaseMode.OMG_DEV:
        return "http://omg-dev-api.roadvoy.net";
      default:
        return "http://api-roadvoy.net";
    }
  }

  static getInstance() {
    const instance = axios.create({
      baseURL: this.getBaseURL()
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
