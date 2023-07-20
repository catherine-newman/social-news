import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const StyledNav = styled.nav`
  text-align: center;
  justify-self: start;
`;

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

const HeaderNav = () => {
  const { user } = useContext(UserContext);
  const { topic, article_id } = useParams();
  const navHeader = () => {
    if (article_id) {
      return <h2>{topic}</h2>;
    } else if (topic) {
      return <h1>{topic}</h1>;
    }
  };
  return (
    <StyledHeader>
      <StyledNav>
        <Link to="/">Home</Link> <Link to="/topics">Topics</Link>
      </StyledNav>
      <div>{navHeader()}</div>
      <div>
        <Link to="/users">{user.username}</Link>
      </div>
    </StyledHeader>
  );
};

export default HeaderNav;
