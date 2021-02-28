import styled from "styled-components";
import { PRIMARY } from "../constant/Colors";
import { Fonts } from "../assets/fonts";
import { Document } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import * as React from "react";

const Container = styled.div`
  color: ${PRIMARY};
  font-family: ${Fonts.KAWARU};
  font-size: 28px;
  text-align: center;
  margin-bottom: 48px;
`;

interface Props {
  document: Document;
}

export const TitleContainer = ({ document }: Props) => (
  <Container
    dangerouslySetInnerHTML={{
      __html: documentToHtmlString(document),
    }}
  />
);
