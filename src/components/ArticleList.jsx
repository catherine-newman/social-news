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
  grid-template-columns: 1fr;
  gap: 1em;
  width: 640px;
  padding: 0;
  margin-top: 1em;

  @media screen and (max-width: 640px) {
    width: 95%;
  }
`;

const LoadMoreButton = styled(Button)`
  margin-bottom: 2em;
`;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  // const [sortBy, setSortBy] = useState("created_at");
  // const [order, setOrder] = useState("desc");
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getArticles(topic, 1, sortBy, order);
      setArticles(res.articles);
      setPage(1);
      setTotalArticles(res.total_count);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [topic, sortBy, order]);

  const fetchMoreData = async () => {
    try {
      setIsLoading(true);
      const res = await getArticles(topic, page + 1, sortBy, order);
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
      <ArticleSort
        // setSortBy={setSortBy}
        // setOrder={setOrder}
        sortBy={sortBy}
        order={order}
        searchParams={searchParams}
      />
      <StyledUL>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
        {isLoading ? (
          <Loading>Loading articles...</Loading>
        ) : articles.length < totalArticles ? (
          <LoadMoreButton onClick={fetchMoreData}>Load more</LoadMoreButton>
        ) : (
          <Loading>No more articles</Loading>
        )}
      </StyledUL>
    </StyledMain>
  );
};

export default ArticleList;
