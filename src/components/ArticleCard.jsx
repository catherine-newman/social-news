import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { FaRegCommentDots } from "react-icons/fa6";
import { IconContext } from "react-icons";

const Card = styled.div`
  will-change: transform;
  transition: opacity 450ms ease;

  &:hover {
    opacity: 0.8;
    transition: opacity 125ms;
  }
  img {
    border-radius: 1.5em;
  }
`;

const CardDetails = styled.div`
  max-width: 70%;
  z-index: 1;
  max-height: 9rem;
  height: 100%;
  width: 100%;
  max-width: 30rem;
  background: ${({ theme }) => theme.cardbackground};
  position: absolute;
  bottom: 0;
  padding-bottom: 0.3rem 0.3rem 2.8rem 0.3rem;
  display: flex;
  flex-direction: column;
  border-bottom: ${({ theme }) => theme.cardborder} solid 1px;

  @media screen and (max-width: 400px) {
    max-height: 7.5rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0 0 1rem;
  h2 {
    font-size: 1.2rem;

    @media screen and (max-width: 640px) {
      font-size: 1.1rem;
    }

    @media screen and (max-width: 400px) {
      font-size: 1rem;
    }
  }
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  gap: 1rem;
  @media screen and (max-width: 400px) {
    font-size: 0.9rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: normal;
`;

const ImageContainer = styled.div`
  padding-bottom: 2em;
`;

const VotesCommentsDiv = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  border-right: ${({ theme }) => theme.cardborder} solid 1px;
  padding-right: 1rem;
`;

const ArticleCard = ({ article }) => {
  const {
    author,
    topic,
    article_id,
    created_at,
    title,
    article_img_url,
    votes,
    comment_count,
  } = article;

  return (
    <StyledLink to={`/${topic}/${article_id}`}>
      <Card>
        <ImageContainer>
          <img src={article_img_url} alt={title} />
        </ImageContainer>
        <CardDetails>
          <CardHeader>
            <h2>{title}</h2>
            <p>by {author}</p>
          </CardHeader>
          <CardFooter>
            <VotesCommentsDiv>
              <FaRegCommentDots aria-hidden="true" focusable="false" />
              {comment_count} Comments
            </VotesCommentsDiv>
            <VotesCommentsDiv>
              <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
                <HiOutlineArrowsUpDown aria-hidden="true" focusable="false" />{" "}
                {votes} votes
              </IconContext.Provider>
            </VotesCommentsDiv>
            <div>{formatDate(created_at)}</div>
          </CardFooter>
        </CardDetails>
      </Card>
    </StyledLink>
  );
};

export default ArticleCard;
