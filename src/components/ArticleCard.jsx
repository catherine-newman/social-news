import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";
import { patchArticle } from "../api";
import { toast } from "react-toastify";
import ArticleVote from "./ArticleVote";
import { useState } from "react";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1em;
  padding: 2em;
  a {
    color: black;
    text-decoration: none;
  }
  img {
    border-radius: 1em;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ArticleCard = ({ article }) => {
  const [voteCount, setVoteCount] = useState(article.votes);

  const handleUpVote = () => {
    const newCount = voteCount + 1;
    setVoteCount(newCount);
    (async () => {
      try {
        const res = await patchArticle(article.article_id, 1);
        setVoteCount(res.votes);
      } catch (err) {
        toast.error("Oops! Something went wrong...");
        setVoteCount(voteCount);
      }
    })();
  };

  const handleDownVote = () => {
    const newCount = voteCount - 1;
    setVoteCount(newCount);
    (async () => {
      try {
        const res = await patchArticle(article.article_id, -1);
        setVoteCount(res.votes);
      } catch (err) {
        toast.error("Oops! Something went wrong...");
        setVoteCount(voteCount);
      }
    })();
  };

  return (
    <Card>
      <CardHeader>
        <div>
          {article.author} {formatDate(article.created_at)}
        </div>
        <div>{article.topic}</div>
      </CardHeader>
      <div>
        <Link to={`/${article.topic}/${article.article_id}`}>
          <h2>{article.title}</h2>
          <div>
            <img src={article.article_img_url} />
          </div>
        </Link>
      </div>
      <CardFooter>
        <ArticleVote
          votes={voteCount}
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
        />
        <div>{article.comment_count}</div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
