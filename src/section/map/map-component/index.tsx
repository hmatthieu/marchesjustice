import { MapComponent, Props } from "./MapComponent";
import * as React from "react";
import { forwardRef, useEffect, useState } from "react";
import mapPlaceholder from "../../../assets/images/map-placeholder.jpg";
import styled from "styled-components";
import { Map } from "react-leaflet";

const MapPlaceholder = styled.img.attrs({ src: mapPlaceholder })`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SafeMountMapComponent = forwardRef<Map, Props>((props, ref) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return isMounted ? <MapComponent ref={ref} {...props} /> : <MapPlaceholder />;
});
