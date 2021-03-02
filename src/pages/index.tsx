import "../custom-types/assets.d";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import { BLACK } from "../constant/Colors";
import Helmet from "react-helmet";
import favicon from "../assets/images/favicon.png";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { useContent } from "../technical/contentful/content";
import { Header } from "../section/Header";
import { FLAMA } from "../constant/Fonts";
import { Map } from "../section/map";
import { Actions } from "../section/Actions";
import { Footer } from "../section/Footer";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${BLACK};
    font-family: ${FLAMA};
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
          { property: "og:url", content: "https://loi-climat.web.app" },
          { property: "og:type", content: "website" },
          { property: "og:title", content: seo.title },
          {
            property: "og:description",
            content: seo.description,
          },
          {
            property: "og:image",
            content: `https:${seo.image}`,
          },
          { property: "og:locale", content: "FR" },
          { property: "twitter:card", content: "summary_large_image" },
        ]}
      />
      <GlobalStyle />
      <Header />
      <Map />
      {false && <Actions /> // Let's hide actions for now...
      }
      <Footer />
    </>
  );
};

export default () => (
  <ContentProvider>
    <Index />
  </ContentProvider>
);
