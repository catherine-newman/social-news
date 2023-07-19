import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IconContext } from "react-icons";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1em;
  padding: 2em;
  img {
    border-radius: 1em;
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
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const VotesDiv = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const ArticleCard = ({ article }) => {
  return (
    <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
      <Card>
        <CardHeader>
          <div>
            {article.author} {formatDate(article.created_at)}
          </div>
          <div>
            <Link to={`/${article.topic}`}>{article.topic}</Link>
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
          <VotesDiv>
            <HiOutlineArrowsUpDown /> {article.votes}
          </VotesDiv>
          <div>{article.comment_count} Comments</div>
        </CardFooter>
      </Card>
    </IconContext.Provider>
  );
};

export default ArticleCard;
