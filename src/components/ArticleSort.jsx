import styled from "styled-components";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 1100px;
  padding: 0;
  margin-top: 1rem;

  @media screen and (max-width: 1200px) {
    width: 95%;
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.$toggle
      ? ({ theme }) => theme.secondbuttoncolortoggled
      : ({ theme }) => theme.secondbuttoncolor};
  border: none;
  color: #000;
  text-transform: uppercase;
  padding: 0.5rem 1rem 0.5rem 1em;
  cursor: pointer;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const StyledButtonDate = styled(StyledButton)`
  border-radius: 1rem 0 0 1em;
  border-right: ${({ theme }) => theme.cardbackground} solid 3px;
`;

const StyledButtonVotes = styled(StyledButton)`
  border-radius: 0 1rem 1rem 0;
  border-left: ${({ theme }) => theme.cardbackground} solid 3px;
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
