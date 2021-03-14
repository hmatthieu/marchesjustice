import "../../custom-types/assets.d";
import * as React from "react";
import Helmet from "react-helmet";
import favicon from "../../assets/images/favicon.png";
import { ContentProvider } from "../../technical/contentful/ContentProvider";
import { useContent } from "../../technical/contentful/content";
import { Header } from "../../section/Header";
import { Map } from "../../section/map";
import { Actions } from "../../section/Actions";
import { Footer } from "../../section/Footer";
import { ExternalProvider } from "../../technical/external-provider/ContentProvider";

const Mars28 = () => {
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
          { property: "og:url", content: "https://vraieloiclimat.fr/28mars/" },
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
      <Mars28 />
    </ExternalProvider>
  </ContentProvider>
);
