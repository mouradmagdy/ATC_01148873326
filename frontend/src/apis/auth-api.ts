import axios from "axios";
import toast from "react-hot-toast";

export const loginAPI = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};

export const signupAPI = async () => {};
