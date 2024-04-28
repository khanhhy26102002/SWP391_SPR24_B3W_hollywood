import axios from 'axios'
import React from 'react'
const baseURL = 'http://localhost:8080'
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
export const fetchRoom = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/Room/listRoomMovie`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const deleteRoom = async (id, token) => {
  try {
    const response = await axios.delete(`${baseURL}/api/Room/delete/${id}`,{
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

export const updateRoom = async (id, roomNumber, numberOfSeat, token) => {
  try {
    const response = await axios.put(`${baseURL}/api/Room/updateRoom/${id}`,{
      roomNumber: roomNumber,
      numberOfSeat:numberOfSeat
    },{
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

export const createRoom = async (roomNumber, numberOfSeat, token) => {
  try {
    const response = await axios.post(`${baseURL}/api/Room/createRoom`,{
      roomNumber: roomNumber,
      numberOfSeat:numberOfSeat
    },{
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
