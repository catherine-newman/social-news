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
  max-width: 920px;
  width: 100%;
  padding: 0rem 2rem 0 2em;
  margin-top: 2em;
  margin-bottom: 2em;

  @media screen and (max-width: 400px) {
    padding: 0rem 1rem 0 1em;
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
