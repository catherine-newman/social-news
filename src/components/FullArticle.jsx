import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";
import ArticleVote from "./ArticleVote";

const ArticleCard = styled.div`
  background-color: #ffffff;

  img {
    border-radius: 1em;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FullArticle = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getArticle(article_id);
      setArticle(res);
      setIsLoading(false);
    })();
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ArticleCard>
      <ArticleHeader>
        <div>
          {article.author} {formatDate(article.created_at)}
        </div>
        <div>{article.topic}</div>
      </ArticleHeader>
      <article>
        <h1>{article.title}</h1>
        <img src={article.article_img_url} />
        <p>{article.body}</p>
      </article>
      <ArticleFooter>
        <ArticleVote />
        <div>{article.comment_count}</div>
      </ArticleFooter>
    </ArticleCard>
  );
};

export default FullArticle;
