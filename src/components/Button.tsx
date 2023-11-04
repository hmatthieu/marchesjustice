import * as React from "react";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { rotate } from "./rotate";
import { Loading as LoadingIcon } from "../assets/images/Loading";
import { BOWLBY } from "../constant/Fonts";
import { PRIMARY, TEXT_DARK } from "../constant/Colors";

const Loading = styled(LoadingIcon)`
  height: 40px;
  animation: 1s ${rotate} infinite linear;
  color: ${TEXT_DARK};
  margin-right: 12px;
`;

interface ButtonBaseProps {
  backgroundColor?: string;
  shadow?: boolean;
  small?: boolean;
}

const BaseButton = styled.button<ButtonBaseProps>`
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor || PRIMARY};
  color: ${TEXT_DARK};
  outline: none;
  border: none;
  box-shadow: none;
  text-decoration: none;
  font-size: 18px;
  height: 60px;
  text-align: center;
  border-radius: 3px;
  padding: 0 24px;
  min-width: 16rem;
  font-family: ${BOWLBY};
  text-transform: uppercase;

  ${({ shadow }: ButtonBaseProps) =>
    shadow && `box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);`}
    :focus {
    border: none;
    outline: none;
  }

  :active {
    border: none;
    outline: none;
    text-decoration: underline;
  }

  :disabled {
    border: none;
    background-color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

const TextContainer = styled.div`
  position: relative;
`;

const LoadingContainer = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-100%, -50%);
`;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonBaseProps {
  loading?: boolean;
}

export const Button = ({ loading, children, ...props }: ButtonProps) => (
  <BaseButton disabled={loading} {...props}>
    <TextContainer>
      <LoadingContainer>{loading && <Loading />}</LoadingContainer>
      {children}
    </TextContainer>
  </BaseButton>
);
