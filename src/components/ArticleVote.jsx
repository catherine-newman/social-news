import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IconContext } from "react-icons";

const StyledDiv = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
`;

const ArticleVote = () => {
  return (
    <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
      <StyledDiv>
        <FaArrowUp /> Test <FaArrowDown />
      </StyledDiv>
    </IconContext.Provider>
  );
};

export default ArticleVote;
