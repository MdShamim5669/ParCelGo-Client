import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  borderRadius: '1rem'
};

const defaultCenter = {
  lat: 23.8103, // Dhaka coordinates as default
  lng: 90.4125
};

// Custom marker icons (Optional: You can replace these with actual image URLs if you have custom icons)
const riderIcon = `data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23113236" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
const destinationIcon = `data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23c4f05b" width="36px" height="36px"><path stroke="%23113236" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;


const LiveTrackingMap = ({ riderLocation, destination }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_apiKey, // Using the API key from .env
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Calculate route between rider and destination
  useEffect(() => {
    if (isLoaded && riderLocation && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: riderLocation,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
            setDistance(result.routes[0].legs[0].distance.text);
            setDuration(result.routes[0].legs[0].duration.text);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  }, [isLoaded, riderLocation, destination]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full min-h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="loading loading-spinner text-[#3a837c] loading-lg"></span>
      </div>
    );
  }

  // If we don't have specific locations, just show a default map
  const center = riderLocation || defaultCenter;

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {/* Draw Route if directions exist */}
        {directionsResponse && (
          <DirectionsRenderer 
            directions={directionsResponse} 
            options={{
              suppressMarkers: true, // We use custom markers
              polylineOptions: {
                strokeColor: '#3a837c',
                strokeWeight: 5,
              }
            }}
          />
        )}

        {/* Rider Marker */}
        {riderLocation && (
          <Marker 
            position={riderLocation} 
            icon={{
              url: riderIcon,
              scaledSize: new window.google.maps.Size(40, 40)
            }}
            title="Rider Location"
          />
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker 
            position={destination} 
            icon={{
              url: destinationIcon,
              scaledSize: new window.google.maps.Size(40, 40)
            }}
            title="Delivery Destination"
          />
        )}
      </GoogleMap>

      {/* Info Card Overlay */}
      {distance && duration && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-4 z-10 animate-fade-in">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Est. Time</span>
            <span className="font-bold text-[#113236] text-lg">{duration}</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Distance</span>
            <span className="font-bold text-[#3a837c] text-lg">{distance}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTrackingMap;
