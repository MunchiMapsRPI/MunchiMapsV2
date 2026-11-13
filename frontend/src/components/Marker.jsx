import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
function VendingMachineSlider({ machines, onImageLoad, mapUrl, directions, disabledDirections, name }) {
  const [index, setIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false); // Shows if the image is broken (set to false automatically)
  const [showDirectionsModal, setShowDirectionsModal] = useState(false); // Popup to display more directions

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

  const IMAGE_WIDTH = 280;               // image size
  const buttonWidth = IMAGE_WIDTH / 2;   // each button takes half the image width
  const buttonHeight = buttonWidth / 2;  // rectangle height is half the width

  const buttonStyle = {
    width: buttonWidth,
    height: buttonHeight,
    minWidth: 0,
    minHeight: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    cursor: "pointer",
    outline: "none",
  };

  const arrowSize = buttonHeight * 0.45;

  const Arrow = ({ direction }) => (
    <svg
      width={arrowSize}
      height={arrowSize}
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <polygon
        points={direction === "left" ? "8,0 8,10 1,5" : "2,0 2,10 9,5"}
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div style={{ width: IMAGE_WIDTH, margin: "0 auto" }}>
      {machine.image && !imageFailed ? ( // Shows the image
        <img
          src={machine.image}
          alt={machine.category}
          onLoad={onImageLoad}
          onError={() => setImageFailed(true)}
          style={{ display: "block", width: IMAGE_WIDTH, maxWidth: "100%"}}
        />
      ) : (
        <p>Image not available</p> // If image failed
      )}
      <div style={{ display: "flex", width: IMAGE_WIDTH, marginBottom: "30px" }}>
        <button
          style={buttonStyle}
          onClick={() => setShowDirectionsModal(true)}
          aria-label="Get directions"
        >
          <strong>Internal Directions</strong>
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            window.open("https://forms.gle/zfTDXKoTV737R7KR7", "_blank", "noopener,noreferrer");
          }}
          aria-label="Report an issue"
        >
          <img
            src="/icons/MenuIcons/alert-triangle-grey.svg"
            alt="Report Issue"
            style={{ width: 30, height: 30, display: "block" }}
          />
        </button>
      </div>
      {count > 1 && ( // For more than one image
        <div style={{ display: "flex", width: IMAGE_WIDTH }}>
          <button
            style={buttonStyle}
            onClick={() => setIndex((index - 1 + count) % count)}
            aria-label="Previous image"
          >
            <Arrow direction="left" />
          </button>
          <button
            style={buttonStyle}
            onClick={() => setIndex((index + 1) % count)}
            aria-label="Next image"
          >
            <Arrow direction="right" />
          </button>
        </div>
      )}

      {showDirectionsModal &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "20px",
              pointerEvents: "auto",
            }}
            onClick={(event) => {
              event.stopPropagation();
              setShowDirectionsModal(false);
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "min(92vw, 720px)",
                maxHeight: "90vh",
                overflow: "auto",
                padding: "20px",
                boxSizing: "border-box",
                position: "relative",
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setShowDirectionsModal(false);
                }}
                aria-label="Close directions"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  border: "none",
                  background: "transparent",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              <h2 style={{ marginTop: 0, marginBottom: "16px" }}>{name || "Directions"}</h2>

              {mapUrl ? (
                <img
                  src={mapUrl}
                  alt={`${name || "Building"} map`}
                  style={{
                    display: "block",
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                    marginBottom: "16px",
                  }}
                />
              ) : (
                <p>No map image available for this location.</p>
              )}

              <div style={{ marginBottom: "20px" }}>
                <strong>Directions:</strong>
                <p style={{ margin: "8px 0 0" }}>{directions || "No directions available."}</p>
              </div>

              <div>
                <strong>Disabled directions:</strong>
                <p style={{ margin: "8px 0 0" }}>{disabledDirections || "No disabled-access directions available."}</p>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
}

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
  machines,
  openingTimes,
  markerRefs,
  mapUrl,
  directions,
  disabledDirections,
}) {
  const popupRef = useRef(null);

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
      <Popup ref={popupRef} autoPan={true} autoPanPadding={[0, 100]}>
        <div style={{ caretColor: "transparent" }}>
          <h3>
            {name ||
              (machineTypes === "drink"
                ? "Drink Vending Machine"
                : machineTypes === "food"
                  ? "Food Vending Machine"
                  : "Food & Drink Vending Machine")}
          </h3>
          <VendingMachineSlider
            machines={machines}
            onImageLoad={() => popupRef.current?.update()}
            mapUrl={mapUrl}
            directions={directions}
            disabledDirections={disabledDirections}
            name={name}
          />
        </div>
      </Popup>
    </Marker>
  );
}

export default VendingMachineMarker;
