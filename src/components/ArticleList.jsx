import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Button from "./Button";
import { useParams, useLocation } from "react-router-dom";
import StyledMain from "./StyledMain";
import ArticleSort from "./ArticleSort";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

const StyledUL = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: masonry;
  gap: 1em;
  max-width: 100%;
  padding: 0;
  margin-top: 1em;
  width: 95%;
  justify-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const LoadMoreButton = styled(Button)`
  margin-bottom: 2em;
  grid-column: 1 / -1;
`;

const StyledLoading = styled(Loading)`
  margin-bottom: 2em;
  grid-column: 1 / -1;
`;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { topic, author } = useParams();
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getArticles(topic, author, 1, sortBy, order);
      setArticles(res.articles);
      setPage(1);
      setTotalArticles(res.total_count);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [topic, sortBy, order, author]);

  const fetchMoreData = async () => {
    try {
      setIsLoading(true);
      const res = await getArticles(topic, author, page + 1, sortBy, order);
      setArticles([...articles, ...res.articles]);
      setPage(page + 1);
      setTotalArticles(res.total_count);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) return <ErrorPage status={error.response.status} />;

  return (
    <StyledMain>
      <ArticleSort sortBy={sortBy} order={order} searchParams={searchParams} />
      <StyledUL>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
        {isLoading ? (
          <StyledLoading>Loading articles...</StyledLoading>
        ) : articles.length < totalArticles ? (
          <LoadMoreButton onClick={fetchMoreData}>Load more</LoadMoreButton>
        ) : (
          <StyledLoading>No more articles</StyledLoading>
        )}
      </StyledUL>
    </StyledMain>
  );
};

export default ArticleList;
