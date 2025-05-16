import axios from "axios";
import toast from "react-hot-toast";
export const getAllEventsAPI = async (filters = {}) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/events/getAllEvents",
      {
        // params: filters,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch events";
    toast.error(errorMessage);
    throw error;
  }
};

export const getEventById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/events/getEventById/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch events";
    toast.error(errorMessage);
    throw error;
  }
};

export const createEventAPI = async (eventData) => {
  try {
    console.log("Event data:", eventData);
    const response = await axios.post(
      "http://localhost:5000/api/events/create",
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to create event";
    toast.error(errorMessage);
    throw error;
  }
};

export const deleteEventAPI = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/events/deleteEvent/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete event";
    toast.error(errorMessage);
    throw error;
  }
};
