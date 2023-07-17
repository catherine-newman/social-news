import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  grid-area: secondary;
  overflow: auto;
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
