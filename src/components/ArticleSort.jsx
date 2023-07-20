import styled from "styled-components";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  padding: 0.5rem 1rem 0.5rem 1em;
  cursor: pointer;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
`;

const StyledButtonDate = styled(StyledButton)`
  border-radius: 1rem 0 0 1em;
  border-right: white solid 1px;
`;

const StyledButtonVotes = styled(StyledButton)`
  border-radius: 0 1rem 1rem 0;
  border-left: white solid 1px;
`;

const SortingIcon = ({ toggle, order }) => {
  if (toggle) {
    return order === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />;
  }
  return null;
};

const ArticleSort = ({ sortBy, order, searchParams }) => {
  const [dateToggle, setDateToggle] = useState(true);
  const [commentsToggle, setCommentsToggle] = useState(false);
  const [votesToggle, setVotesToggle] = useState(false);
  const navigate = useNavigate();

  const handleClick = (sort) => {
    setDateToggle(sort === "created_at");
    setCommentsToggle(sort === "comment_count");
    setVotesToggle(sort === "votes");
    const newOrder = sortBy === sort && order === "desc" ? "asc" : "desc";
    searchParams.set("sort_by", sort);
    searchParams.set("order", newOrder);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <StyledDiv>
      <StyledButtonDate
        onClick={() => handleClick("created_at")}
        $toggle={dateToggle}
      >
        Date <SortingIcon toggle={dateToggle} order={order} />
      </StyledButtonDate>
      <StyledButton
        onClick={() => handleClick("comment_count")}
        $toggle={commentsToggle}
      >
        Comments <SortingIcon toggle={commentsToggle} order={order} />
      </StyledButton>
      <StyledButtonVotes
        onClick={() => handleClick("votes")}
        $toggle={votesToggle}
      >
        Votes <SortingIcon toggle={votesToggle} order={order} />
      </StyledButtonVotes>
    </StyledDiv>
  );
};

export default ArticleSort;
