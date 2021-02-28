import * as React from "react";
import { HTMLProps } from "react";
import styled from "styled-components";
import { Check } from "../../assets/images/Check";

export const CheckableContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  cursor: pointer;
  padding: 5px 0;
  outline: none;

  input[type="checkbox"] + div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #e9e9e9;
    transition: all 0.3s ease;
  }

  input[type="checkbox"] + div > svg {
    height: 10px;
    width: 10px;
    visibility: hidden;
  }

  input[type="checkbox"] + div:hover {
    border: 1px solid #9ca3af;
  }
  input[type="checkbox"]:checked + div {
    border: none;
  }

  input[type="checkbox"]:checked + div > svg {
    visibility: visible;
    height: 20px;
    width: 20px;
  }
`;

export const InvisibleInput = styled.input`
  display: none;
`;

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  onBlur?: (event?: React.FocusEvent) => void;
  onFocus?: (event?: React.FocusEvent) => void;
}

export const Checkbox = ({
  onFocus,
  onBlur,
  className,
  ...props
}: CheckboxProps) => (
  <CheckableContainer
    className={className}
    tabIndex={0}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    <InvisibleInput {...(props as any)} />
    <div>
      <Check />
    </div>
  </CheckableContainer>
);
