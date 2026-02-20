import { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create a custom blue dot marker
const blueDotIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMiIgZmlsbD0iIzAwN0FGRiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

function UserLocation({ mapRef }) {
  const getUserLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          callback([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          callback(null);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      callback(null);
    }
  };

  const watchUserLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          callback([latitude, longitude]);
        },
        (error) => {
          console.error('Error watching location:', error);
        }
      );
    }
  };

  useEffect(() => {
    watchUserLocation((location) => {
      // This will update the component with new location data
      // The location state will be managed by the parent Map component
    });
  }, []);

  // This component doesn't render anything directly
  // It provides helper functions for location tracking
  return null;
}

// Export the marker component for use in Map
export function UserLocationMarker({ userLocation }) {
  if (!userLocation) return null;

  return (
    <Marker position={userLocation} icon={blueDotIcon}>
      <Popup>
        <div>
          <p><strong>Your Location</strong></p>
          <p>{userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default UserLocation;
