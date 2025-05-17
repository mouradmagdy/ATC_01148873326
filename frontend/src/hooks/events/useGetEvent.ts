import { getEventById } from "@/apis/events-api";
import { useQuery } from "@tanstack/react-query";

export function useGetEvent(id: string) {
  const { isPending, data } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });
  return { isPending, data };
}
