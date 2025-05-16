import axios from "axios";

export async function createBookingAPI(bookingData: {
  eventId: string;
  userId: string;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/bookings/book`,
      bookingData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error during booking creation:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Booking failed";
      console.log("Error message:", errorMessage);
    } else {
      console.log("Unexpected error:", error);
    }
  }
}

export async function getUserBookingsAPI(userId: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/bookings/user/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch bookings";
      console.log("Error message:", errorMessage);
    } else {
      console.log("Unexpected error:", error);
    }
  }
}
