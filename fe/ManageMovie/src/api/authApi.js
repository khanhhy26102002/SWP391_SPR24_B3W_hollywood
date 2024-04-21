import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  const setJwtCookie = (jwt) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000);
  
    Cookies.set("jwtToken", jwt, { expires: expirationDate });
  };
  
  const setJwtSession = (jwt) => {
    sessionStorage.setItem("jwt", jwt);
  };

  const removeJwtSession = () => {
    sessionStorage.removeItem("jwt");
  };

  const removeJwtCookie = () => {
    if (Cookies.get("jwtToken")) Cookies.remove("jwtToken");
  };
  
  const handleLoginSuccess = (response) => {
    const jwt = response.data.token;
    setJwtSession(jwt);
    setJwtCookie(jwt);
  };
  const clearSessionData = () => {
    removeJwtSession();
    removeJwtCookie();
  };

export const userLogin = async (email,password) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/login?loginValue=${email}&password=${password}`
      );
      if (response.status === 200) {
        console.log("login success");
        handleLoginSuccess(response.data);
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const userLogout = async (token) =>{
    try {
      const response = await axios.get(
        `${baseUrl}/api/auth/logout`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
    });
      if (response.status === 200) {
        clearSessionData();
        console.log("logout success");
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }