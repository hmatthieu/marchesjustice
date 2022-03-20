import * as React from "react";
import { forwardRef, useState } from "react";
import styled from "styled-components";
import {
  Map as LeafletMap,
  Marker,
  Popup as PopupLeaflet,
  TileLayer,
} from "react-leaflet";
import "./style.css";
import { BARLOW } from "../../../constant/Fonts";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

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
  font-family: ${BARLOW};
  font-weight: 500;
  font-size: 18px;
  color: black !important;
  text-decoration: underline;
  white-space: nowrap;
`;

interface Cluster {
  getChildCount: () => number;
}

const createClusterCustomIcon = (cluster: Cluster) =>
  new Icon({
    iconUrl: require("../../../assets/images/marker_multiple3.svg"),
    iconRetinaUrl: require("../../../assets/images/marker_multiple3.svg"),
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });

export interface MarkerData {
  text: string;
  href: string;
  position: [number, number];
}

export interface Props {
  markers: MarkerData[];
}

export const MapComponent = forwardRef<LeafletMap, Props>(
  ({ markers }, ref) => {
    const [markerIcon] = useState(
      new Icon({
        iconUrl: require("../../../assets/images/marker.svg"),
        iconRetinaUrl: require("../../../assets/images/marker.svg"),
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -40],
      })
    );

    return (
      <MapContainer>
        <LeafletMap
          ref={ref}
          center={[46.698481, 2.549047]}
          zoom={5}
          minZoom={4}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            subdomains="abcd"
          />
          <MarkerClusterGroup
            maxClusterRadius={30}
            iconCreateFunction={createClusterCustomIcon}
            showCoverageOnHover={false}
          >
            {markers.map((marker, index) => (
              <Marker
                key={`${marker.text}_${index}`}
                position={marker.position}
                icon={markerIcon}
              >
                <Popup>
                  <Link href={marker.href} rel="noopener" target="_blank">
                    {marker.text}
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </LeafletMap>
      </MapContainer>
    );
  }
);
