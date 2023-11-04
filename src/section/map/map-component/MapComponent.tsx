import * as React from "react";
import { forwardRef, useState } from "react";
import styled from "styled-components";
import { Map as LeafletMap, Marker, Popup as PopupLeaflet, TileLayer, } from "react-leaflet";
import "./style.css";
import { BOWLBY, KLIMA } from "../../../constant/Fonts";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import moment from 'moment';
import 'moment/locale/fr'

moment.locale('fr');

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
    margin: 5px 20px 24px 11px;
    
    p {
      margin: 0;
    }
  }

  .leaflet-popup-close-button {
    display: none;
  }
`;

const City = styled.p`
  font-family: ${BOWLBY};
  font-weight: 400;
  line-height: 34px;
  font-size: 22px;
  color: black !important;
  white-space: nowrap;
`;

const Text = styled.p`
  font-family: ${KLIMA};
  font-weight: 400;
  line-height: 14px;
  font-size: 12px;
  color: black !important;
  white-space: nowrap;
  margin: 2px 0;
`;

const Link = styled.a`
  text-decoration: underline;
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
  city: string;
  date: string;
  when: string;
  where: string;
  subject?: string,
  href?: string;
  position: [number, number];
}

export interface Props {
  markers: MarkerData[];
}

export const MapComponent = forwardRef<LeafletMap, Props>(
  ({ markers  }, ref) => {
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
                key={`${marker.where}_${index}`}
                position={marker.position}
                icon={markerIcon}
              >
                <Popup>
                  <City>{marker.city}</City>
                  {marker.subject && (
                    <Text style={{ fontWeight: 600 }}>{marker.subject}</Text>
                  )}
                  <Text>{marker.where}</Text>
                  <Text>{marker.when}</Text>
                  {marker.href && (
                    <Link href={marker.href} rel="noopener" target="_blank">
                      <Text>Lire l’appel →</Text>
                    </Link>
                  )}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </LeafletMap>
      </MapContainer>
    );
  }
);
