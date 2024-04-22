import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

export const fetchMovieData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/movie/listMovie`
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };

  export const getMovieDetail = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/movie/detail/${id}`
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const deleteMovie = async (id, token) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/movie/delete/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
    });
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }