import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getArticles();
      setArticles(res);
    })();

    return () => {};
  }, []);

  return (
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
  );
};

export default ArticleList;
