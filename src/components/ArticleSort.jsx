import styled from "styled-components";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 640px;
  padding: 0;
  margin-top: 2em;

  @media screen and (max-width: 640px) {
    width: 95%;
  }
`;

const StyledButton = styled.button`
  background-color: #4d5bb8;
  border: none;
  color: white;
  padding: 0.5em 1em 0.5em 1em;
  cursor: pointer;
`;

const StyledButtonDate = styled(StyledButton)`
  border-radius: 1em 0 0 1em;
  border-right: white solid 1px;
  background-color: #27358a;
`;

const StyledButtonVotes = styled(StyledButton)`
  border-radius: 0 1em 1em 0;
  border-left: white solid 1px;
`;

const ArticleSort = () => {
  return (
    <StyledDiv>
      <StyledButtonDate>Date</StyledButtonDate>
      <StyledButton>Comments</StyledButton>
      <StyledButtonVotes>Votes</StyledButtonVotes>
    </StyledDiv>
  );
};

export default ArticleSort;
