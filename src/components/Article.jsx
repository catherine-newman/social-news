import FullArticle from "./FullArticle";
import CommentList from "./CommentList";
import styled from "styled-components";
import { useState } from "react";
import StyledMain from "./StyledMain";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  justify-items: center;
  width: 640px;
  padding: 2rem 2rem 0 2em;
  background-color: #ffffff;
  margin-top: 2em;
  border-radius: 1em;
  margin-bottom: 2em;

  @media screen and (max-width: 640px) {
    width: 95%;
  }
`;

const Article = () => {
  const { article_id } = useParams();
  const [error, setError] = useState(null);
  const [commentSubmit, setCommentSubmit] = useState(false);
  if (error) return <ErrorPage status={error.response.status} />;
  return (
    <StyledMain>
      <Container>
        <FullArticle
          setCommentSubmit={setCommentSubmit}
          article_id={article_id}
          setArticleError={setError}
        />
        <CommentList
          commentSubmit={commentSubmit}
          setCommentSubmit={setCommentSubmit}
          article_id={article_id}
        />
      </Container>
    </StyledMain>
  );
};

export default Article;
