import { formatDate } from "../utilities/formatDate";

const Comment = ({ comment }) => {
  return (
    <div>
      <div>
        <div>
          {comment.author} {formatDate(comment.created_at)}
        </div>
        <div>{comment.votes}</div>
      </div>
      <div>{comment.body}</div>
    </div>
  );
};

export default Comment;
