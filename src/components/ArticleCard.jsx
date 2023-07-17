import { formatDate } from "../utilities/formatDate";

const ArticleCard = ({ article }) => {
  return (
    <>
      <div>
        <div>
          {article.author} {formatDate(article.created_at)}
        </div>
        <div>{article.topic}</div>
      </div>
      <div>{article.title}</div>
      <div>
        <img src={article.article_img_url} />
      </div>
      <div>
        <div>{article.votes}</div>
        <div>{article.comment_count}</div>
      </div>
    </>
  );
};

export default ArticleCard;
