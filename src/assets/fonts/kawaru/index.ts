import regular from "./Kawaru.ttf";
import { createGlobalStyle } from "styled-components";

interface Definition {
  src: string;
  weight?: number;
  italic?: true;
}

const definitions: Definition[] = [
  {
    src: regular,
  },
];

export const KAWARU = "Kawaru";

export const KawaruFontFace = createGlobalStyle`
  ${definitions
    .map(
      ({ src, weight, italic }) => `
    @font-face {
      font-family: '${KAWARU}';
      src: url('${src}');
      ${weight ? `font-weight: ${weight};` : ""}
      ${italic ? `font-style: italic;` : ""}
    }
  `
    )
    .join("")}
`;
