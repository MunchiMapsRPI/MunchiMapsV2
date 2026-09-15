import { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Create custom markers
const drinkIcon = L.icon({
  iconUrl: "/icons/Map Icons/Drink.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -40],
});

const foodIcon = L.icon({
  iconUrl: "/icons/Map Icons/Food.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -40],
});

const foodAndDrinkIcon = L.icon({
  iconUrl: "/icons/Map Icons/Food&Drink.png",
  iconSize: [80, 50],
  iconAnchor: [40, 50],
  popupAnchor: [0, -40],
});

export function VendingMachineMarker({
  machineType,
  position,
  name,
  imageUrls,
}) {
  if (!position) return null;

  return (
    <Marker
      position={position}
      icon={
        machineType === "drink"
          ? drinkIcon
          : machineType === "food"
            ? foodIcon
            : machineType === "food&drink"
              ? foodAndDrinkIcon
              : null
      }
    >
      <Popup>
        <div>
          <h3>
            {name ||
              (machineType === "drink"
                ? "Drink Vending Machine"
                : machineType === "food"
                  ? "Food Vending Machine"
                  : "Food & Drink Vending Machine")}
          </h3>
          <p>
          </p>
          {imageUrls[0] && (
            <img
              src={imageUrls[0]}
              alt={imageUrls[0]}
              style={{ width: "100%" }}
            />
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export default VendingMachineMarker;
