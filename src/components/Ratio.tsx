import * as React from "react";
import styled from "styled-components";

interface Props {
  ratio: number;
}

const Container = styled.div<Props>`
  position: relative;
  padding-bottom: ${({ ratio }) => 100 / ratio}%;
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

export const Ratio: React.FunctionComponent<Props> = ({ ratio, children }) => (
  <Container ratio={ratio}>
    <Content>{children}</Content>
  </Container>
);
