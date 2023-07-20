import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  height: auto;
  color: ${({ theme }) => theme.text};
  text-align: left;
  padding: 0 2rem 2rem 2em;
  position: absolute;
  top: 5em;
  left: 0;
  z-index: 9;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: 200px) {
    width: 100%;
  }

  a {
    font-size: 1.2em;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    text-decoration: none;

    @media (max-width: 200px) {
      text-align: center;
    }
  }
`;

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/">Home</Link>
      <Link to="/topics">Topics</Link>
    </StyledMenu>
  );
};

export default Menu;
