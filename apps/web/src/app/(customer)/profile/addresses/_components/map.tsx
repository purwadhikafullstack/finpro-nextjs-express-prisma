import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import * as React from 'react';

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import { Location } from '@/types/location';

interface MapProps {
  location: Location;
  setLocation: (location: Location) => void;
}

interface DraggableMarkerProps {
  location: Location;
  setLocation: (location: Location) => void;
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({ location, setLocation }) => {
  const markerRef = React.useRef(null);

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as any;
        if (marker)
          setLocation({
            latitude: marker.getLatLng().lat,
            longitude: marker.getLatLng().lng,
          });
      },
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [markerRef]
  );

  return (
    <Marker
      ref={markerRef}
      draggable={true}
      eventHandlers={eventHandlers}
      position={[location.latitude, location.longitude]}></Marker>
  );
};

const Map: React.FC<MapProps> = ({ location, setLocation }) => {
  const mapRef = React.useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => console.log(mapRef.current), [mapRef.current]);

  return (
    <MapContainer
      ref={mapRef}
      zoom={15}
      center={[location.latitude, location.longitude]}
      scrollWheelZoom={true}
      className='aspect-[4/3] w-full border rounded-lg'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <DraggableMarker location={location} setLocation={setLocation} />
    </MapContainer>
  );
};

export default Map;
