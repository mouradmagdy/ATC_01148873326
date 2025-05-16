import { getAllEventsAPI } from "@/apis/events-api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllEvents(pageNumber: number, pageSize: number) {
  const { isPending, data } = useQuery({
    queryKey: ["events", pageNumber, pageSize],
    queryFn: () => getAllEventsAPI(pageNumber, pageSize),
  });
  return { isPending, data };
}
