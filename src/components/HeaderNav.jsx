import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User";
import Button from "./Button";
import Burger from "./Burger";
import Menu from "./Menu";
import { MdLogout, MdLogin } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";

const StyledHeader = styled.header`
  display: flex;
  padding: 1.5em;
  justify-content: space-between;
  align-items: center;
  h1,
  h2 {
    font-size: 1em;
  }
`;

const UserDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledMdLogout = styled(MdLogout)`
  cursor: pointer;
  font-size: 1.4rem;
  will-change: transform;
  transition: transform 350ms ease;

  &:hover {
    transform: translateX(5px);
`;

const StyledMdLogin = styled(MdLogin)`
  cursor: pointer;
  font-size: 1.4rem;
  will-change: transform;
  transition: transform 350ms ease;

  &:hover {
    transform: translateX(5px);
`;

const StyledHome = styled(HiHome)`
  cursor: pointer;
  font-size: 2.5rem;
  will-change: transform;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.1);
`;

const StyledMoon = styled(FaMoon)`
  cursor: pointer;
  font-size: 2rem;
  will-change: transform;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.1);
`;

const StyledSun = styled(BiSun)`
  cursor: pointer;
  font-size: 2.3rem;
  will-change: transform;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.1);
`;

const StyledNavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const HeaderNav = ({ theme, toggleTheme }) => {
  const node = useRef();
  const { user, setUser } = useContext(UserContext);
  const { topic, article_id } = useParams();
  const [open, setOpen] = useState(false);
  useOnClickOutside(node, () => setOpen(false));
  const navHeader = () => {
    if (article_id) {
      return <h2>{topic}</h2>;
    } else if (topic) {
      return <h1>{topic}</h1>;
    }
  };

  const handleLogoutClick = () => {
    setUser({});
  };

  return (
    <StyledHeader>
      <StyledNavIcons>
        <div ref={node}>
          {" "}
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
        <Link to="/">
          <StyledHome />
        </Link>
        {theme === "light" ? (
          <StyledMoon onClick={toggleTheme} />
        ) : (
          <StyledSun onClick={toggleTheme} />
        )}
      </StyledNavIcons>
      <div>{navHeader()}</div>
      <UserDiv>
        <Link to="/users">
          {user.username ? user.username : <StyledMdLogin />}
        </Link>{" "}
        {user.username ? <StyledMdLogout onClick={handleLogoutClick} /> : null}
      </UserDiv>
    </StyledHeader>
  );
};

export default HeaderNav;
