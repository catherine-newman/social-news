import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { FaRegCommentDots } from "react-icons/fa6";
import { IconContext } from "react-icons";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1em;
  padding: 1em 1.5em;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  will-change: transform;
  transition: box-shadow 450ms ease;

  &:hover {
    transition: box-shadow 125ms;
    box-shadow: 0 10px 5px -5px #a8aace;
  }
  img {
    border-radius: 1em;
    margin-top: 0.5em;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardBody = styled.div`
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: normal;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const VotesCommentsDiv = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
`;

const ArticleCard = ({ article }) => {
  return (
    <StyledLink to={`/${article.topic}/${article.article_id}`}>
      <Card>
        <CardHeader>
          <div>
            {article.author} {formatDate(article.created_at)}
          </div>
          <div>
            <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
          </div>
        </CardHeader>
        <CardBody>
          <h2>{article.title}</h2>
          <div>
            <img src={article.article_img_url} />
          </div>
        </CardBody>
        <CardFooter>
          <VotesCommentsDiv>
            <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
              <HiOutlineArrowsUpDown /> {article.votes}
            </IconContext.Provider>
          </VotesCommentsDiv>
          <VotesCommentsDiv>
            <FaRegCommentDots />
            {article.comment_count} Comments
          </VotesCommentsDiv>
        </CardFooter>
      </Card>
    </StyledLink>
  );
};

export default ArticleCard;
