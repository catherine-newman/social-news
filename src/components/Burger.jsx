import styled from "styled-components";
import VisuallyHidden from "./VisuallyHidden";

const StyledBurger = styled.button`
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.cardborder};
    border-radius: 10px;
    transition: all 0.1s linear;
    position: relative;
    transform-origin: 1px;

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(3) {
      opacity: ${({ open }) => (open ? "0" : "1")};
    }

    &:nth-child(4) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)} aria-hidden="true">
      <VisuallyHidden>Burger Menu Icon</VisuallyHidden>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
