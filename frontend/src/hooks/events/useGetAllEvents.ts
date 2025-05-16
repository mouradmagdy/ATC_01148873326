import { getAllEventsAPI } from "@/apis/events-api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllEvents() {
  const { isPending, data } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEventsAPI,
  });
  return { isPending, data };
}
