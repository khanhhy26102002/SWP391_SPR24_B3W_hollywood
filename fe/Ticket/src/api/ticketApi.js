import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  export const createBooking = async ( date, time, seats, combo, token) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/ticket/createBooking`,{
          screeningDate: date,
          screeningTime: time,
          seatNumbers: seats,
          comboQuantities: combo
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
  };

  export const fetchTicketData = async (token) =>{
    try {
      const response = await axios.get(
        `${baseUrl}/api/ticket/listTicket`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
      );
      if (response.status === 200) return response.data;
    } catch (error) {
      throw new CustomError(error.response.status, error.response.data.errors);
    }
  };