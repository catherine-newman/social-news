import { useState, useEffect } from "react";
import styled from "styled-components";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";

const StyledUL = styled.ul`
  list-style-type: none;
  margin-top: 2em;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: masonry;
  gap: 2em;
  width: 640px;

  @media screen and (max-width: 640px) {
    width: 95%;
  }
`;

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getTopics();
      setTopics(res);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <p>Loading topics...</p>;

  return (
    <StyledUL>
      {topics.map((topic) => {
        return (
          <li key={topic.slug}>
            <TopicCard topic={topic} />
          </li>
        );
      })}
    </StyledUL>
  );
};

export default TopicList;
