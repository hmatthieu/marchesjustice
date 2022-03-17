import styled from "styled-components";
import { GREEN, PINK, PURPLE, RED, YELLOW } from "../constant/Colors";

const COLORS = ["#000000", RED, PURPLE, PINK, GREEN, YELLOW];

const ColorBar = styled.div<{ reversed?: boolean }>`
  min-height: 33px;
  background: linear-gradient(
    to ${({ reversed }) => (reversed ? "left" : "right")},
    ${COLORS.map(
      (color, index) =>
        `${color} ${(index / COLORS.length) * 100}%, ${color} ${((index + 1) /
          COLORS.length) *
          100}%`
    ).join(",")}
  );
  z-index: 9999;
`;

export const TopColorBar = styled(ColorBar).attrs({
  reversed: true,
})`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

export const BottomColorBar = styled(ColorBar)`
  right: 0;
  left: 0;
`;
