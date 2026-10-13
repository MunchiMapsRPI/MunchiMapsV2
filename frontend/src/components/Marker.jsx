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

const drinkClosedIcon = L.icon({
  iconUrl: "/icons/Map Icons/DrinkClosed.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -40],
});

const foodClosedIcon = L.icon({
  iconUrl: "/icons/Map Icons/FoodClosed.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -40],
});

const foodAndDrinkClosedIcon = L.icon({
  iconUrl: "/icons/Map Icons/Food&DrinkClosed.png",
  iconSize: [80, 50],
  iconAnchor: [40, 50],
  popupAnchor: [0, -40],
});

function toMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function isBuildingOpen(openingTimes, now = new Date()) {
  // If the array for opening times doesn't exist in DB, just say building is open for now
  if (!openingTimes) return true;

  const dayIndex = now.getDay();
  const todayHours = openingTimes[dayIndex];

  if (!todayHours || !todayHours[0] || !todayHours[1]) {
    return false;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = toMinutes(todayHours[0]);
  const closeMinutes = toMinutes(todayHours[1]);

  if (openMinutes == null || closeMinutes == null) return false;

  if (closeMinutes <= openMinutes) {
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function VendingMachineMarker({
  machineTypes,
  position,
  name,
  machines,
  openingTimes,
}) {
  if (!position) return null;
  
  const open = isBuildingOpen(openingTimes)
  const icon =
    machineTypes === "drink"
      ? open ? drinkIcon : drinkClosedIcon
      : machineTypes === "food"
        ? open ? foodIcon : foodClosedIcon
        : machineTypes === "food&drink"
          ? open ? foodAndDrinkIcon : foodAndDrinkClosedIcon
          : null;

  return (
    <Marker
      position={position}
      icon={icon}
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
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export default VendingMachineMarker;
