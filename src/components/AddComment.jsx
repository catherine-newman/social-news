import Button from "./Button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import styled from "styled-components";
import { postComment } from "../api";
import { toast } from "react-toastify";

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
`;

const CharacterLimit = styled.span`
  justify-self: end;
  grid-area: character-limit;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 7em;
  resize: none;
  border: #4d5bb8 solid 1px;
  border-radius: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.5em 1em;
  grid-area: main;

  &:focus {
    outline: #4d5bb8 solid 3px;
  }
`;

const StyledSubmitButton = styled(Button)`
  grid-area: submit-button;
  &:disabled {
    cursor: not-allowed;
    background-color: #cacdf7;
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
    if (comment) {
      addComment(article_id, user, comment);
    }
  }, [comment]);

  const addComment = async (article_id, user, comment) => {
    try {
      await postComment(article_id, user, comment);
      toast.success("Comment posted!");
      setFormDisplay(false);
      setSubmitDisabled(false);
      setCommentSubmit(true);
    } catch (err) {
      toast.error("Oops! Something went wrong...");
      setSubmitDisabled(false);
    }
  };

  if (!formDisplay)
    return <Button onClick={handleButtonClick}>Add Comment</Button>;

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="addcomment">Comment as {user}:</label>
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
