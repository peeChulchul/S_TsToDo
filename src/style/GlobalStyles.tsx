import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    button{
        border:none;
        background-color: transparent;
        padding:0;
    }
`;
