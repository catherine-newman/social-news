import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  height: auto;
  text-align: left;
  padding: 0 2em 2em 2em;
  position: absolute;
  top: 5em;
  left: 0;
  z-index: 9;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: 200px) {
    width: 100%;
  }

  a {
    font-size: 1.2em;
    text-transform: uppercase;
    padding: 1em 0;
    font-weight: bold;
    color: black;
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
