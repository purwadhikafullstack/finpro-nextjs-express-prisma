import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import * as React from 'react';

import { LatLngLiteral, LeafletEvent } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import { Location } from '@/types/location';
import { map } from 'cypress/types/bluebird';

interface MapProps {
  location: Location;
  setLocation: (location: Location) => void;
}

interface DraggableMarkerProps {
  location: Location;
  mapRef: React.RefObject<any>;
  setLocation: (location: Location) => void;
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({ location, setLocation, mapRef }) => {
  const markerRef = React.useRef(null);

  // const eventHandlers = React.useMemo(
  //   () => ({
  //     dragend() {
  //       const marker = markerRef.current as any;
  //       if (marker) {
  //         setLocation({
  //           latitude: marker.getLatLng().lat,
  //           longitude: marker.getLatLng().lng,
  //         });
  //       }
  //     },
  //   }),

  //   [markerRef, setLocation]
  // );

  return <Marker ref={markerRef} position={[location.latitude, location.longitude]}></Marker>;
};

interface MapEventProps {
  handleClick: (lngLat: LatLngLiteral) => void;
  handleLocationFound: (lngLat: LatLngLiteral) => void;
}

const MapEvent: React.FC<MapEventProps> = ({ handleClick, handleLocationFound }) => {
  useMapEvents({
    click: (e) => {
      handleClick(e.latlng);
    },
    update: (e) => {
      handleLocationFound(e.target.getCenter());
    },
  });

  return null;
};

const Map: React.FC<MapProps> = ({ location, setLocation }) => {
  const [mapRef, setMapRef] = React.useState<any>(null);

  const handleClick = (latlng: LatLngLiteral) => {
    setLocation({
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
  };

  React.useEffect(() => {
    if (mapRef) {
      mapRef.flyTo([location.latitude, location.longitude], 15);
    }
  }, [mapRef, location]);

  return (
    <MapContainer
      zoom={15}
      ref={setMapRef}
      center={[location.latitude, location.longitude]}
      scrollWheelZoom={true}
      className='aspect-[4/3] w-full border rounded-lg'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* <DraggableMarker location={location} setLocation={setLocation} mapRef={mapRef} /> */}
      <Marker position={[location.latitude, location.longitude]}></Marker>
      <MapEvent handleClick={handleClick} handleLocationFound={handleClick} />
    </MapContainer>
  );
};

export default Map;
