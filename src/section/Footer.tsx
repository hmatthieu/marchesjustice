import * as React from "react";
import { useContent } from "../technical/contentful/content";
import styled from "styled-components";
import { Link as BaseLink } from "gatsby";
import { KLIMA } from "../constant/Fonts";

const Link = styled(BaseLink)`
  font-family: ${KLIMA};
  font-size: 16px;
  text-decoration: underline;
`;

const HTMLFooter = styled.footer`
  max-width: 1024px;
  padding: 0 24px;
  margin: 90px auto;
`;

const Text = styled.p`
  font-family: ${KLIMA};
  font-size: 18px;
  color: #8D8787;
`;

export const Footer = () => {
  const { texts } = useContent();

  return (
    <HTMLFooter className="text-center sm:text-left">
      <Text>
        Ce site est à l'initiative du cadre unitaire autour de l'appel à la marche du 23 septembre
      </Text>
      {/*
        <Link to="/legal">
        {documentToPlainTextString(texts[TextKey.LEGALS_CTA].document)}
      </Link>
      */}
    </HTMLFooter>
  );
};
