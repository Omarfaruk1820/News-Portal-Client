import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useNews(page = 1, category = "") {
  return useQuery({
    queryKey: ["news", page, category],
    queryFn: async () => {
      const { data } = await api.get("/news", {
        params: { page, limit: 10, category: category || undefined },
      });

      return data;
    },
    staleTime: 60_000,
  });
}
