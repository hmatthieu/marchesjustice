import { Entry } from "../technical/contentful/entry";
import { Standalone } from "../technical/contentful/standalone";
import styled from "styled-components";
import { PRIMARY } from "../constant/Colors";
import { KAWARU } from "../constant/Fonts";
import { useContent } from "../technical/contentful/content";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { TextKey } from "../technical/contentful/text";
import { Link } from "gatsby";
import { Button } from "./Button";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import * as React from "react";
import { useMemo } from "react";
import Helmet from "react-helmet";
import favicon from "../assets/images/favicon.png";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { ExternalProvider } from "../technical/external-provider/ContentProvider";
import { useExternal } from "../technical/external-provider/content";
import { generateSignersHTML } from "../technical/generateSignersHTML";
import { ContentfulImage } from "./ContentfulImage";

const Container = styled.article`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const Content = styled.div`
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
    font-size: 18px;
  }

  h4 {
    color: ${PRIMARY};
    margin-bottom: 24px;
  }

  p {
    margin: 24px 0;
  }

  ul {
    padding-inline-start: 40px;
    list-style: disc;
  }
`;

interface ContentProps {
  page: Entry<Standalone>;
}

const PageContent = ({ page }: ContentProps) => {
  const { texts, seo, logo } = useContent();
  const { signers } = useExternal();
  const document = page.fields.content;
  const htmlContent = useMemo(
    () =>
      documentToHtmlString(document).replace(
        "{{signers}}",
        generateSignersHTML(signers)
      ),
    [signers, document]
  );

  return (
    <>
      <Helmet
        title={page.fields.title || seo.title}
        link={[{ rel: "icon", href: favicon }]}
        htmlAttributes={{
          lang: "fr",
        }}
        meta={[
          {
            name: "description",
            content: page.fields.description || seo.description,
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=0.7",
          },
          {
            property: "og:url",
            content: `https://vraieloiclimat.fr/${page.fields.path}`,
          },
          { property: "og:type", content: "website" },
          { property: "og:title", content: page.fields.title || seo.title },
          {
            property: "og:description",
            content: page.fields.description || seo.description,
          },
          {
            property: "og:image",
            content: `https:${page.fields.image || seo.image}`,
          },
          { property: "og:locale", content: "FR" },
          { property: "twitter:card", content: "summary_large_image" },
        ]}
      />
      <Container>
        <ContentfulImage image={logo} className="mb-12 w-auto h-52" />
        <Content
          dangerouslySetInnerHTML={{
            __html: htmlContent,
          }}
        />
        {page.fields.bottomActionText && page.fields.bottomActionLink ? (
          <Button
            shadow={true}
            small={true}
            className="sm:w-auto w-full"
            {...({
              as: "a",
              href: page.fields.bottomActionLink,
              target: "_blank",
            } as any)}
          >
            {page.fields.bottomActionText}
          </Button>
        ) : (
          <Link to="/">
            <Button shadow={true} small={true} className="sm:w-auto w-full">
              {documentToPlainTextString(
                texts[TextKey.BACK_TO_HOMEPAGE].document
              )}
            </Button>
          </Link>
        )}
      </Container>
    </>
  );
};

interface Props {
  pageContext: ContentProps;
}

export default ({ pageContext: { page } }: Props) => (
  <ContentProvider>
    <ExternalProvider>
      <PageContent page={page} />
    </ExternalProvider>
  </ContentProvider>
);
