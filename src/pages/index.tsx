import "../custom-types/assets.d";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import { BLACK } from "../constant/Colors";
import Helmet from "react-helmet";
import favicon from "../assets/images/favicon.png";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { useContent } from "../technical/contentful/content";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${BLACK};
  }
`;

const Index = () => {
  const { seo } = useContent();

  return (
    <>
      <Helmet
        title={seo.title}
        link={[{ rel: "icon", href: favicon }]}
        htmlAttributes={{
          lang: "fr",
        }}
        meta={[
          {
            name: "description",
            content: seo.description,
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=0.7",
          },
          { property: "og:url", content: "http://localhost:8000" },
          { property: "og:type", content: "website" },
          { property: "og:title", content: seo.title },
          {
            property: "og:description",
            content: seo.description,
          },
          {
            property: "og:image",
            content: seo.image,
          },
          { property: "og:locale", content: "FR" },
          { property: "twitter:card", content: "summary_large_image" },
        ]}
      />
      <GlobalStyle />
    </>
  );
};

export default () => (
  <ContentProvider>
    <Index />
  </ContentProvider>
);
