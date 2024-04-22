import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  export const getListUsers = async (token) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/listUsers`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const deleteUser = async (token) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/listUsers`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

