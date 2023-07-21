import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticle, patchArticle } from "../api";
import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";
import ArticleVote from "./ArticleVote";
import { toast } from "react-toastify";
import AddComment from "./AddComment";
import Loading from "./Loading";

const ArticleCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  @media (max-width: 650px) {
    padding: 1rem 1rem;
    h1 {
      font-size: 1.3rem;
    }
  }
`;

const ArticleDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  align-items: center;
  border-bottom: ${({ theme }) => theme.cardborder} solid 2px;
  margin-bottom: 2rem;
  a {
    background: ${({ theme }) => theme.accent};
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 1rem;
    color: ${({ theme }) => theme.text};
  }
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FullArticle = ({ setCommentSubmit, article_id, setError }) => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [voteCount, setVoteCount] = useState(0);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [downVoteClicked, setDownVoteClicked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getArticle(article_id);
        setArticle(res);
        setVoteCount(res.votes);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchArticle();
  }, [article_id, setError]);

  const upVote = async (vote) => {
    try {
      const res = await patchArticle(article_id, vote);
      setVoteCount(res.votes);
    } catch (err) {
      toast.error("Oops! Something went wrong...");
      setVoteCount(voteCount);
      setUpVoteClicked(false);
      if (vote === 2) {
        setDownVoteClicked(true);
      }
    }
  };

  const downVote = async (vote) => {
    try {
      const res = await patchArticle(article_id, vote);
      setVoteCount(res.votes);
    } catch (err) {
      toast.error("Oops! Something went wrong...");
      setVoteCount(voteCount);
      setDownVoteClicked(false);
      if (vote === -2) {
        setUpVoteClicked(true);
      }
    }
  };

  const handleUpVote = () => {
    if (upVoteClicked) {
      const newCount = voteCount - 1;
      setVoteCount(newCount);
      setUpVoteClicked(false);
      downVote(-1);
    } else {
      setUpVoteClicked(true);
      if (!downVoteClicked) {
        const newCount = voteCount + 1;
        setVoteCount(newCount);
        upVote(1);
      } else {
        const newCount = voteCount + 2;
        setVoteCount(newCount);
        setDownVoteClicked(false);
        upVote(2);
      }
    }
  };

  const handleDownVote = () => {
    if (downVoteClicked) {
      const newCount = voteCount + 1;
      setVoteCount(newCount);
      setDownVoteClicked(false);
      upVote(1);
    } else {
      setDownVoteClicked(true);
      if (!upVoteClicked) {
        const newCount = voteCount - 1;
        setVoteCount(newCount);
        downVote(-1);
      } else {
        const newCount = voteCount - 2;
        setVoteCount(newCount);
        setUpVoteClicked(false);
        downVote(-2);
      }
    }
  };

  if (isLoading) return <Loading>Loading article...</Loading>;

  return (
    <>
      <ArticleCard>
        <img src={article.article_img_url} />
        <ArticleHeader>
          {formatDate(article.created_at)}
          <h1>{article.title}</h1>
          <ArticleDetails>
            by {article.author}
            <Link to={`/topics/${article.topic}`}># {article.topic}</Link>
          </ArticleDetails>
          <p>{article.body}</p>
        </ArticleHeader>
        <ArticleFooter>
          <ArticleVote
            votes={voteCount}
            handleUpVote={handleUpVote}
            handleDownVote={handleDownVote}
            upVoteClicked={upVoteClicked}
            downVoteClicked={downVoteClicked}
          />
        </ArticleFooter>
      </ArticleCard>
      <AddComment
        article_id={article.article_id}
        setCommentSubmit={setCommentSubmit}
      />
    </>
  );
};

export default FullArticle;
