import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";

const Card = styled.div`
  //   border: red solid 1px;
  width: 100%;
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
      <Link to={`/${article.topic}/${article.article_id}`}>
        <div>{article.title}</div>
        <div>
          <img src={article.article_img_url} />
        </div>
      </Link>
      <CardFooter>
        <div>{article.votes}</div>
        <div>{article.comment_count}</div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
