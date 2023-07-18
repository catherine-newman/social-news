import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IconContext } from "react-icons";

const StyledDiv = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
`;

const StyledFaArrowUp = styled(FaArrowUp)`
  cursor: pointer;
  color: ${(props) => (props.$clicked ? "#7a82e4" : "black")};
`;

const StyledFaArrowDown = styled(FaArrowDown)`
  cursor: pointer;
  color: ${(props) => (props.$clicked ? "#7a82e4" : "black")};
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
        <StyledFaArrowUp onClick={handleUpVote} $clicked={+upVoteClicked} />{" "}
        {votes}{" "}
        <StyledFaArrowDown
          onClick={handleDownVote}
          $clicked={+downVoteClicked}
        />
      </StyledDiv>
    </IconContext.Provider>
  );
};

export default ArticleVote;
