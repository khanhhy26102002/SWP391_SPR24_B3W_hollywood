import axios from 'axios'
import React from 'react'
const baseUrl = 'http://localhost:8080'
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
export const fetchImage = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Image/listImageMovie`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
}
export const deleteImage = async (imageId, token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/Image/delete/${imageId}`, {
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
export const AddImage = async (movieId, imageName, path, token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/Image/createImage`, {
      movieId: movieId,
      imageName: imageName,
      path: path
    }, {
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
};
export const updateImage = async (id,movieId, imageName, path, token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/Image/updateImage/${id}`, {
      movieId: movieId,
      imageName: imageName,
      path: path,
    }, {
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