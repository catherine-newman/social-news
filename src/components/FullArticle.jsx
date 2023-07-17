import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import { formatDate } from "../utilities/formatDate";

const FullArticle = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getArticle(article_id);
      setArticle(res);
    })();
  }, [article_id]);

  return (
    <div>
      <div>{article.topic}</div>
      <div>
        {article.author} {formatDate(article.created_at)}
      </div>
      <article>
        <h1>{article.title}</h1>
        <img src={article.article_img_url} />
        <p>{article.body}</p>
      </article>
      <div>
        <div>{article.votes}</div>
        <div>{article.comment_count}</div>
      </div>
    </div>
  );
};

export default FullArticle;
