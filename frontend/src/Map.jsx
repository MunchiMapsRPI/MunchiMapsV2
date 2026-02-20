import { useState, useEffect, useRef } from 'react'
import './Map.css'
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";
import BottomBar from './components/BottomBar'
import MapControls from './components/MapControls'
import { UserLocationMarker } from './components/UserLocation'

function Map() {
  const [apiStatus, setApiStatus] = useState('Connecting...');
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([42.729014, -73.676728]);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/') // This is your backend server address
      .then(res => res.text())
      .then(data => setApiStatus(data))
      .catch(err => setApiStatus('Connection failed: ' + err.message));
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          // Optionally center map on user location
          // setMapCenter([latitude, longitude]);
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

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // TODO: Integrate with backend to search vending machines
  };

  const handleReport = () => {
    console.log('Opening report dialog');
    // TODO: Integrate with backend to report vending machines
  };

  const handleRecenter = () => {
    if (userLocation) {
      setMapCenter(userLocation);
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

  return (
    <>
      <div className="logo-title">
        <img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/MunchiMaps%20Logos/MunchiMapsCroppedLogo.png?raw=true" alt="MunchiMaps" />
      </div>
      <div id="map-container">
        <MapContainer ref={mapRef} center={mapCenter} zoom={15} scrollWheelZoom={true} zoomControl={false} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UserLocationMarker userLocation={userLocation} />
        </MapContainer>
      </div>
      <BottomBar 
        onSearch={handleSearch}
        onReport={handleReport}
        onRecenter={handleRecenter}
      />
      <MapControls 
        onMapKeyClick={handleMapKeyClick}
        onHelpClick={handleHelpClick}
      />
    </>
  )
}

export default Map
