import styled from "styled-components";

const Button = styled.button`
  background-color: #4d5bb8;
  border: none;
  color: white;
  border-radius: 1em;
  padding: 0.5rem 2rem;
  margin: auto;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.1s ease-in-out;

  &:hover {
    background-color: #3e4a9b;
  }
`;

export default Button;
