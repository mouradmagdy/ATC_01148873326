import { deleteEventAPI } from "@/apis/events-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteEvents() {
  const queryClient = useQueryClient();
  const { mutate: deleteEventMutation, isPending: deletingEvent } = useMutation(
    {
      mutationFn: deleteEventAPI,
      onSuccess: () => {
        toast.success("Event deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
      onError: () => {
        toast.error("Event could not be deleted");
      },
    }
  );
  return { deleteEventMutation, deletingEvent };
}
