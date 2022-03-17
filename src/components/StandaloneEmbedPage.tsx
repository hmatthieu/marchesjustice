import { Entry } from "../technical/contentful/entry";
import { StandaloneEmbed } from "../technical/contentful/standalone";
import { useContent } from "../technical/contentful/content";
import * as React from "react";
import Helmet from "react-helmet";
import favicon from "../assets/images/favicon.png";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { ExternalProvider } from "../technical/external-provider/ContentProvider";
import styled from "styled-components";

const FullFrame = styled.iframe.attrs({
  width: "100%",
  frameBorder: 0,
})`
  height: 100vh;
`;

interface ContentProps {
  page: Entry<StandaloneEmbed>;
}

const PageContent = ({ page }: ContentProps) => {
  const { seo } = useContent();

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
      <FullFrame src={page.fields.embedUrl} />
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
