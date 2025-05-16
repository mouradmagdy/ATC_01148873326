import axios from "axios";
import toast from "react-hot-toast";

export async function createBookingAPI(bookingData: {
  eventId: string;
  userId: string;
}) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/bookings/book`,
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
