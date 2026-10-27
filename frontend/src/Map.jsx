import { useState, useEffect, useRef, useMemo } from 'react'
import './Map.css'
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";
import BottomBar from './components/BottomBar'
import MapControls from './components/MapControls'
import { UserLocationMarker } from './components/UserLocation'
import VendingMachineMarker from './components/Marker';

function Map() {
  const [vendingMachines, setVendingMachines] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({}); // Store references to markers

  useEffect(() => {
    fetch('http://localhost:5000/') // This is your backend server address
      .then(res => res.text())
      .then(data => setApiStatus(data))
      .catch(err => setApiStatus('Connection failed: ' + err.message));
  }, []);
  const markerRefs = useRef(new globalThis.Map());
  const buildings = [...new Set(
    vendingMachines
      .map((machine) => machine.location?.building)
      .filter(Boolean),
  )];

  useEffect(() => {
    fetch('http://localhost:5000/getInfo') // This is your backend server address
      .then(res => res.json())
      .then(data => setVendingMachines(data))
      .catch(err => console.error('Failed to fetch info:', err));
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );

      // Watch for location changes
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error watching location:', error);
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleBuildingSelect = (building) => {
    const machine = vendingMachines.find(
      (item) => item.location?.building === building,
    );
    const coordinates = machine?.location?.geolocation?.coordinates;

    if (!machine || !mapRef.current || !Array.isArray(coordinates) || coordinates.length < 2) {
      console.error(`Unable to navigate to building "${building}": coordinates are unavailable.`);
      return;
    }

    const position = [coordinates[0], coordinates[1]];
    mapRef.current.flyTo(position, 18);
    markerRefs.current.get(building)?.openPopup();
  };

  const handleRecenter = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 18);
      console.log('Recentering to:', userLocation);
    } else {
      console.log('User location not available');
    }
  };

  const handleMapKeyClick = () => {
    console.log('Map key clicked');
  };

  const handleHelpClick = () => {
    console.log('Help clicked');
  };

  const nearbyCandidates = useMemo(
  () =>
    vendingMachines
      .filter((m) => m.location?.geolocation?.coordinates)
      .map((m) => ({
        id: m._id,
        name: m.location.building,
        position: [
          m.location.geolocation.coordinates[0],
          m.location.geolocation.coordinates[1],
        ],
        openingTimes: m.location.opening_times,
      })),
    [vendingMachines]
  );

  return (
    <>
      <div className="logo-title">
        <img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/MunchiMaps%20Logos/MunchiMapsCroppedLogo.png?raw=true" alt="MunchiMaps" />
      </div>
      <div id="map-container">
        <MapContainer ref={mapRef} center={[42.729014, -73.676728]} zoom={15} scrollWheelZoom={true} zoomControl={false} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UserLocationMarker userLocation={userLocation} machines={nearbyCandidates} mapRef={mapRef} markerRefs={markerRefs} />
          {vendingMachines.map((machine, index) => (
            <VendingMachineMarker
              key={machine._id ?? index}
              id={machine._id}
              machineTypes={machine.contents}
              markerRefs={markerRefs}
              position={[machine.location.geolocation.coordinates[0], machine.location.geolocation.coordinates[1]]}
              name={machine.location.building}
              openingTimes={machine.location.opening_times}
              markerRef={(marker) => {
                if (marker) {
                  markerRefs.current.set(machine.location.building, marker);
                } else {
                  markerRefs.current.delete(machine.location.building);
                }
              }}
            />
          ))}
        </MapContainer>
      </div>
      <BottomBar 
        onRecenter={handleRecenter}
        onBuildingSelect={handleBuildingSelect}
        buildings={buildings}
      />
      <MapControls 
        onMapKeyClick={handleMapKeyClick}
        onHelpClick={handleHelpClick}
      />
    </>
  )
}

export default Map
