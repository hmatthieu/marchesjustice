import * as React from "react";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Error } from "./Error";

interface Props {
  error?: React.ReactNode;
}

const ErroredContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

const ErrorContainer = styled.div`
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
`;

export const Errored = ({ children, error }: PropsWithChildren<Props>) => (
  <ErroredContainer>
    {children}
    <ErrorContainer>{error && <Error>{error}</Error>}</ErrorContainer>
  </ErroredContainer>
);
