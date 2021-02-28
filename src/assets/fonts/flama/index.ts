import bold from "./Flama-Bold.otf";
import light from "./Flama-Light.otf";
import lightItalic from "./Flama-LightItalic.otf";
import medium from "./Flama-Medium.otf";
import { createGlobalStyle } from "styled-components";

interface Definition {
  src: string;
  weight?: number;
  italic?: true;
}

const definitions: Definition[] = [
  {
    src: bold,
    weight: 700,
  },
  {
    src: light,
    weight: 300,
  },
  {
    src: lightItalic,
    weight: 300,
    italic: true,
  },
  {
    src: medium,
    weight: 500,
  },
];

export const FLAMA = "Flama";

export const FlamaFontFace = createGlobalStyle`
  ${definitions
    .map(
      ({ src, weight, italic }) => `
    @font-face {
      font-family: '${FLAMA}';
      src: url('${src}');
      ${weight ? `font-weight: ${weight};` : ""}
      ${italic ? `font-style: italic;` : ""}
    }
  `
    )
    .join("")}
`;
