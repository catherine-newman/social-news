import { formatDate } from "../utilities/formatDate";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import { UserContext } from "../contexts/User";
import { useContext, useState, useEffect } from "react";
import { deleteComment } from "../api";
import { toast } from "react-toastify";
import Loading from "./Loading";
import VisuallyHidden from "./VisuallyHidden";
import CommentVote from "./CommentVote";
import { patchComment } from "../api";

const CommentCard = styled.div`
  border: solid 1px ${({ theme }) => theme.cardborder};
  border-radius: 1em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentBody = styled.div`
  padding: 0rem 0.5em;
`;

const StyledButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;

const StyledRiDeleteBin6Line = styled(RiDeleteBin6Line)`
  color: ${({ theme }) => theme.text};
  will-change: transform;
  transition:
    transform 350ms ease,
    color 350ms ease;

  &:hover {
    transform: scale(1.2);
    color: #c82727;
    transition:
      transform 150ms ease,
      color 150ms ease;
  }
`;

const Comment = ({ comment, setCommentDeleted }) => {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [voteCount, setVoteCount] = useState(comment.votes);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [downVoteClicked, setDownVoteClicked] = useState(false);
  const { comment_id } = comment;

  const handleClick = () => {
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isDeleting) {
      (async () => {
        try {
          await deleteComment(comment_id);
          toast.success("Comment deleted");
          setIsDeleting(false);
          setCommentDeleted(true);
        } catch (err) {
          toast.error("Oops! Something went wrong...");
          setIsDeleting(false);
        }
      })();
    }
  }, [isDeleting, comment_id, setCommentDeleted]);

  const upVote = async (vote) => {
    try {
      const res = await patchComment(comment_id, vote);
      setVoteCount(res.votes);
    } catch (err) {
      console.log(err);
      toast.error("Oops! Something went wrong...");
      setVoteCount(voteCount);
      setUpVoteClicked(false);
      if (vote === 2) {
        setDownVoteClicked(true);
      }
    }
  };

  const downVote = async (vote) => {
    try {
      const res = await patchComment(comment_id, vote);
      setVoteCount(res.votes);
    } catch (err) {
      toast.error("Oops! Something went wrong...");
      setVoteCount(voteCount);
      setDownVoteClicked(false);
      if (vote === -2) {
        setUpVoteClicked(true);
      }
    }
  };

  const handleUpVote = () => {
    console.log("up clicked");
    if (upVoteClicked) {
      const newCount = voteCount - 1;
      setVoteCount(newCount);
      setUpVoteClicked(false);
      downVote(-1);
    } else {
      setUpVoteClicked(true);
      if (!downVoteClicked) {
        const newCount = voteCount + 1;
        setVoteCount(newCount);
        upVote(1);
      } else {
        const newCount = voteCount + 2;
        setVoteCount(newCount);
        setDownVoteClicked(false);
        upVote(2);
      }
    }
  };

  const handleDownVote = () => {
    if (downVoteClicked) {
      const newCount = voteCount + 1;
      setVoteCount(newCount);
      setDownVoteClicked(false);
      upVote(1);
    } else {
      setDownVoteClicked(true);
      if (!upVoteClicked) {
        const newCount = voteCount - 1;
        setVoteCount(newCount);
        downVote(-1);
      } else {
        const newCount = voteCount - 2;
        setVoteCount(newCount);
        setUpVoteClicked(false);
        downVote(-2);
      }
    }
  };

  if (isDeleting) return <Loading>Deleting comment...</Loading>;

  return (
    <IconContext.Provider value={{ style: { fontSize: "1.3em" } }}>
      <CommentCard>
        <CommentHeader>
          <div>
            {comment.author} - {formatDate(comment.created_at)}
          </div>
          {comment.author === user.username ? (
            <StyledButton onClick={handleClick} disabled={isDeleting}>
              <StyledRiDeleteBin6Line />
              <VisuallyHidden>Delete comment</VisuallyHidden>
            </StyledButton>
          ) : null}
        </CommentHeader>
        <CommentBody>{comment.body}</CommentBody>
        <CommentVote
          votes={voteCount}
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
          upVoteClicked={upVoteClicked}
          downVoteClicked={downVoteClicked}
        />
      </CommentCard>
    </IconContext.Provider>
  );
};

export default Comment;
