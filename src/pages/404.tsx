import * as React from "react";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { useContent } from "../technical/contentful/content";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { TextKey } from "../technical/contentful/text";
import { Button } from "../components/Button";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Link } from "gatsby";
import styled from "styled-components";
import { PRIMARY } from "../constant/Colors";
import { KAWARU } from "../constant/Fonts";

const Container = styled.article`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const NoContent = styled.div`
  h1 {
    color: ${PRIMARY};
    font-family: ${KAWARU};
    text-transform: uppercase;
    font-size: 28px;
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
  }

  h3 {
    color: ${PRIMARY};
    margin-bottom: 24px;
  }

  p {
    margin-bottom: 24px;
  }
`;

export const NotFound = () => {
  const { texts } = useContent();

  return (
    <Container>
      <NoContent
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(texts[TextKey.NOT_FOUND].document),
        }}
      />
      <Link to="/">
        <Button shadow={true} small={true} className="sm:w-auto w-full">
          {documentToPlainTextString(texts[TextKey.BACK_TO_HOMEPAGE].document)}
        </Button>
      </Link>
    </Container>
  );
};

export default () => (
  <ContentProvider>
    <NotFound />
  </ContentProvider>
);
