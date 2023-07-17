import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const fetchData = async () => {
    setIsLoading(true);
    const res = await getArticles(page);
    setArticles([...articles, ...res.articles]);
    setPage(page + 1);
    setTotalArticles(res.total_count);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   if (isLoading) return <p>Loading...</p>;

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={articles.length < totalArticles ? true : false}
      loader={<p>Loading...</p>}
      endMessage={<p>No more articles</p>}
    >
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Link to={`/${article.topic}/${article.article_id}`}>
                <ArticleCard article={article} />
              </Link>
            </li>
          );
        })}
      </ul>
    </InfiniteScroll>
  );
};

export default ArticleList;
