import "./styles/reset.css";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Themes";
import { useDarkMode } from "./components/ThemeToggler";

import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  Home,
  HeaderNav,
  Article,
  TopicList,
  ArticleList,
  UserLogin,
  ErrorPage,
} from "./components";

function App() {
  const [theme, themeToggler, themeReady] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!themeReady) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        hideProgressBar="true"
        theme={theme}
      />
      <Routes>
        <Route
          element={
            <>
              <HeaderNav theme={theme} toggleTheme={themeToggler} />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/:topic/:article_id" element={<Article />} />
          <Route path="/topics" element={<TopicList />} />
          <Route path="/topics/:topic" element={<ArticleList />} />
          <Route path="/users" element={<UserLogin />} />
          <Route path="*" element={<ErrorPage status={404} />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
