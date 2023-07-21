import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User";
import Burger from "./Burger";
import Menu from "./Menu";
import { MdLogout } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";

const HeaderContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: auto;
  background: ${({ theme }) => theme.cardbackground};
  border-radius: 0 0 1em 1em;

  @media (max-width: 1100px) {
    border-radius: 0;
  }
`;

const Header = styled.header`
  display: grid;
  padding: 1.5em;
  grid-template-columns: 1fr 1fr 1fr;
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

const NavHeader = styled.div`
  justify-self: center;
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
  gap: 2rem;
  font-weight: bold;
`;

const Loginout = styled.div`
  cursor: pointer;
  padding: 1rem 0;
  font-weight: normal;
  font-size: 0.8rem;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  @media (max-width: 650px) {
    text-align: center;
  }
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
      return <h2># {topic}</h2>;
    } else if (topic) {
      return <h1># {topic}</h1>;
    }
  };

  const handleLogoutClick = () => {
    setUser({});
  };

  return (
    <HeaderContainer>
      <Header>
        <Nav>
          <Link to="/">
            <StyledHome />
          </Link>
          <Link to="/topics">TOPICS</Link>
        </Nav>
        <NavHeader>{navHeader()}</NavHeader>
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
            <Link to="/users">
              {user.username ? user.username : <Loginout>Login</Loginout>}
            </Link>

            <Loginout onClick={handleLogoutClick}>
              {user.username ? (
                <>
                  <div>Logout</div>
                  <StyledMdLogout />
                </>
              ) : null}
            </Loginout>
          </ExtendedMenu>
        </RightDiv>
      </Header>
    </HeaderContainer>
  );
};

export default HeaderNav;
