import FullArticle from "./FullArticle";
import CommentList from "./CommentList";
import styled from "styled-components";
import { useState } from "react";
import StyledMain from "./StyledMain";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  justify-items: center;
  width: 640px;
  padding: 2em;
  background-color: #ffffff;
  margin-top: 2em;
  border-radius: 1em;

  @media screen and (max-width: 640px) {
    width: 95%;
  }
`;

const Article = () => {
  const [commentSubmit, setCommentSubmit] = useState(false);
  return (
    <StyledMain>
      <Container>
        <FullArticle setCommentSubmit={setCommentSubmit} />
        <CommentList
          commentSubmit={commentSubmit}
          setCommentSubmit={setCommentSubmit}
        />
      </Container>
    </StyledMain>
  );
};

export default Article;
