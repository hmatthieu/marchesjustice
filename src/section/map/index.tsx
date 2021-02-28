import * as React from "react";
import { useCallback, useRef } from "react";
import { EventForm } from "./Form";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import styled from "styled-components";
import { PRIMARY } from "../../constant/Colors";
import { Fonts } from "../../assets/fonts";
import { MapComponent } from "./map-component";
import { Map as LeafletMap } from "react-leaflet";
import { Button } from "../../components/Button";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const HeaderContainer = styled.div`
  color: ${PRIMARY};
  font-family: ${Fonts.KAWARU};
  font-size: 28px;
  text-align: center;
  margin-bottom: 64px;
`;

const MapContainer = styled.div`
  position: relative;
  margin-top: 400px;
`;

const FormContainer = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  transform: translateY(-80%);
  pointer-events: none;
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

  return (
    <section>
      <HeaderContainer
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(texts[TextKey.MAP_HEADER].document),
        }}
      />
      <MapContainer>
        {typeof window === "undefined" ? (
          <p>Hello World</p>
        ) : (
          <MapComponent ref={mapRef} />
        )}
        <FormContainer>
          <EventForm onSubmitPostalCode={handlePostalCode} />
        </FormContainer>
        <CTAContainer>
          <Button
            {...({
              href: texts[TextKey.MAP_CTA].href,
              target: "_blank",
              as: "a",
            } as any)}
          >
            {documentToPlainTextString(texts[TextKey.MAP_CTA].document)}
          </Button>
        </CTAContainer>
      </MapContainer>
    </section>
  );
};
