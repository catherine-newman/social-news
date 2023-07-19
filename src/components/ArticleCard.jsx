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
  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
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
        <Link to={`/${article.topic}/${article.article_id}`}>
          <h2>{article.title}</h2>
          <div>
            <img src={article.article_img_url} />
          </div>
        </Link>
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
  );
};

export default ArticleCard;
