import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User";
import BurgerMenuIcon from "./BurgerMenuIcon";
import BurgerMenuList from "./BurgerMenuList";
import { HiHome } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";
import VisuallyHidden from "./VisuallyHidden";
import UserMenuIcon from "./UserMenuIcon";
import UserMenuList from "./UserMenuList";

const HeaderContainer = styled.div`
  background: ${({ theme }) => theme.cardbackground};
`;

const Header = styled.header`
  max-width: 1100px;
  width: 100%;
  margin: auto;
  display: grid;
  padding: 1rem 1.5rem 1rem 1.5rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;

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

const PCNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media (max-width: 550px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  align-items: center;
  @media (min-width: 551px) {
    display: none;
  }
`;

const BurgerMenu = styled.div`
  @media (min-width: 551px) {
    display: none;
  }
`;

const UserMenu = styled.div`
  @media (max-width: 550px) {
    display: none;
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
  const burgerNode = useRef();
  const userNode = useRef();
  const { user } = useContext(UserContext);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const location = useLocation();
  useOnClickOutside(burgerNode, () => setBurgerOpen(false));
  useOnClickOutside(userNode, () => setUserOpen(false));
  console.log(user);

  useEffect(() => {
    setBurgerOpen(false);
    setUserOpen(false);
  }, [location]);

  return (
    <HeaderContainer>
      <Header>
        <PCNav>
          <Link to="/">
            <StyledHome aria-hidden="false" />
            <VisuallyHidden>Home</VisuallyHidden>
          </Link>
          <Link to="/topics">Topics</Link>
          <Link to="/newarticle">Post an article</Link>
        </PCNav>
        <MobileNav>
          <Link to="/">
            <StyledHome aria-hidden="false" />
            <VisuallyHidden>Home</VisuallyHidden>
          </Link>
        </MobileNav>
        <RightDiv>
          {theme === "light" ? (
            <StyledMoon onClick={toggleTheme} />
          ) : (
            <StyledSun onClick={toggleTheme} />
          )}
          <BurgerMenu ref={burgerNode}>
            {" "}
            <BurgerMenuIcon open={burgerOpen} setOpen={setBurgerOpen} />
            <BurgerMenuList open={burgerOpen} setOpen={setBurgerOpen} />
          </BurgerMenu>
          <UserMenu ref={userNode}>
            <UserMenuIcon
              img={user.avatar_url}
              open={userOpen}
              setOpen={setUserOpen}
            />
            <UserMenuList open={userOpen} setOpen={setUserOpen} />
          </UserMenu>
        </RightDiv>
      </Header>
    </HeaderContainer>
  );
};

export default HeaderNav;
