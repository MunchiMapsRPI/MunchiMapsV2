import { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
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
  machineTypes,
  position,
  name,
  machines,
}) {
  if (!position) return null;
  console.log('Machines:', machines[0].image);
  return (
    <Marker
      position={position}
      icon={
        machineTypes === "drink"
          ? drinkIcon
          : machineTypes === "food"
            ? foodIcon
            : machineTypes === "food&drink"
              ? foodAndDrinkIcon
              : null
      }
    >
      <Popup>
        <div>
          <h3>
            {name ||
              (machineTypes === "drink"
                ? "Drink Vending Machine"
                : machineTypes === "food"
                  ? "Food Vending Machine"
                  : "Food & Drink Vending Machine")}
          </h3>
          <p>
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt={images[0]}
                style={{ width: "100%" }}
              />
            ) : (
              "No image available"
            )}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export default VendingMachineMarker;
