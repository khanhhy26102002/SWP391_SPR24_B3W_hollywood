import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  export const fetchComboData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/combo/listCombo`
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const createCombo = async (comboName,description, comboPrice, token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/combo/createCombo`,{
            comboName:comboName,
            description: description,
            comboPrice: comboPrice
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
      const response = await axios.delete(
        `${baseUrl}/api/combo/delete/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
    });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

export const updateCombo = async (id, comboName,description, comboPrice, token) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/combo/updateCombo/${id}`,{
            comboId:id,
            comboName:comboName,
            description: description,
            comboPrice: comboPrice
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