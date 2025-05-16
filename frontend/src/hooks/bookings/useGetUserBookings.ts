import { getUserBookingsAPI } from "@/apis/booking-api";
import { useQuery } from "@tanstack/react-query";

export function useGetUserBookings(userId: string) {
  const { isPending, data } = useQuery({
    queryKey: ["bookings", userId],
    queryFn: () => getUserBookingsAPI(userId),
    enabled: !!userId && userId.trim().length > 0,
  });
  return { isPending, data };
}
