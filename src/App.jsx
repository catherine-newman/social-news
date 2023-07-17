import "./App.css";
import "./reset.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";

function App() {
  return (
    <>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <FooterNav />
    </>
  );
}

export default App;
