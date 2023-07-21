import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 1em;
  text-align: center;
  padding: 2em;
  border: ${({ theme }) => theme.cardborder} solid 1px;
  will-change: transform;
  transition: transform 450ms ease;

  &:hover {
    transform: translateY(-5px);
    transition: transform 150ms ease;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

const TopicCard = ({ topic }) => {
  return (
    <StyledLink to={`/topics/${topic.slug}`}>
      <Card>
        <h3># {topic.slug}</h3>
        <div>{topic.description}</div>
      </Card>
    </StyledLink>
  );
};

export default TopicCard;
