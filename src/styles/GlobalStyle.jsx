import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    font-family: "Jost", sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: color 350ms ease, background 350ms ease;
}

a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
}
`;

export default GlobalStyle;
