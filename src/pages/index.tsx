import "../custom-types/assets.d";
import * as React from "react";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
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
import mapPlaceholder from "../assets/images/map-placeholder.png";

const MapPlaceholder = styled.img.attrs({ src: mapPlaceholder })`
  width: 100%;
  height: 600px;
  object-fit: cover;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${BLACK};
    font-family: ${FLAMA};
  }
`;

const Index = () => {
  const { seo } = useContent();
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

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
      <Header />
      {isMounted ? <Map /> : <MapPlaceholder />}
      <Actions />
      <Footer />
    </>
  );
};

export default () => (
  <ContentProvider>
    <Index />
  </ContentProvider>
);
