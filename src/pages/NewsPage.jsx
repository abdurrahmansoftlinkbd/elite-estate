import { useQuery } from "@tanstack/react-query";
import NewsCard from "./home/NewsCard";
import Loading from "./Loading";

const NewsPage = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch("/news.json");
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="container w-11/12 mx-auto my-16">
      <div className="text-center mb-10">
        <p className="text-default text-sm font-medium mb-1">
          Check out recent
        </p>
        <h2 className="text-4xl font-semibold font-playfair">News & Updates</h2>
        <p className="text-sm text-gray-500 mt-2">
          From real estate industry and beyound.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} newsItem={newsItem}></NewsCard>
        ))}
      </div>
    </section>
  );
};

export default NewsPage;
