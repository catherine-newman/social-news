import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { MdLogout } from "react-icons/md";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  justify-content: center;
  background: ${({ theme }) => theme.cardbackground};
  height: auto;
  color: ${({ theme }) => theme.text};
  text-align: right;
  padding: 0em 3rem 1rem 2em;
  position: absolute;
  top: 3.5em;
  right: 0;
  z-index: 9;
  font-size: 1.2em;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-200%)")};

  @media (max-width: 650px) {
    width: 100%;
    border-radius: 0;
    padding: 1rem 0 1rem 0;
    top: 3em;
  }

  @media (min-width: 651px) {
    border-radius: 0 0 0 1em;
  }

  a {
    font-size: 1.2em;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
`;

const Logout = styled.div`
  cursor: pointer;
  padding: 1rem 0;
  font-weight: bold;
  font-size: 0.8rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: end;

  @media (max-width: 650px) {
    justify-content: center;
  }
`;

const StyledMdLogout = styled(MdLogout)`
  font-size: 1.4rem;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1rem;
  justify-content: end;

  @media (max-width: 650px) {
    justify-content: center;
  }
`;

const Avatar = styled.img`
  height: 1rem;
  border-radius: 1em;
`;

const Menu = ({ open }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogoutClick = () => {
    setUser({});
  };

  return (
    <StyledMenu open={open}>
      <Link to="/users">
        {user.username ? (
          <Link to={`/authors/${user.username}`}>
            <UserInfo>
              <Avatar src={user.avatar_url} alt={user.username} />
              {user.username}
            </UserInfo>
          </Link>
        ) : (
          "Login"
        )}
      </Link>
      <Logout onClick={handleLogoutClick}>
        {user.username ? (
          <>
            <div>Logout</div>
            <StyledMdLogout />
          </>
        ) : null}
      </Logout>
    </StyledMenu>
  );
};

export default Menu;
