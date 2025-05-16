import { createEventAPI } from "@/apis/events-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEventAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
