import styled from "styled-components";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

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
  background-color: ${(props) => (props.$toggle ? "#27358a" : "#4d5bb8")};
  border: none;
  color: white;
  padding: 0.5em 1em 0.5em 1em;
  cursor: pointer;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
`;

const StyledButtonDate = styled(StyledButton)`
  border-radius: 1em 0 0 1em;
  border-right: white solid 1px;
`;

const StyledButtonVotes = styled(StyledButton)`
  border-radius: 0 1em 1em 0;
  border-left: white solid 1px;
`;

const ArticleSort = ({ setSortBy, setOrder, sortBy, order }) => {
  const [dateToggle, setDateToggle] = useState(true);
  const [commentsToggle, setCommentsToggle] = useState(false);
  const [votesToggle, setVotesToggle] = useState(false);

  const handleClickDate = () => {
    if (sortBy === "created_at") {
      if (order === "desc") setOrder("asc");
      else setOrder("desc");
    } else {
      setDateToggle(true);
      setCommentsToggle(false);
      setVotesToggle(false);
      setSortBy("created_at");
      setOrder("desc");
    }
  };

  const handleClickComments = () => {
    if (sortBy === "comment_count") {
      if (order === "desc") setOrder("asc");
      else setOrder("desc");
    } else {
      setDateToggle(false);
      setCommentsToggle(true);
      setVotesToggle(false);
      setSortBy("comment_count");
      setOrder("desc");
    }
  };

  const handleClickVotes = () => {
    if (sortBy === "votes") {
      if (order === "desc") setOrder("asc");
      else setOrder("desc");
    } else {
      setDateToggle(false);
      setCommentsToggle(false);
      setVotesToggle(true);
      setSortBy("votes");
      setOrder("desc");
    }
  };

  return (
    <StyledDiv>
      <StyledButtonDate onClick={handleClickDate} $toggle={dateToggle}>
        Date{" "}
        {dateToggle ? (
          order === "desc" ? (
            <span>
              <FaSortAmountDown />
            </span>
          ) : (
            <FaSortAmountUp />
          )
        ) : (
          ""
        )}
      </StyledButtonDate>
      <StyledButton onClick={handleClickComments} $toggle={commentsToggle}>
        Comments{" "}
        {commentsToggle ? (
          order === "desc" ? (
            <span>
              <FaSortAmountDown />
            </span>
          ) : (
            <FaSortAmountUp />
          )
        ) : (
          ""
        )}
      </StyledButton>
      <StyledButtonVotes onClick={handleClickVotes} $toggle={votesToggle}>
        Votes{" "}
        {votesToggle ? (
          order === "desc" ? (
            <span>
              <FaSortAmountDown />
            </span>
          ) : (
            <FaSortAmountUp />
          )
        ) : (
          ""
        )}
      </StyledButtonVotes>
    </StyledDiv>
  );
};

export default ArticleSort;

//background-color: #27358a;
