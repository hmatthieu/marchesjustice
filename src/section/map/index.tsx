import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EventForm } from "./Form";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import styled from "styled-components";
import { MapComponent } from "./map-component";
import { Map as LeafletMap } from "react-leaflet";
import { Button } from "../../components/Button";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Share } from "./Share";
import { TitleContainer } from "../../components/TitleContainer";
import { TABLET } from "../../constant/Breakpoints";

const Section = styled.section`
  margin-bottom: 124px;
`;

const Container = styled.div<{ smallScreen: boolean }>`
  ${({ smallScreen }) =>
    !smallScreen &&
    `
    margin-top: 350px;
  `}
  position: relative;
  width: 100%;
  height: 600px;
`;

const FormContainer = styled.div<{ smallScreen: boolean }>`
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
  position: absolute;
  z-index: 9999;
  left: 46px;
  bottom: 50px;
`;

interface PositionStackData {
  data: [
    {
      latitude: number;
      longitude: number;
    }
  ];
}

function isSmallScreen() {
  return typeof window !== "undefined" && window.innerWidth < TABLET;
}

async function fetchPosition(postalCode: string) {
  const response = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_API_KEY}&query=${postalCode}&limit=1`
  );
  if (response.status === 200) {
    const {
      data: [position],
    }: PositionStackData = await response.json();
    return position;
  } else {
    throw new Error(response.statusText);
  }
}

export const Map = () => {
  const { texts } = useContent();
  const mapRef = useRef<LeafletMap>(null);
  const handlePostalCode = useCallback(async (postalCode: string) => {
    const currentMap = mapRef.current;
    if (!currentMap) {
      return;
    }
    try {
      const position = await fetchPosition(postalCode);
      currentMap.leafletElement.setView(
        {
          lat: position.latitude,
          lng: position.longitude,
        },
        12
      );
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const [smallScreen, setSmallScreen] = useState(isSmallScreen());

  useEffect(() => {
    setSmallScreen(isSmallScreen());
  }, [setSmallScreen]);

  return (
    <Section>
      <TitleContainer document={texts[TextKey.MAP_HEADER].document} />
      {smallScreen && <EventForm onSubmitPostalCode={handlePostalCode} />}
      <Container smallScreen={smallScreen}>
        {!smallScreen && (
          <FormContainer smallScreen={smallScreen}>
            <EventForm onSubmitPostalCode={handlePostalCode} />
          </FormContainer>
        )}
        <MapComponent ref={mapRef} />
        <CTAContainer>
          <Button
            {...({
              href: texts[TextKey.MAP_CTA].href,
              target: "_blank",
              as: "a",
              shadow: true,
            } as any)}
          >
            {documentToPlainTextString(texts[TextKey.MAP_CTA].document)}
          </Button>
        </CTAContainer>
      </Container>
      <Share />
    </Section>
  );
};
