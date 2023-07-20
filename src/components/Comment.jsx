import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import { UserContext } from "../contexts/User";
import { useContext, useState, useEffect } from "react";
import { deleteComment } from "../api";
import { toast } from "react-toastify";
import Loading from "./Loading";

const CommentCard = styled.div`
  border: solid 1px #cacdf7;
  border-radius: 1em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const CommentFooter = styled.div`
  text-align: center;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentBody = styled.div`
  padding: 0em 0.5em;
`;

const StyledButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;

const StyledRiDeleteBin6Line = styled(RiDeleteBin6Line)`
  will-change: transform;
  transition:
    transform 350ms ease,
    color 350ms ease;

  &:hover {
    transform: scale(1.2);
    color: #7a82e4;
    transition:
      transform 150ms ease,
      color 150ms ease;
  }
`;

const Comment = ({ comment, setCommentDeleted }) => {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentDisplay, setCommentDisplay] = useState(true);

  const handleClick = () => {
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isDeleting) {
      (async () => {
        setCommentDisplay(false);
        try {
          await deleteComment(comment.comment_id);
          toast.success("Comment deleted");
          setIsDeleting(false);
          setCommentDeleted(true);
        } catch (err) {
          setCommentDisplay(true);
          toast.error("Oops! Something went wrong...");
          setIsDeleting(false);
        }
      })();
    }
  }, [isDeleting]);

  if (!commentDisplay) return <Loading>Deleting comment...</Loading>;

  return (
    <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
      <CommentCard>
        <CommentHeader>
          <div>
            {comment.author} {formatDate(comment.created_at)}
          </div>
          {comment.author === user.username ? (
            <StyledButton onClick={handleClick} disabled={isDeleting}>
              <StyledRiDeleteBin6Line />
            </StyledButton>
          ) : null}
        </CommentHeader>
        <CommentBody>{comment.body}</CommentBody>
        <CommentFooter>{comment.votes}</CommentFooter>
      </CommentCard>
    </IconContext.Provider>
  );
};

export default Comment;
