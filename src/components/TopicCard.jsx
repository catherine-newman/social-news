import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1em;
  text-align: center;
  padding: 2em;
  will-change: transform;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0 10px 5px -5px #a8aace;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const TopicCard = ({ topic }) => {
  return (
    <StyledLink to={`/topics/${topic.slug}`}>
      <Card>
        <h2>{topic.slug}</h2>
        <div>{topic.description}</div>
      </Card>
    </StyledLink>
  );
};

export default TopicCard;
