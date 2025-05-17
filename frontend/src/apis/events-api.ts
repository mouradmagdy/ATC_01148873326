import axios from "axios";
import toast from "react-hot-toast";

export const getAllEventsAPI = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/events/getAllEvents`,
      {
        withCredentials: true,
        params: {
          pageNumber,
          pageSize,
        },
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
      `${import.meta.env.VITE_API_URL}/api/events/getEventById/${id}`,
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
      `${import.meta.env.VITE_API_URL}/api/events/create`,
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
      `${import.meta.env.VITE_API_URL}/api/events/deleteEvent/${id}`,
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
