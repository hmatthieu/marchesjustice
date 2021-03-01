import * as React from "react";
import { useContent } from "../technical/contentful/content";
import styled from "styled-components";
import { Link as BaseLink } from "gatsby";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { TextKey } from "../technical/contentful/text";
import { FLAMA } from "../constant/Fonts";

const Link = styled(BaseLink)`
  font-family: ${FLAMA};
  font-size: 16px;
  text-decoration: underline;
`;

const HTMLFooter = styled.footer`
  max-width: 1024px;
  padding: 0 24px;
  margin: 90px auto;
`;

export const Footer = () => {
  const { texts } = useContent();

  return (
    <HTMLFooter className="text-center sm:text-left">
      <Link to="/legal">
        {documentToPlainTextString(texts[TextKey.LEGALS_CTA].document)}
      </Link>
    </HTMLFooter>
  );
};
