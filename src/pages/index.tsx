import "../custom-types/assets.d";
import * as React from "react";
import Helmet from "react-helmet";
import favicon from "../assets/images/favicon.png";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { useContent } from "../technical/contentful/content";
import { Header } from "../section/Header";
import { Map } from "../section/map";
import { Actions } from "../section/Actions";
import { Footer } from "../section/Footer";
import { ExternalProvider } from "../technical/external-provider/ContentProvider";
import styled from "styled-components";
import { TABLET } from "../constant/Breakpoints";
import { GlobalStyles } from "../components/GlobalStyles";

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

const Avril9 = () => {
  const { seo, background } = useContent();

  return (
    <>
      <GlobalStyles />
      <Background background={background} />
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
          { property: "og:url", content: "https://marche9avril.fr/" },
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
    <ExternalProvider>
      <Avril9 />
    </ExternalProvider>
  </ContentProvider>
);
