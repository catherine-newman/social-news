import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    font-family: "Jost", sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.50s linear;
}

a {
    text-decoration: underline;
    color: ${({ theme }) => theme.text};
}
`;

export default GlobalStyle;
