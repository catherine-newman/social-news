import FullArticle from "./FullArticle";
import CommentList from "./CommentList";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;
  justify-items: center;
  background-color: yellow;

  //   @media screen and (min-width: 769px) {
  //     width: 80%;
  //   }

  //   @media screen and (min-width: 1025px) {
  //     width: 70%;
  //   }

  //   @media screen and (min-width: 1201px) {
  //     width: 60%;
  //   }
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
