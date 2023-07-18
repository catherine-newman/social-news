import FullArticle from "./FullArticle";
import CommentList from "./CommentList";
import styled from "styled-components";
import { useState } from "react";

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
`;

const Article = () => {
  const [commentSubmit, setCommentSubmit] = useState(false);
  return (
    <Container>
      <FullArticle setCommentSubmit={setCommentSubmit} />
      <CommentList
        commentSubmit={commentSubmit}
        setCommentSubmit={setCommentSubmit}
      />
    </Container>
  );
};

export default Article;
