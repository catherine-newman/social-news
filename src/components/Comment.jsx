import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";

const CommentFooter = styled.div`
  text-align: center;
`;

const Comment = ({ comment }) => {
  return (
    <div>
      <div>
        {comment.author} {formatDate(comment.created_at)}
      </div>
      <div>{comment.body}</div>
      <CommentFooter>{comment.votes}</CommentFooter>
    </div>
  );
};

export default Comment;
