import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { MdLogout } from "react-icons/md";

const StyledMenu = styled.nav`
  background: ${({ theme }) => theme.cardbackground};
  height: auto;
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 3em;
  left: 0;
  z-index: 9;
  width: 100%;
  // transition: transform 0.1s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(+100%)")};
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  font-size: 2rem;
  gap: 1rem;
  transition: color 0.5s ease-in-out;
  a {
    color: ${({ open }) =>
      open ? ({ theme }) => theme.text : ({ theme }) => theme.cardbackground};
    transition: color 0.7s ease-in-out;
  }
  div {
    color: ${({ open }) =>
      open ? ({ theme }) => theme.text : ({ theme }) => theme.cardbackground};
    transition: color 0.7s ease-in-out;
  }
`;

const Logout = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
`;

const StyledMdLogout = styled(MdLogout)`
  position: relative;
  top: 2px;
  font-size: 1.7rem;
`;

const Menu = ({ open, setOpen }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogoutClick = () => {
    setUser({});
    setOpen(false);
  };

  return (
    <StyledMenu open={open}>
      <LinkList open={open}>
        {user.username ? (
          <>
            <Link to="/newarticle">Post an article</Link>
            <Link to={`/authors/${user.username}`}>View your articles</Link>
            <Logout onClick={handleLogoutClick}>
              <div>Logout</div>
              <StyledMdLogout />
            </Logout>
          </>
        ) : (
          <Link to="/users">Login</Link>
        )}
      </LinkList>
    </StyledMenu>
  );
};

export default Menu;
