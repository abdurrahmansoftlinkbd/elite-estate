import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("../news.json")
      .then((res) => res.json())
      .then((newsData) => setNews(newsData));
  }, []);

  return (
    <section className="font-inter">
      <div className="text-center mb-10">
        <p className="text-default text-sm font-medium mb-1">
          Check out recent
        </p>
        <h2 className="text-4xl font-semibold font-playfair">News & Updates</h2>
        <p className="text-sm text-gray-500 mt-2">
          From real estate industry and beyond.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 lg:gap-y-0 justify-items-center">
        {news
          .map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={newsItem}></NewsCard>
          ))
          .slice(0, 3)}
      </div>
    </section>
  );
};

export default News;
