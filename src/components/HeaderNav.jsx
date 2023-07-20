import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User";
import Button from "./Button";
import Burger from "./Burger";
import Menu from "./Menu";

const StyledHeader = styled.header`
  display: flex;
  background-color: #ffffff;
  padding: 1.5em;
  justify-content: space-between;
  align-items: center;
  h1,
  h2 {
    font-size: 1em;
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

const HeaderNav = () => {
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
      <div ref={node}>
        {" "}
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
      <div>{navHeader()}</div>
      <div>
        <Link to="/users">{user.username ? user.username : "Login"}</Link>{" "}
        {user.username ? (
          <Button onClick={handleLogoutClick}>Logout</Button>
        ) : null}
      </div>
    </StyledHeader>
  );
};

export default HeaderNav;
