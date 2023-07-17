import FullArticle from "./FullArticle";
import CommentList from "./CommentList";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;
  justify-items: center;
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
