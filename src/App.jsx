import "./App.css";
import "./reset.css";
import { Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./components/Home";
import HeaderNav from "./components/HeaderNav";
import Article from "./components/Article";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import TopicList from "./components/TopicList";
import ArticleList from "./components/ArticleList";

const GlobalStyle = createGlobalStyle`
body {
    font-family: "Jost", sans-serif;
    background-color: #cacdf7;
}

a {
    text-decoration: none;
    color: #4d5bb8;
    font-weight: 700;
}

a:hover {
    text-decoration: underline;
}
`;

const StyledMain = styled.main`
  display: flex;
  max-width: 100%;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer position="top-center" hideProgressBar="true" />
      <HeaderNav />
      <StyledMain>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:topic/:article_id" element={<Article />} />
          <Route path="/topics" element={<TopicList />} />
          <Route path="/:topic" element={<ArticleList />} />
        </Routes>
      </StyledMain>
    </>
  );
}

export default App;
