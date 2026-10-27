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

function toMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function isBuildingOpen(openingTimes, now = new Date()) {
  if (!openingTimes) return true;

  const todayHours = openingTimes[now.getDay()];
  if (!todayHours || !todayHours[0] || !todayHours[1]) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = toMinutes(todayHours[0]);
  const closeMinutes = toMinutes(todayHours[1]);

  if (closeMinutes <= openMinutes) {
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

// Haversine distance in meters between two [lat, lng] points
function distanceMeters([lat1, lng1], [lat2, lng2]) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function formatDistance(meters) {
  const feet = meters * 3.28084;
  if (feet < 1000) return `${Math.round(feet)} ft`;
  return `${(meters / 1609.344).toFixed(1)} mi`;
}

function getNearestOpenMachines(userLocation, machines, count = 3) {
  if (!userLocation || !machines) return [];
  const now = new Date();

  return machines
    .filter((m) => m.position && isBuildingOpen(m.openingTimes, now))
    .map((m) => ({ ...m, distance: distanceMeters(userLocation, m.position) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}

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
    });
  }, []);

  return null;
}

// Export the marker component for use in Map
export function UserLocationMarker({ userLocation, machines }) {
  const nearest = useMemo(
    () => getNearestOpenMachines(userLocation, machines, 3),
    [userLocation, machines]
  );
  if (!userLocation) return null;

  return (
    <Marker position={userLocation} icon={blueDotIcon}>
      <Popup>
        <div>
          <p><strong>Nearest Vending Machines</strong></p>
            {nearest.length === 0 ? (
            <p>No open vending machines found nearby.</p>
          ) : (
            <ol style={{ paddingBottom: "0.5em", paddingLeft: "1.2em", margin: 0 }}>
              {nearest.map((m, i) => (
                <li key={m.id ?? i}>
                  {m.name || "Vending Machine"} ({formatDistance(m.distance)})
                </li>
              ))}
            </ol>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export default UserLocation;
