import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.mainbuttoncolor};
  border: none;
  color: #000;
  border-radius: 0.5rem;
  padding: 0.5rem 2rem;
  margin: auto;
  cursor: pointer;
  letter-spacing: 0.05rem;
  font-weight: 600;
  transition: background 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.mainbuttoncolorhover};
    transition: background 150ms ease;
  }
`;

export default Button;
