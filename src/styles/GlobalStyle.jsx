import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    font-family: "Jost", sans-serif;
    background-color: #cacdf7;
}

a {
    text-decoration: none;
    color: #4d5bb8;
    font-weight: 700;
}

a:hover {
    border-bottom: #4d5bb8 solid 1px;
}
`;

export default GlobalStyle;
