import "./App.css";
import "./reset.css";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import HeaderNav from "./components/HeaderNav";
import SecondaryNav from "./components/SecondaryNav";

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "secondary";
  justify-content: center;

  @media screen and (min-width: 769px) {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: "header header" "secondary main";
  }
`;

const StyledMain = styled.main`
  grid-area: main;
  overflow: auto;
`;

function App() {
  return (
    <AppContainer>
      <HeaderNav />
      <StyledMain>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </StyledMain>
      <SecondaryNav />
    </AppContainer>
  );
}

export default App;
