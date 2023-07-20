import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import { UserContext } from "../contexts/User";
import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

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

const Comment = ({ comment }) => {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = (event) => {
    setIsDeleting(true);
    console.log("please wait");
  };

  return (
    <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
      <CommentHeader>
        <div>
          {comment.author} {formatDate(comment.created_at)}
        </div>
        {comment.author === user.username ? (
          <StyledButton onClick={handleClick} disabled={isDeleting}>
            {isDeleting ? <BsThreeDots /> : <StyledRiDeleteBin6Line />}
          </StyledButton>
        ) : null}
      </CommentHeader>
      <CommentBody>{comment.body}</CommentBody>
      <CommentFooter>{comment.votes}</CommentFooter>
    </IconContext.Provider>
  );
};

export default Comment;
