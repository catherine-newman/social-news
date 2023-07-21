import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.mainbuttoncolor};
  border: none;
  color: #000;
  border-radius: 1em;
  padding: 0.5rem 2rem;
  margin: auto;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  transition: background 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.mainbuttoncolorhover};
    transition: background 150ms ease;
  }
`;

export default Button;
