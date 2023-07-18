import FullArticle from "./FullArticle";
import CommentList from "./CommentList";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;
  justify-items: center;
  width: 640px;
  padding: 2em;
  background-color: #ffffff;
  margin-top: 2em;
  border-radius: 1em;
`;

const Article = () => {
  return (
    <Container>
      <FullArticle />
      <CommentList />
    </Container>
  );
};

export default Article;
