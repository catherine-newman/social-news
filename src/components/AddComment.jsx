import Button from "./Button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import styled from "styled-components";
import { postComment } from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.cardborder};
  text-align: center;
  width: 100%;
  padding: 0 0 1.5rem 0;
  font-size: 1.2rem;

  button {
    font-size: 1rem;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "username character-limit"
    "main main"
    "submit-button submit-button";
  gap: 0.2em;
  justify-content: space-between;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.cardborder};
`;

const CharacterLimit = styled.span`
  justify-self: end;
  align-self: end;
  grid-area: character-limit;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 7em;
  resize: none;
  border: ${({ theme }) => theme.mainbuttoncolor} solid 1px;
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.5rem 1em;
  grid-area: main;

  &:focus {
    outline: ${({ theme }) => theme.mainbuttoncolor} solid 3px;
  }
`;

const StyledSubmitButton = styled(Button)`
  grid-area: submit-button;
  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.mainbuttoncolordisabled};
  }
`;

const AddComment = ({ article_id, setCommentSubmit }) => {
  const [formDisplay, setFormDisplay] = useState(false);
  const { user } = useContext(UserContext);
  const [inputBox, setInputBox] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [comment, setComment] = useState();

  const handleButtonClick = () => {
    setFormDisplay(true);
  };

  const handleChange = (event) => {
    setInputBox(event.target.value);
    if (event.target.value.length >= 1 && event.target.value.length <= 500) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    setComment(() => {
      return inputBox;
    });
    setInputBox("");
    event.target.reset();
  };

  useEffect(() => {
    const addComment = async (article_id, user, comment) => {
      try {
        await postComment(article_id, user.username, comment);
        toast.success("Comment posted!");
        setFormDisplay(false);
        setSubmitDisabled(false);
        setCommentSubmit(true);
        setComment(null);
      } catch (err) {
        toast.error("Oops! Something went wrong...");
        setSubmitDisabled(false);
      }
    };
    if (comment) {
      addComment(article_id, user, comment);
    }
  }, [comment, article_id, user, setCommentSubmit]);

  if (!formDisplay)
    return (
      <StyledDiv>
        <Button onClick={handleButtonClick}>Add Comment</Button>
      </StyledDiv>
    );

  if (formDisplay && !user.username)
    return (
      <StyledDiv>
        Please <Link to="/users">login</Link> to write a comment.
      </StyledDiv>
    );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="addcomment">Comment as {user.username}:</label>
      <CharacterLimit>Max 500 characters</CharacterLimit>
      <StyledTextArea
        id="addcomment"
        name="comment"
        required
        maxLength={500}
        minLength={1}
        spellCheck="true"
        placeholder="What do you think?"
        onChange={handleChange}
        value={inputBox}
      ></StyledTextArea>
      <StyledSubmitButton type="submit" disabled={submitDisabled}>
        Comment
      </StyledSubmitButton>
    </StyledForm>
  );
};

export default AddComment;
