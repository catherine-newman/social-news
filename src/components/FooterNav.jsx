import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: magenta;
`;

const FooterNav = () => {
  return (
    <>
      <Footer>
        <Link to="/">Home</Link>
      </Footer>
    </>
  );
};

export default FooterNav;
