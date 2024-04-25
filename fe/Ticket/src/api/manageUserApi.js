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

  export const deleteUser = async (id, token) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/user/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const updateUser = async (id,avt, name,mail,address,gender, birthdate, phone, token) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/user/update/${id}`,{
        id: 0,
        avatar: avt,
        userName: name,
        email: mail,
        address: address,
        gender: gender,
        birthdate: birthdate,
        phone: phone,
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const getUserProfile = async (id, token) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/getUserProfile/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };