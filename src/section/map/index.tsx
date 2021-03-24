import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import { EventForm } from "./Form";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import styled from "styled-components";
import { Map as LeafletMap } from "react-leaflet";
import { Button } from "../../components/Button";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Share } from "./Share";
import { TitleContainer } from "../../components/TitleContainer";
import { useExternal } from "../../technical/external-provider/content";
import { SafeMountMapComponent } from "./map-component";
import { MarkerData } from "./map-component/MapComponent";

const Section = styled.section`
  margin-bottom: 124px;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  min-height: 600px;
`;

const FormContainer = styled.div`
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  position: absolute;
  transform: translateY(-80%);
`;

const CTAContainer = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: 9999;
  bottom: 50px;
  left: 0;
  right: 0;
  padding: 0 46px;
  display: flex;
`;

interface PositionStackData {
  data: [
    {
      latitude: number;
      longitude: number;
      country_code: string;
    }
  ];
}

async function fetchPosition(postalCode: string) {
  const response = await fetch(
    "https://us-central1-loi-climat.cloudfunctions.net/forwards",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postalCode,
      }),
    }
  );
  if (response.status === 200) {
    const { data }: PositionStackData = await response.json();
    return data.filter(({ country_code }) => country_code === "FRA")[0];
  } else {
    throw new Error(response.statusText);
  }
}

export const Map = () => {
  const { texts } = useContent();
  const { events } = useExternal();
  const markers = useMemo<MarkerData[]>(
    () =>
      events.map(event => ({
        text: event.city,
        href: event.URL,
        position: event.position,
      })),
    [events]
  );
  const mapRef = useRef<LeafletMap>(null);
  const handlePostalCode = useCallback(async (postalCode: string) => {
    const currentMap = mapRef.current;
    if (!currentMap) {
      return;
    }
    try {
      const position = await fetchPosition(postalCode);
      currentMap.leafletElement.flyTo(
        {
          lat: position.latitude,
          lng: position.longitude,
        },
        10
      );
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const countReplace = useMemo(
    () => ({
      "{{count}}": markers.length > 0 ? markers.length.toString() : "..",
    }),
    [markers]
  );

  return (
    <Section>
      <TitleContainer
        document={texts[TextKey.MAP_HEADER].document}
        replaces={countReplace}
      />
      <EventForm
        className="block md:hidden"
        onSubmitPostalCode={handlePostalCode}
      />
      <Container className="mt-0 md:mt-80">
        <FormContainer className="hidden md:block">
          <EventForm onSubmitPostalCode={handlePostalCode} />
        </FormContainer>
        <SafeMountMapComponent markers={markers} />
        <CTAContainer>
          <Button
            {...({
              href: texts[TextKey.MAP_CTA].href,
              target: "_blank",
              as: "a",
              shadow: true,
              rel: "noopener",
            } as any)}
            className="sm:w-auto w-full"
          >
            {documentToPlainTextString(texts[TextKey.MAP_CTA].document)}
          </Button>
        </CTAContainer>
      </Container>
      <Share />
    </Section>
  );
};
