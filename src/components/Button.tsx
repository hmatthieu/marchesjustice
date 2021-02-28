import * as React from "react";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { rotate } from "./rotate";
import { Loading as LoadingIcon } from "../assets/images/Loading";
import { Fonts } from "../assets/fonts";
import { PRIMARY } from "../constant/Colors";

const Loading = styled(LoadingIcon)`
  height: 40px;
  animation: 1s ${rotate} infinite linear;
  color: white;
  margin-right: 12px;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY};
  outline: none;
  border: none;
  box-shadow: none;
  text-decoration: none;
  color: white;
  font-family: ${Fonts.KAWARU};
  font-size: 18px;
  height: 60px;
  text-align: center;
  border-radius: 3px;
  padding: 0 24px;

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
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
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
