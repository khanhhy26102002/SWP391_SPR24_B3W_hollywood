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
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/forgotPassword?email=${email}`
    );
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const resetPassword = async (token, newPassword, confirm) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/resetPassword`,{
          token: token,
          newPassword: newPassword,
          confirmPassword: confirm,
        }
    );
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const changePassword = async (oldPass, newPass, token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/changePassword`,{
          oldPassword: oldPass,
          newPassword: newPass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
    }
    );
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const register = async (userName, email, address, gender, birthdate,phone, password) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/register`,{
            userName: userName,
            email: email,
            address: address,
            gender: gender,
            birthdate: birthdate,
            phone: phone,
            password: password
        }
    );
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }