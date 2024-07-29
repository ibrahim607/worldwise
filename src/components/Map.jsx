/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    console.log("URL position changed:", lat, lng);
    if (lat && lng) setMapPosition([parseFloat(lat), parseFloat(lng)]);
  }, [lat, lng]);

  useEffect(() => {
    console.log("Geo position changed:", geoPosition);
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  useEffect(() => {
    console.log("Map position updated:", mapPosition);
  }, [mapPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <DetectClick />
        <ChangeCentre position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCentre({ position }) {
  const map = useMap();
  useEffect(() => {
    console.log("ChangeCentre position updated:", position);
    map.setView(position);
  }, [position, map]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
