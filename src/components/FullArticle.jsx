import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticle, patchArticle } from "../api";
import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";
import ArticleVote from "./ArticleVote";
import { toast } from "react-toastify";
import AddComment from "./AddComment";

const ArticleCard = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1em;
  img {
    border-radius: 1em;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleBody = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1em;

  h1 {
    text-align: center;
  }
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FullArticle = ({ setCommentSubmit }) => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [voteCount, setVoteCount] = useState(0);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [downVoteClicked, setDownVoteClicked] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getArticle(article_id);
      setArticle(res);
      setVoteCount(res.votes);
      setIsLoading(false);
    })();
  }, [article_id]);

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

  if (isLoading) return <p>Loading article...</p>;

  return (
    <>
      <ArticleCard>
        <ArticleHeader>
          <div>
            {article.author} {formatDate(article.created_at)}
          </div>
          <div>
            <Link to={`/${article.topic}`}>{article.topic}</Link>
          </div>
        </ArticleHeader>
        <ArticleBody>
          <h1>{article.title}</h1>
          <img src={article.article_img_url} />
          <p>{article.body}</p>
        </ArticleBody>
        <ArticleFooter>
          <ArticleVote
            votes={voteCount}
            handleUpVote={handleUpVote}
            handleDownVote={handleDownVote}
            upVoteClicked={upVoteClicked}
            downVoteClicked={downVoteClicked}
          />
          <div>{article.comment_count} Comments</div>
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
