import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, patchArticle } from "../api";
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
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await getArticle(article_id);
      setArticle(res);
      setVoteCount(res.votes);
      setIsLoading(false);
    })();
  }, [article_id]);

  const handleUpVote = () => {
    const newCount = voteCount + 1;
    setVoteCount(newCount);
    (async () => {
      const res = await patchArticle(article_id, 1);
      setArticle(res);
      setVoteCount(res.votes);
    })();
  };

  const handleDownVote = () => {
    const newCount = voteCount - 1;
    setVoteCount(newCount);
    (async () => {
      const res = await patchArticle(article_id, -1);
      setArticle(res);
      setVoteCount(res.votes);
    })();
  };

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
        <ArticleVote
          votes={voteCount}
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
        />
        <div>{article.comment_count}</div>
      </ArticleFooter>
    </ArticleCard>
  );
};

export default FullArticle;
