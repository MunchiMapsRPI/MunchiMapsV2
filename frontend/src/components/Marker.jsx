import { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create custom markers
const drinkIcon = L.icon({
    iconUrl: '~/assets/icons/drink.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

