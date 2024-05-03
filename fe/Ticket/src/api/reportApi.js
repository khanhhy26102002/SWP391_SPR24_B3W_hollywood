import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

export const fetchReport = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/api/dashboard/getReport`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };
  export const fetchgetTopMovies = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/api/dashboard/getTopMovies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw CustomError(error.response.status, error.response.data.errors);
    }
  }

  export const fetchWeekly = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/api/dashboard/getWeeklyMovieStats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }
  export const fetchDay = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/api/dashboard/getMonthlyRevenue`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }