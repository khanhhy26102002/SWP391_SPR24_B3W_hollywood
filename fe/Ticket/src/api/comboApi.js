import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  export const fetchComboData = async (token) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/combo/getComboList`, {
          headers: {
              Authorization: `Bearer ${token}`,
            },
      }
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const createCombo = async (comboName, description, token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/combo/createCombo`,{
            name:comboName,
            description: description
        },{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const deleteCombo = async (id, token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/combo/delete/${id}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
    });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

export const updateCombo = async (id, comboName,description, token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/combo/updateCombo/${id}`,{
            name:comboName,
            description: description
        },{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };