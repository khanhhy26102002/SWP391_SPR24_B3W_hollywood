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

export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/movie/delete/${id}`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
}
export const addMovie = async (name, description, duration, director, actor, genre, premiere, language, rated, trailer, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/movie/createMovie`, {
      name: name,
      description: description,
      duration: duration,
      director: director,
      actor: actor,
      genre: genre,
      premiere: premiere,
      language: language,
      rated: rated,
      trailer: trailer
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (response.status === 200) return response.data;
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
}
export const fetchTicketData = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/ticket/listTicket`,
      {
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