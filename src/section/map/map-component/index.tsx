import * as React from "react";
import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Map as LeafletMap,
  Marker,
  Popup as PopupLeaflet,
  TileLayer,
} from "react-leaflet";
import { base, EVENTS, EVENTS_PUBLIC } from "../../../technical/airtable";
import "./style.css";
import { Fonts } from "../../../assets/fonts";
import { Icon } from "leaflet";

const markerIcon = new Icon({
  iconUrl: require("../../../assets/images/marker.svg"),
  iconRetinaUrl: require("../../../assets/images/marker.svg"),
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  user-select: none;
`;

const Popup = styled(PopupLeaflet)`
  text-align: center;

  .leaflet-popup-content-wrapper {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    transform: translateX(-20%);
  }

  .leaflet-popup-content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 14px 35px;
  }

  .leaflet-popup-close-button {
    display: none;
  }
`;

const Link = styled.a`
  font-family: ${Fonts.FLAMA};
  font-weight: 500;
  font-size: 22px;
  color: black !important;
  text-decoration: underline;
  white-space: nowrap;
`;

interface MarkerData {
  text: string;
  href: string;
  position: [number, number];
}

function fetchAllMarkers(): Promise<MarkerData[]> {
  return new Promise((resolve, reject) => {
    const markers: MarkerData[] = [];
    base(EVENTS)
      .select({
        view: EVENTS_PUBLIC,
      })
      .eachPage(
        (records, fetchNextPage) => {
          markers.push(
            ...records.map(record => ({
              text: record.get("Ville"),
              href: record.get("URL"),
              position: [record.get("Latitude"), record.get("Longitude")],
            }))
          );

          fetchNextPage();
        },
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(markers);
          }
        }
      );
  });
}

export const MapComponent = forwardRef<LeafletMap>((_, ref) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    fetchAllMarkers().then(setMarkers);
  }, []);

  return (
    <MapContainer>
      <LeafletMap
        ref={ref}
        center={[46.698481, 2.549047]}
        zoom={5}
        minZoom={4}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker
            key={`${marker.text}_${index}`}
            position={marker.position}
            icon={markerIcon}
          >
            <Popup>
              <Link href={marker.href}>{marker.text}</Link>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </MapContainer>
  );
});
