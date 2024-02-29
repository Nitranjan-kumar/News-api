import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";

const Newsboard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=In&category=${category}&apiKey=4b33efa88c4b4ac2bd180a17f8dfdcee`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setArticles(data.articles);
        } else {
          setError(data.message || "Failed to fetch data");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-center">
        Latest<span className="badge bg-danger m-1">News</span>
      </h2>

      {articles.map(({ title, description, urlToImage, url }, index) => (
        <Newsitem
          key={index}
          title={title}
          description={description}
          src={urlToImage}
          url={url}
        />
      ))}
    </div>
  );
};

export default Newsboard;
