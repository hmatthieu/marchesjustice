import * as React from "react";
import { Logo as BaseLogo } from "../assets/images/Logo";
import styled from "styled-components";
import { PRIMARY } from "../constant/Colors";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useContent } from "../technical/contentful/content";
import { TextKey } from "../technical/contentful/text";

const Container = styled.header`
  max-width: 1024px;
  margin: 0 auto;
`;

const Logo = styled(BaseLogo)`
  color: ${PRIMARY};
`;

const TextContainer = styled.div`
  text-align: center;
  text-size: 18px;

  p {
    margin: 2rem 0;
  }

  p:first-child {
    margin-top: 3rem;
  }

  p:last-child {
    margin-bottom: 3rem;
  }

  a {
    text-decoration: underline;
    font-weight: bold;
  }
`;

export const Header = () => {
  const { texts } = useContent();

  return (
    <Container>
      <Logo className="mx-auto mt-24 w-64" />
      <TextContainer
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(texts[TextKey.HEADER]),
        }}
      />
    </Container>
  );
};
