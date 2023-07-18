import Button from "./Button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import styled from "styled-components";
import { postComment } from "../api";
import { toast } from "react-toastify";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 7em;
  resize: none;
  border: #4d5bb8 solid 1px;
  border-radius: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.5em 1em;
`;

const StyledSubmitButton = styled(Button)`
  &:disabled {
    cursor: not-allowed;
    background-color: #cacdf7;
  }
`;

const AddComment = ({ article_id, comments, setComments }) => {
  const [formDisplay, setFormDisplay] = useState(false);
  const { user } = useContext(UserContext);
  const [inputBox, setInputBox] = useState("");
  const [comment, setComment] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleButtonClick = () => {
    setFormDisplay(true);
  };

  const handleChange = (event) => {
    setInputBox(event.target.value);
    if (event.target.value.length >= 1) {
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
