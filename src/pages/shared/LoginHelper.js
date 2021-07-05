/* eslint-disable */
class LoginHelper {
  static mStAuth;

  static getToken() {
    return localStorage.getItem("token");
  }

  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static checkTokenValid(response) {
    if (!response || !response.status) {
      return response.msg !== "로그인 세션이 만료 되었거나, 로그인 정보가 없습니다";
    }
    return true;
  }

  static isLoggedIn() {
    return LoginHelper.getToken() !== null;
  }

  static checkLogout(data) {
    if (!LoginHelper.checkTokenValid(data)) {
      localStorage.removeItem("token");
      window.location.reload();
      return true;
    }
    return false;
  }

  static deleteToken() {
    localStorage.removeItem("token");
  }

  static logoutByExpireToken() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}

export default LoginHelper;
