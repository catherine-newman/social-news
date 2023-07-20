import "./styles/reset.css";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "./styles/GlobalStyle";

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
  return (
    <>
      <GlobalStyle />
      <ToastContainer position="top-center" hideProgressBar="true" />
      <Routes>
        <Route
          element={
            <>
              <HeaderNav />
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
    </>
  );
}

export default App;
