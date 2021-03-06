import * as React from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useContent } from "../technical/contentful/content";
import { TextKey } from "../technical/contentful/text";
import { ContentfulImage } from "../components/ContentfulImage";

const Container = styled.header`
  max-width: 800px;
  padding: 0 24px;
  margin: 0 auto;
`;

const TextContainer = styled.div`
  text-align: center;
  font-size: 18px;

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
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { texts, logo } = useContent();

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.querySelectorAll("a").forEach(element => {
        element.target = "_blank";
      });
    }
  }, []);

  return (
    <Container>
      <ContentfulImage image={logo} className="mx-auto mt-12 w-auto h-52" />
      <TextContainer
        ref={textContainerRef}
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(texts[TextKey.HEADER].document),
        }}
      />
    </Container>
  );
};
