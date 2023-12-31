import { useState, useEffect } from "react";
import styled from "styled-components";
import { getComments } from "../api";
import Comment from "./Comment";
import Loading from "./Loading";
import { FaRegCommentDots } from "react-icons/fa6";

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  justify-items: start;
  margin-bottom: 2em;
  width: 100%;
`;

const StyledLi = styled.li`
  width: 100%;
`;

const CommentCountDiv = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  font-size: 1.3em;
  margin: 0.5em;
`;

const CommentList = ({ commentSubmit, setCommentSubmit, article_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentDeleted, setCommentDeleted] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getComments(article_id);
      setComments(res);
      setIsLoading(false);
      setCommentSubmit(false);
      setCommentDeleted(false);
    })();
  }, [article_id, commentSubmit, setCommentSubmit, commentDeleted]);

  if (isLoading) return <Loading>Loading comments...</Loading>;

  if (comments.length === 0) return <Loading>No comments</Loading>;

  return (
    <>
      <CommentCountDiv>
        <FaRegCommentDots /> {comments.length} Comments
      </CommentCountDiv>
      <StyledUL>
        {comments.map((comment) => {
          return (
            <StyledLi key={comment.comment_id}>
              <Comment
                comment={comment}
                setCommentDeleted={setCommentDeleted}
              />
            </StyledLi>
          );
        })}
      </StyledUL>
    </>
  );
};

export default CommentList;
