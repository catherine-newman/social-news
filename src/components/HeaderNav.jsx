import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User";
import Burger from "./Burger";
import Menu from "./Menu";
import { MdLogout } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";
import VisuallyHidden from "./VisuallyHidden";

const HeaderContainer = styled.div`
  background: ${({ theme }) => theme.cardbackground};
`;

const Header = styled.header`
  max-width: 1100px;
  width: 100%;
  margin: auto;
  display: grid;
  padding: 1rem 1.5rem 0.5rem 1.5rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  h1,
  h2 {
    font-size: 1.2em;
  }

  @media (max-width: 400px) {
    padding: 1rem;
  }
`;

const RightDiv = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: end;

  @media (max-width: 400px) {
    gap: 1.5rem;
  }
`;

const StyledMdLogout = styled(MdLogout)`
  font-size: 1.4rem;
`;

const StyledHome = styled(HiHome)`
  cursor: pointer;
  font-size: 1.7rem;
  will-change: transform;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.1);
`;

const StyledMoon = styled(FaMoon)`
  cursor: pointer;
  font-size: 1.2rem;
  will-change: transform;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.1);
`;

const StyledSun = styled(BiSun)`
  cursor: pointer;
  font-size: 1.2rem;
  will-change: transform;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.1);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media (max-width: 400px) {
    gap: 1rem;
  }
`;

const BurgerMenu = styled.div`
  @media (min-width: 1110px) {
    display: none;
  }
`;

const ExtendedMenu = styled.div`
  @media (max-width: 1110px) {
    display: none;
  }
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: bold;
`;

const Loginout = styled.button`
  cursor: pointer;
  padding: 1rem 0;
  font-weight: normal;
  font-size: 0.9rem;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};

  @media (max-width: 650px) {
    text-align: center;
  }
`;

const Avatar = styled.img`
  height: 2rem;
  border-radius: 1em;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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
  const [open, setOpen] = useState(false);
  useOnClickOutside(node, () => setOpen(false));

  const handleLogoutClick = () => {
    setUser({});
  };

  return (
    <HeaderContainer>
      <Header>
        <Nav>
          <Link to="/">
            <StyledHome aria-hidden="false" />
            <VisuallyHidden>Home</VisuallyHidden>
          </Link>
          <Link to="/topics">Topics</Link>
          <Link to="/newarticle">Post an article</Link>
        </Nav>
        <RightDiv>
          {theme === "light" ? (
            <StyledMoon onClick={toggleTheme} />
          ) : (
            <StyledSun onClick={toggleTheme} />
          )}
          <BurgerMenu ref={node}>
            {" "}
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
          </BurgerMenu>
          <ExtendedMenu>
            {user.username ? (
              <Link to={`/authors/${user.username}`}>
                <UserInfo>
                  <Avatar src={user.avatar_url} alt={user.username} />
                  {user.username}
                </UserInfo>
              </Link>
            ) : (
              <Link to="/users">
                <Loginout>Login</Loginout>
              </Link>
            )}
            {user.username ? (
              <Loginout onClick={handleLogoutClick}>
                <div>Logout</div>
                <StyledMdLogout />
              </Loginout>
            ) : null}
          </ExtendedMenu>
        </RightDiv>
      </Header>
    </HeaderContainer>
  );
};

export default HeaderNav;
