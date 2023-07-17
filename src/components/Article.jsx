import FullArticle from "./FullArticle";
import CommentList from "./CommentList";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;
  justify-items: center;
  width: 640px;
  padding: 2em;
  background-color: #ffffff;
  margin-top: 1.5em;
  border-radius: 1em;
`;

const Article = () => {
  return (
    <Container>
      <FullArticle />
      <Button>Add Comment</Button>
      <CommentList />
    </Container>
  );
};

export default Article;