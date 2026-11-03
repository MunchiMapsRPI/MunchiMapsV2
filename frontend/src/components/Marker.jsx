import { useEffect, useState } from "react";
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


// Function for populating with images and the slider
function VendingMachineSlider({ machines }) {
  const [index, setIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false); // Shows if the image is broken (set to false automatically)

  // Runs everytime index changes
  useEffect(() => {
    setImageFailed(false);
  }, [index]);

  // If there is no array, empty, or doesnt exist
  if (!Array.isArray(machines) || machines.length === 0) {
    return <p>Vending machine info not available</p>;
  }

  const machine = machines[index]; // Machine that is selected
  const count = machines.length; // Total number of machines

  const IMAGE_WIDTH = 200;               // image size
  const arrowSize = IMAGE_WIDTH * 0.40;  // scalable arrow size

  const arrowStyle = { // styles the arrow
    flexShrink: 0,
    width: arrowSize,
    height: arrowSize,
    fontSize: arrowSize * 0.5,
    lineHeight: 1,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none"
  };

  

  return (
    <div>
      {machine.image && !imageFailed ? ( // Shows the image
        <img
          src={machine.image}
          alt={machine.category}
          onError={() => setImageFailed(true)}
          style={{ width : IMAGE_WIDTH,  margin: "30px 0"}}
        />  
      ) : (
        <p>Image not available</p> // If image failed
      )}
      {count > 1 && ( // For more than one image
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <button style={arrowStyle} onClick={() => setIndex((index - 1 + count) % count)}>◀</button> 
          <button style={arrowStyle} onClick={() => setIndex((index + 1) % count)}>▶</button>
        </div>
      )}
    </div>
  );
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
  id, 
  machineTypes,
  position,
  name,
  openingTimes,
  markerRefs
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
      ref={(el) => {
        if (!markerRefs || id == null) return;
        if (el) markerRefs.current[id] = el;
        else delete markerRefs.current[id];
      }}
    >
      <Popup>
        <div style={{ caretColor: "transparent" }}>
          <h3>
            {name ||
              (machineTypes === "drink"
                ? "Drink Vending Machine"
                : machineTypes === "food"
                  ? "Food Vending Machine"
                  : "Food & Drink Vending Machine")}
          </h3>
          <VendingMachineSlider machines ={machines} />
        </div>
      </Popup>
    </Marker>
  );
}

export default VendingMachineMarker;
