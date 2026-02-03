import { useState, useEffect } from 'react'
import './Map.css'
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MapContainer center={[42.729014, -73.676728]} zoom={15} scrollWheelZoom={true} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}

export default Map
