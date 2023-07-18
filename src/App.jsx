import "./App.css";
import "./reset.css";
import { Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./components/Home";
import HeaderNav from "./components/HeaderNav";
import Article from "./components/Article";

const GlobalStyle = createGlobalStyle`
body {
    font-family: "Jost", sans-serif;
    background-color: #cacdf7;
}`;

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
      <HeaderNav />
      <StyledMain>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:topic/:article_id" element={<Article />} />
        </Routes>
      </StyledMain>
    </>
  );
}

export default App;
