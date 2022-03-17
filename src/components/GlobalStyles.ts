import { createGlobalStyle } from "styled-components";
import { BACKGROUND, TEXT_LIGHT } from "../constant/Colors";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${BACKGROUND};
    color: ${TEXT_LIGHT};
  }
`;
