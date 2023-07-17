import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  // flex: 0 0 312px;
`;

const SecondaryNav = () => {
  return (
    <>
      <StyledNav>
        <Link to="/">Home</Link>
      </StyledNav>
    </>
  );
};

export default SecondaryNav;
