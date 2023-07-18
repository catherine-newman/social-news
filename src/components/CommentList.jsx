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

const StyledLi = styled.li`
  width: 100%;
`;

const CommentList = ({ commentSubmit, setCommentSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getComments(article_id);
      setComments(res);
      setIsLoading(false);
      setCommentSubmit(false);
    })();
  }, [commentSubmit]);

  if (isLoading) return <p>Loading comments...</p>;

  if (comments.length === 0) return <p>No comments</p>;

  return (
    <StyledUL>
      {comments.map((comment) => {
        return (
          <StyledLi key={comment.comment_id}>
            <Comment comment={comment} />
          </StyledLi>
        );
      })}
    </StyledUL>
  );
};

export default CommentList;
