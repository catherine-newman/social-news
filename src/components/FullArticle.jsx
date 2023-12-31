import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { getArticle, patchArticle, deleteArticle, getUser } from "../api";
import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";
import ArticleVote from "./ArticleVote";
import { toast } from "react-toastify";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Button from "./Button";

const ArticleCard = styled.article`
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
`;

const TopicLink = styled(Link)`
  background: ${({ theme }) => theme.accent};
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.text};
  transition:
    color 450ms ease,
    background 450ms ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.text};
    transition:
      color 150ms ease,
      background 150ms ease;
  }
`;

const AuthorLink = styled(Link)`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorDiv = styled.div`
  display: flex;
  width: 3rem;
  height: 3rem;
`;

const AuthorImage = styled.span`
  background: center / contain no-repeat url(${(props) => props.$img});
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 2em;
`;

const ArticleFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondbuttoncolor};
  transition: background 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondbuttoncolortoggled};
    transition: background 150ms ease;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.secondbuttoncolordisabled};
  }
`;

const FullArticle = ({ setCommentSubmit, article_id, setError }) => {
  const [article, setArticle] = useState({});
  const [authorImg, setAuthorImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [voteCount, setVoteCount] = useState(0);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [downVoteClicked, setDownVoteClicked] = useState(false);
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRes = await getArticle(article_id);
        setArticle(articleRes);
        setVoteCount(articleRes.votes);
        setIsLoading(false);

        const authorRes = await getUser(articleRes.author);
        setAuthorImg(authorRes.avatar_url);
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

  const handleDelete = () => {
    setIsDeleting(true);
  };

  useEffect(() => {
    const removeArticle = async () => {
      try {
        await deleteArticle(article_id);
        toast.success("Article deleted!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        toast.error("Oops! Something went wrong...");
        setIsDeleting(false);
      }
    };
    if (isDeleting) {
      toast.promise(removeArticle(), {
        pending: "Deleting article...",
      });
    }
  }, [isDeleting, article_id, navigate]);

  if (isLoading) return <Loading>Loading article...</Loading>;

  return (
    <>
      <ArticleCard>
        <img src={article.article_img_url} alt={article.title} />
        <ArticleHeader>
          {formatDate(article.created_at)}
          <h1>{article.title}</h1>
          <ArticleDetails>
            <div>
              <AuthorLink to={`/authors/${article.author}`}>
                <AuthorDiv>
                  <AuthorImage $img={authorImg}></AuthorImage>
                </AuthorDiv>
                by {article.author}
              </AuthorLink>
            </div>
            <TopicLink to={`/topics/${article.topic}`}>
              # {article.topic}
            </TopicLink>
          </ArticleDetails>
          <p>{article.body}</p>
        </ArticleHeader>
        <ArticleFooter>
          {article.author === user.username && (
            <StyledButton onClick={handleDelete} disabled={isDeleting}>
              Delete article
            </StyledButton>
          )}
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
