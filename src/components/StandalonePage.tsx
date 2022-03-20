import { Entry } from "../technical/contentful/entry";
import { Standalone } from "../technical/contentful/standalone";
import styled from "styled-components";
import { PRIMARY } from "../constant/Colors";
import { MONUMENT } from "../constant/Fonts";
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
import { handleCMSClick } from "../technical/handleCMSClick";
import { TABLET } from "../constant/Breakpoints";
import { BottomColorBar, TopColorBar } from "./ColorBar";
import { GlobalStyles } from "./GlobalStyles";

const Background = styled.div<{ background: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: url(${({ background }) => background});
  background-size: 175% auto;
  background-position: top;
  background-repeat: no-repeat;

  @media (min-width: ${TABLET}px) {
    background-size: contain;
  }
`;

const Container = styled.article`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const Content = styled.div`
  white-space: pre-wrap;
  font-size: 18px;

  h1 {
    color: ${PRIMARY};
    font-family: ${MONUMENT};
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

  h5 {
    font-size: 22px;
  }

  h6 {
    font-size: 20px;
  }

  p:not(:empty),
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 24px;
  }

  ul {
    padding-inline-start: 40px;
    list-style: disc;
  }

  ul + p {
    margin-top: -44px;
  }
`;

interface ContentProps {
  page: Entry<Standalone>;
}

const PageContent = ({ page }: ContentProps) => {
  const { texts, seo, logo, background } = useContent();
  const { signers } = useExternal();
  const document = page.fields.content;
  const htmlContent = useMemo(
    () =>
      documentToHtmlString(document)
        .replace(
          "{{signers_count}}",
          signers.length === 0 ? ".." : signers.length.toString()
        )
        .replace("{{signers}}", generateSignersHTML(signers))
        .replace(/{{signers\.(.*?)}}/gi, (match, matchedCategory) =>
          generateSignersHTML(
            signers.filter(
              ({ category }) =>
                category.toLowerCase() === matchedCategory.toLowerCase()
            )
          )
        ),
    [signers, document]
  );

  return (
    <>
      <GlobalStyles />
      <Background background={background} />
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
            content: `https://marche9avril.fr/${page.fields.path}`,
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
        <Link to="/">
          <ContentfulImage
            image={page.fields.logo || logo}
            className="mx-auto md:my-44 my-16 w-auto md:h-44 h-36"
          />
        </Link>
        <Content
          dangerouslySetInnerHTML={{
            __html: htmlContent,
          }}
          onClick={handleCMSClick}
        />
        {page.fields.bottomActionText && page.fields.bottomActionLink ? (
          <Button
            shadow={true}
            small={true}
            className="sm:w-auto w-full inline-flex mt-12"
            {...({
              as: "a",
              href: page.fields.bottomActionLink,
              target: "_blank",
            } as any)}
          >
            {page.fields.bottomActionText}
          </Button>
        ) : (
          <Link to="/" className="sm:w-auto w-full">
            <Button shadow={true} small={true} className="mt-12">
              {documentToPlainTextString(
                texts[TextKey.BACK_TO_HOMEPAGE].document
              )}
            </Button>
          </Link>
        )}
      </Container>
      <TopColorBar />
      <BottomColorBar />
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
