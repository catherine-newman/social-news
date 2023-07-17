import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: #ffffff;
  padding: 1.5em 0 1.5em 0;
  text-align: center;
`;

const HeaderNav = () => {
  return (
    <StyledHeader>
      <Link to="/">Home</Link>
    </StyledHeader>
  );
};

export default HeaderNav;
