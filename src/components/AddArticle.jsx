import Button from "./Button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { postArticle, getTopics } from "../api";
import StyledMain from "./StyledMain";
import Loading from "./Loading";
import StyledHeader from "./StyledHeader";

const StyledDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const StyledForm = styled.form`
  max-width: 920px;
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "title-description title-limit"
    "title title"
    "body-description body-limit"
    "body body"
    "image-description image-note"
    "image image"
    "topic-description topic-note"
    "topic topic"
    "submit-button submit-button";
  gap: 0.2em;
  justify-content: space-between;
  padding: 0 0 1rem 0;
`;

const CharacterLimit = styled.span`
  justify-self: end;
  align-self: end;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 40vh;
  resize: none;
  border: ${({ theme }) => theme.mainbuttoncolor} solid 1px;
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 0.5em;
  margin-bottom: 2em;
  padding: 0.5rem 1em;
  grid-area: body;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: ${({ theme }) => theme.mainbuttoncolor} solid 3px;
  }
`;

const StyledTextInput = styled.input`
  width: 100%;
  border: ${({ theme }) => theme.mainbuttoncolor} solid 1px;
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 0.5em;
  margin-bottom: 2rem;
  padding: 0.5rem 1em;
  grid-area: title;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: ${({ theme }) => theme.mainbuttoncolor} solid 3px;
  }
`;

const StyledURLInput = styled.input`
  width: 100%;
  border: ${({ theme }) => theme.mainbuttoncolor} solid 1px;
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 0.5em;
  margin-bottom: 2rem;
  padding: 0.5rem 1em;
  grid-area: image;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: ${({ theme }) => theme.mainbuttoncolor} solid 3px;
  }
`;

const StyledSelect = styled.select`
  width: 50%;
  border: ${({ theme }) => theme.mainbuttoncolor} solid 1px;
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 0.5em;
  margin-bottom: 2rem;
  padding: 0.5rem 1em;
  grid-area: topic;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: ${({ theme }) => theme.mainbuttoncolor} solid 3px;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const StyledSubmitButton = styled(Button)`
  grid-area: submit-button;
  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.mainbuttoncolordisabled};
  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
`;

const AddArticle = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState({
    author: null,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [article, setArticle] = useState();
  const [topics, setTopics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    setArticle(() => {
      return input;
    });
    event.target.reset();
  };

  useEffect(() => {
    if (
      input.body.length >= 1 &&
      input.body.length <= 3000 &&
      input.title.length >= 1 &&
      input.title.length <= 85 &&
      input.topic !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [input]);

  useEffect(() => {
    const addArticle = async (author, title, body, topic, article_img_url) => {
      try {
        const res = await postArticle(
          author,
          title,
          body,
          topic,
          article_img_url
        );
        toast.success("Article posted!");
        setSubmitDisabled(false);
        setArticle(null);
        setInput({
          author: null,
          title: "",
          body: "",
          topic: "",
          article_img_url: "",
        });
        navigate(`/${res.topic}/${res.article_id}`);
      } catch (err) {
        toast.error("Oops! Something went wrong...");
        setSubmitDisabled(false);
      }
    };
    if (article) {
      addArticle(
        user.username,
        article.title,
        article.body,
        article.topic,
        article.article_img_url
      );
    }
  }, [article, navigate, user.username]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getTopics();
        setTopics(res);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopics();
  }, []);

  if (isLoading) return <Loading>Loading...</Loading>;

  if (!user.username)
    return (
      <StyledDiv>
        <p>
          Please <StyledLink to="/users">login</StyledLink> to post an article.
        </p>
      </StyledDiv>
    );

  return (
    <StyledMain>
      <StyledHeader>Post an article</StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="article-title">Title:</label>
        <CharacterLimit>Max 85 characters</CharacterLimit>
        <StyledTextInput
          type="text"
          id="article-title"
          name="title"
          required
          maxLength={85}
          minLength={1}
          spellCheck="true"
          placeholder="Title goes here"
          onChange={handleChange}
          value={input.title}
        />
        <label htmlFor="article-body">Article text:</label>
        <CharacterLimit>Max 3000 characters</CharacterLimit>
        <StyledTextArea
          id="article-body"
          name="body"
          required
          maxLength={3000}
          minLength={1}
          spellCheck="true"
          placeholder="What's on your mind?"
          onChange={handleChange}
          value={input.body}
        ></StyledTextArea>
        <label htmlFor="article-image">Image URL:</label>
        <CharacterLimit>(Default will be used if none provided)</CharacterLimit>
        <StyledURLInput
          type="url"
          id="article-image"
          name="article_img_url"
          placeholder="Image URL"
          onChange={handleChange}
          value={input.article_img_url}
        />
        <label htmlFor="topic-select">Choose a topic:</label>
        <StyledSelect
          name="topic"
          id="topic-select"
          value={input.topic}
          onChange={handleChange}
          required
        >
          <option key="" value="">
            Choose a topic
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </StyledSelect>

        <StyledSubmitButton type="submit" disabled={submitDisabled}>
          Post Article
        </StyledSubmitButton>
      </StyledForm>
    </StyledMain>
  );
};

export default AddArticle;
