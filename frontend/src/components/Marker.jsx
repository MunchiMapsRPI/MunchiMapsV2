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
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [index]);

  if (!Array.isArray(machines) || machines.length === 0) {
    return console.error("Vending machine failed to load");
  }

  const machine = machines[index];
  const count = machines.length;

  const IMAGE_WIDTH = 200;               // image size
  const arrowSize = IMAGE_WIDTH * 0.30;  // scalable arrow size

  const arrowStyle = { // styles the arrow
    flexShrink: 0,
    width: arrowSize,
    height: arrowSize,
    borderRadius: "50%",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    color: "#333",
    fontSize: arrowSize * 0.7,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    paddingBottom: arrowSize * 0.08, 
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: arrowSize * 0.25,
        margin: "10px 0",
      }}
    >
      {count > 1 && ( // If machine > 1
        <button
          aria-label="Previous machine"
          onClick={() => setIndex((index - 1 + count) % count)}
          style={arrowStyle}
        >
          ‹
        </button>
      )}

      {machine.image && !imageFailed ? (
        <img
          src={machine.image}
          alt={machine.category}
          onError={() => setImageFailed(true)}
          style={{ width: IMAGE_WIDTH, display: "block", borderRadius: 6 }}
        />
      ) : (
        <p style={{ width: IMAGE_WIDTH, textAlign: "center" }}>Image not available</p>
      )}

      {count > 1 && ( // If machine > 1
        <button
          aria-label="Next machine"
          onClick={() => setIndex((index + 1) % count)}
          style={arrowStyle}
        >
          ›
        </button>
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
