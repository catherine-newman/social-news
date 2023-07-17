import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;
  justify-items: center;
`;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const fetchData = async () => {
    const res = await getArticles(page);
    setArticles([...articles, ...res.articles]);
    setPage(page + 1);
    setTotalArticles(res.total_count);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={articles.length < totalArticles ? true : false}
      loader={<p>Loading...</p>}
      endMessage={<p>No more articles</p>}
    >
      <StyledUL>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </StyledUL>
    </InfiniteScroll>
  );
};

export default ArticleList;
