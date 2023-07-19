import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1em;
  text-align: center;
  padding: 2em;
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    text-decoration: none;
  }
`;

const TopicCard = ({ topic }) => {
  return (
    <Card>
      <Link to={`/${topic.slug}`}>
        <h2>{topic.slug}</h2>
        <div>{topic.description}</div>
      </Link>
    </Card>
  );
};

export default TopicCard;
