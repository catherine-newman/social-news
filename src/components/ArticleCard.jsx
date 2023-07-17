import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1em;
  padding: 2em;
  a {
    color: black;
    text-decoration: none;
  }
  img {
    border-radius: 1em;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <CardHeader>
        <div>
          {article.author} {formatDate(article.created_at)}
        </div>
        <div>{article.topic}</div>
      </CardHeader>
      <div>
        <Link to={`/${article.topic}/${article.article_id}`}>
          <h2>{article.title}</h2>
          <div>
            <img src={article.article_img_url} />
          </div>
        </Link>
      </div>
      <CardFooter>
        <div>{article.votes}</div>
        <div>{article.comment_count}</div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
