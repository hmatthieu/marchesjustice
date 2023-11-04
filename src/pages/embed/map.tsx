import { useExternal } from "../../technical/external-provider/content";
import * as React from "react";
import { useMemo } from "react";
import { MarkerData } from "../../section/map/map-component/MapComponent";
import { SafeMountMapComponent } from "../../section/map/map-component";
import { ContentProvider } from "../../technical/contentful/ContentProvider";
import { ExternalProvider } from "../../technical/external-provider/ContentProvider";
import Helmet from "react-helmet";
import { useContent } from "../../technical/contentful/content";
import favicon from "../../assets/images/favicon.png";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  min-height: 600px;
`;

const EmbedMap = () => {
  const { seo } = useContent();
  const { events } = useExternal();
  const markers = useMemo<MarkerData[]>(
    () =>
      events.map(event => ({
        city: event.city,
        date: event.date,
        where: event.where,
        when: event.when,
        subject: event.subject,
        href: event.URL,
        position: event.position,
      })),
    [events]
  );

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
            name: "robots",
            content: "noindex",
          },
          {
            name: "googlebot",
            content: "noindex",
          },
          {
            name: "description",
            content: seo.description,
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=0.7",
          },
          { property: "og:url", content: "https://marche9avril.fr" },
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
      <Container>
        <SafeMountMapComponent markers={markers} />
      </Container>
    </>
  );
};

export default () => (
  <ContentProvider>
    <ExternalProvider>
      <EmbedMap />
    </ExternalProvider>
  </ContentProvider>
);
