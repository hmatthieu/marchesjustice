import * as React from "react";
import { useContent } from "../technical/contentful/content";
import styled from "styled-components";
import { Link as BaseLink } from "gatsby";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { TextKey } from "../technical/contentful/text";

const Link = styled(BaseLink)`
  font-family: Roboto;
  font-size: 16px;
  text-decoration: underline;
`;

const HTMLFooter = styled.footer`
  margin: 90px 125px;
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
