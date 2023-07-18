import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IconContext } from "react-icons";

const StyledDiv = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
`;

const StyledFaArrowUp = styled(FaArrowUp).attrs((props) => ({
  className: props.clicked ? "clicked" : "",
}))`
  cursor: pointer;
  &.clicked {
    color: #7a82e4;
  }
`;

const StyledFaArrowDown = styled(FaArrowDown).attrs((props) => ({
  className: props.clicked ? "clicked" : "",
}))`
  cursor: pointer;
  &.clicked {
    color: #7a82e4;
  }
`;

const ArticleVote = ({
  votes,
  handleUpVote,
  handleDownVote,
  upVoteClicked,
  downVoteClicked,
}) => {
  return (
    <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
      <StyledDiv>
        <StyledFaArrowUp onClick={handleUpVote} clicked={upVoteClicked} />{" "}
        {votes}{" "}
        <StyledFaArrowDown onClick={handleDownVote} clicked={downVoteClicked} />
      </StyledDiv>
    </IconContext.Provider>
  );
};

export default ArticleVote;
