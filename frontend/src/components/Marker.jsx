import { useEffect, useState } from "react";
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

  return (
    <div>
      {machine.image && !imageFailed ? ( // Shows the image
        <img
          src={machine.image}
          alt={machine.category}
          onError={() => setImageFailed(true)}
          style={{ width : 200}}
        />  
      ) : (
        <p>Image not available</p> // If image failed
      )}
      {count > 1 && ( // For more than one image
        <div>
          <button onClick={() => setIndex((index - 1 + count) % count)}>◀</button> 
          <button onClick={() => setIndex((index + 1) % count)}>▶</button>
        </div>
      )}
    </div>
  );
}

export function VendingMachineMarker({
  machineTypes,
  position,
  name,
  machines,
}) {
  if (!position) return null;
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
          </p>
          <VendingMachineSlider machines ={machines} />
        </div>
      </Popup>
    </Marker>
  );
}

export default VendingMachineMarker;
