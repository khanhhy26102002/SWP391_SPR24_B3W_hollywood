import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  export const getAllScreen = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/screening/listScreeningMovie`
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const deleteScreen = async (id, token) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/screening/delete/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const createScreen = async (movieName,roomNumber,createdBy,start_time,end_time,date, token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/screening/createScreening`,{
          movieName:movieName,
          roomNumber:roomNumber,
          createdBy:createdBy,
          start_time:start_time,
          end_time:end_time,
          date:date,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const updateScreen = async (screeningId,movieName,roomNumber,createdBy,start_time,end_time,date, token) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/screening/updateScreening/${screeningId}`,{
          screeningId:screeningId,
          movieName:movieName,
          roomNumber:roomNumber,
          createdBy:createdBy,
          start_time:start_time,
          end_time:end_time,
          date:date
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }