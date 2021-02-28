import * as React from "react";
import styled from "styled-components";

interface Props {
  error?: boolean;
}

export const Text = styled.input<Props>`
  width: 100%;
  background: #e9e9e9;
  border-radius: 3px;
  padding: 18px 14px;
  outline: none;

  :invalid {
    box-shadow: none;
  }
`;
