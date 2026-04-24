import { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create custom markers
const drinkIcon = L.icon({
    iconUrl: '/icons/Map Icons/Drink.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25]
});

const foodIcon = L.icon({
    iconUrl: '/icons/Map Icons/Food.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25]
});

const foodAndDrinkIcon = L.icon({
    iconUrl: '/icons/Map Icons/Food&Drink.png',
    iconSize: [80, 50],
    iconAnchor: [40, 50],
    popupAnchor: [0, -40]
});

export function VendingMachineMarker({ machineType, position, name }) {
    if (!position) return null;

    return (
        <Marker position={position} icon={
            machineType === 'drink' ? drinkIcon :
            machineType === 'food' ? foodIcon :
            machineType === 'food&drink' ? foodAndDrinkIcon : null
        }>
            <Popup>
                <div>
                    <h3>{name || (machineType === 'drink' ? 'Drink Vending Machine' : machineType === 'food' ? 'Food Vending Machine' : 'Food & Drink Vending Machine')}</h3>
                    <p>Location: {position[0].toFixed(4)}, {position[1].toFixed(4)}</p>
                </div>
            </Popup>
        </Marker>
    );
}

export default VendingMachineMarker;