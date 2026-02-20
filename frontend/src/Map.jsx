import { useState, useEffect } from 'react'
import './Map.css'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

function Map() {
  const [apiStatus, setApiStatus] = useState('Connecting...');

  useEffect(() => {
    fetch('http://localhost:5000/') // Backend server address
      .then(res => res.text())
      .then(data => setApiStatus(data))
      .catch(err => setApiStatus('Connection failed: ' + err.message));
  }, []);


  return (
    <>
      <div class="logo-title">
        <img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/MunchiMaps%20Logos/MunchiMapsCroppedLogo.png?raw=true" alt="MunchiMaps" />
      </div>
      <div id="map-container">
        <MapContainer center={[42.729014, -73.676728]} zoom={15} scrollWheelZoom={true} zoomControl={false} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[42.729014, -73.67628]}>
            <Popup>
              Test
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default Map
