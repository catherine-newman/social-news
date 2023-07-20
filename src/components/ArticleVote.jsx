import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IconContext } from "react-icons";

const StyledDiv = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  margin: 0.5em 0;
  font-size: 1.3em;
`;

const StyledFaArrowUp = styled(FaArrowUp)`
  cursor: pointer;
  color: ${(props) => (props.$clicked ? "#7a82e4" : "black")};
  will-change: transform;
  transition:
    transform 350ms ease,
    color 350ms ease;

  &:hover {
    transform: scale(1.3) translateY(-5px);
    color: #7a82e4;
    transition:
      transform 150ms ease,
      color 150ms ease;
  }
`;

const StyledFaArrowDown = styled(FaArrowDown)`
  cursor: pointer;
  color: ${(props) => (props.$clicked ? "#7a82e4" : "black")};
  will-change: transform;
  transition:
    transform 350ms ease,
    color 350ms ease;

  &:hover {
    transform: scale(1.3) translateY(5px);
    color: #7a82e4;
    transition:
      transform 150ms ease,
      color 150ms ease;
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
