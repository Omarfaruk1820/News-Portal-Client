import { Link } from "react-router-dom";
import { useNews } from "../queries/useNews";

export default function Home() {
  const { data, isPending, isError, error, refetch } = useNews(1);

  if (isPending) {
    return <p className="p-6">Loading latest news...</p>;
  }

  if (isError) {
    return (
      <div className="p-6">
        <p>News load করা যায়নি: {error.message}</p>
        <button className="btn btn-primary" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Latest News</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((news) => (
          <article key={news._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={news.thumbnail}
                alt={news.title}
                className="h-52 w-full object-cover"
                loading="lazy"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{news.title}</h2>
              <p>{news.summary}</p>

              <Link className="btn btn-primary mt-3" to={`/news/${news.slug}`}>
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
