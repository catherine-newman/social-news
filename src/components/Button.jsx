import styled from "styled-components";

const Button = styled.button`
  background-color: #4d5bb8;
  border: none;
  color: white;
  border-radius: 1em;
  padding: 0.5em 2em 0.5em 2em;
  margin: auto;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    background-color: #3e4a9b;
  }
`;

export default Button;
