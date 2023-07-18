import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getComments } from "../api";
import Comment from "./Comment";

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  justify-items: start;
`;

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getComments(article_id);
      setComments(res);
      setIsLoading(false);
    })();
  }, [article_id]);

  if (isLoading) return <p>Loading comments...</p>;

  if (comments.length === 0) return <p>No comments</p>;

  return (
    <StyledUL>
      {comments.map((comment) => {
        return (
          <li key={comment.comment_id}>
            <Comment comment={comment} />
          </li>
        );
      })}
    </StyledUL>
  );
};

export default CommentList;
