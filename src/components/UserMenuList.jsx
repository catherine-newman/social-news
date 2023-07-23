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
  top: 4rem;
  right: 1rem;
  z-index: 9;
  width: auto;
  box-shadow:
    0 0 0 1px rgba(64, 87, 109, 0.07),
    0 2px 12px rgba(53, 71, 90, 0.2);
  border-radius: 0.5rem;
  transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(+120%)")};

  @media (max-width: 550px) {
    width: 100%;
    box-shadow: none;
    right: 0;
    border-radius: none;
  }
`;

const LinkList = styled.ul`
  display: flex;
  list-style-type: none;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 3rem 0;
  font-size: 1.2rem;
  li,
  a {
    color: ${({ open }) =>
      open ? ({ theme }) => theme.text : ({ theme }) => theme.cardbackground};
    transition: color 0.7s ease-in-out;
    width: 100%;
  }
  @media (max-width: 550px) {
    align-items: center;
  }
`;

const LinkLi = styled.li`
  cursor: pointer;
  display: flex;
  align-items: start;
  gap: 0.7rem;
  padding: 0.5rem 3rem;
  justify-content: start;
  margin: 0;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    transition: background-color 0.2s ease-in-out;
  }

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const UserSection = styled.div`
  border-top: 1px solid rgba(57, 76, 96, 0.15);
  margin-top: 1rem;
  padding-top: 1rem;
  width: 100%;
  text-align: center;
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
        <Link to="/newarticle">
          <LinkLi>Post an article</LinkLi>
        </Link>
        <Link to="/topics">
          <LinkLi>Topics</LinkLi>
        </Link>
        {user.username ? (
          <UserSection>
            <Link to={`/authors/${user.username}`}>
              <LinkLi>View your articles</LinkLi>
            </Link>
            <LinkLi onClick={handleLogoutClick}>
              <div>Logout</div>
              <StyledMdLogout />
            </LinkLi>
          </UserSection>
        ) : (
          <UserSection>
            <LinkLi>
              <Link to="/users">Login</Link>
            </LinkLi>
          </UserSection>
        )}
      </LinkList>
    </StyledMenu>
  );
};

export default Menu;
