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
      const response = await axios.post(
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

  export const addMovie = async (name, description, duration, director,actor,genre, premiere, language, rated,trailer,token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/movie/createMovie`,{
        name:name,
         description:description,
         duration:duration,
         director:director,
         actor:actor,
         genre:genre,
         language:language,
         trailer:trailer,
         premiere:premiere,
         rated:rated
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
});
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  } 

  export const updateMovie = async (id,name, description, duration, director,actor,genre, premiere, language, rated,trailer,token) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/movie/updateMovie/${id}`,{
        name:name,
         description:description,
         duration:duration,
         director:director,
         actor:actor,
         genre:genre,
         premiere:premiere,
         language:language,
         rated:rated,
         trailer:trailer
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
});
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  }