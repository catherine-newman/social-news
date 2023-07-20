import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 1em;
  text-align: center;
  padding: 2em;
  border: ${({ theme }) => theme.cardborder} solid 1px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

const TopicCard = ({ topic }) => {
  return (
    <StyledLink to={`/topics/${topic.slug}`}>
      <Card>
        <h2># {topic.slug}</h2>
        <div>{topic.description}</div>
      </Card>
    </StyledLink>
  );
};

export default TopicCard;
