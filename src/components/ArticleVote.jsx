import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IconContext } from "react-icons";

const StyledDiv = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 1.3em;
`;

const StyledArrowIcon = styled.div`
  cursor: pointer;
  color: ${(props) =>
    props.$clicked && props.$up
      ? "#90e079"
      : props.$clicked && !props.up
      ? "#f4826d"
      : ({ theme }) => theme.text};
  will-change: transform;
  transition:
    transform 350ms ease,
    color 350ms ease;

  &:hover {
    transform: scale(1.3) translateY(${(props) => (props.$up ? "-5px" : "5px")});
    color: ${(props) => (props.$up ? "#90e079" : "#f4826d")};
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
        <StyledArrowIcon
          onClick={handleUpVote}
          $clicked={upVoteClicked}
          $up="true"
        >
          <FaArrowUp />
        </StyledArrowIcon>{" "}
        {votes}{" "}
        <StyledArrowIcon onClick={handleDownVote} $clicked={downVoteClicked}>
          <FaArrowDown />
        </StyledArrowIcon>
      </StyledDiv>
    </IconContext.Provider>
  );
};

export default ArticleVote;
