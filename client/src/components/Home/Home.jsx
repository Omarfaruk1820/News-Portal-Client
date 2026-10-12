import { useQuery } from "@tanstack/react-query";
import Hero from "../Home/Hero";
import api from "../services/api";

const Home = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["home-featured-news"],
    queryFn: async () => {
      const response = await api.get("/news/featured");
      return response.data;
    },
  });

  return (
    <main>
      <Hero
        featuredNews={data?.featuredNews ?? null}
        sideNews={data?.sideNews ?? []}
        loading={isPending}
        error={isError ? error : null}
        onRetry={refetch}
      />

      {/* LatestNews, CategoryNews, TrendingNews */}
    </main>
  );
};

export default Home;
