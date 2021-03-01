import * as React from "react";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { rotate } from "./rotate";
import { Loading as LoadingIcon } from "../assets/images/Loading";
import { FLAMA, KAWARU } from "../constant/Fonts";
import { PRIMARY } from "../constant/Colors";

const Loading = styled(LoadingIcon)`
  height: 40px;
  animation: 1s ${rotate} infinite linear;
  color: white;
  margin-right: 12px;
`;

interface ButtonBaseProps {
  shadow?: boolean;
  small?: boolean;
}

const BaseButton = styled.button<ButtonBaseProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY};
  outline: none;
  border: none;
  box-shadow: none;
  text-decoration: none;
  color: white;
  font-size: 18px;
  height: 60px;
  text-align: center;
  border-radius: 3px;
  padding: 0 24px;

  ${({ small }: ButtonBaseProps) =>
    small
      ? `
      
    font-family: ${FLAMA};
    font-style: normal;
    font-weight: 700;
    text-transform: none;
    `
      : `
      font-family: ${KAWARU};
      text-transform: uppercase;
    `}

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
