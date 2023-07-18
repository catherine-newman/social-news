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
  const [comments, setComments] = useState([]);
  return (
    <Container>
      <FullArticle comments={comments} setComments={setComments} />
      <CommentList comments={comments} setComments={setComments} />
    </Container>
  );
};

export default Article;
