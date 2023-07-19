import { useState, useEffect } from "react";
import styled from "styled-components";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Button from "./Button";
import { useParams } from "react-router-dom";

const StyledUL = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;
  width: 640px;
  padding: 0;
  margin-top: 2em;

  @media screen and (max-width: 640px) {
    width: 95%;
  }
`;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getArticles(topic, page);
    setArticles([...articles, ...res.articles]);
    setPage(page + 1);
    setTotalArticles(res.total_count);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StyledUL>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
        {isLoading ? (
          "Loading articles..."
        ) : articles.length < totalArticles ? (
          <Button onClick={fetchData}>Load more</Button>
        ) : (
          "No more articles"
        )}
      </StyledUL>
    </>
  );
};

export default ArticleList;
