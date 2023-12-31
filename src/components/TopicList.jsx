import { useState, useEffect } from "react";
import styled from "styled-components";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";
import StyledMain from "./StyledMain";
import Loading from "./Loading";

const StyledHeader = styled.h1`
  padding: 1em;
  text-align: center;
`;

const StyledUL = styled.ul`
  list-style-type: none;
  margin-top: 2em;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
  gap: 2em;
  max-width: 1100px;

  @media screen and (max-width: 1200px) {
    width: 95%;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await getTopics();
      setTopics(res);
      setIsLoading(false);
    };
    fetchTopics();
  }, []);

  if (isLoading) return <Loading>Loading topics...</Loading>;

  return (
    <StyledMain>
      <StyledHeader>Topics</StyledHeader>
      <StyledUL>
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <TopicCard topic={topic} />
            </li>
          );
        })}
      </StyledUL>
    </StyledMain>
  );
};

export default TopicList;
