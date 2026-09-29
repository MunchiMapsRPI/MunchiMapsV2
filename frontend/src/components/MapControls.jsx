import { useState } from 'react';
import '../styles/MapControls.css';

function MapControls({ onMapKeyClick, onHelpClick }) {
  const [showMapKey, setShowMapKey] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleMapKeyClick = () => {
    setShowMapKey(!showMapKey);
    setShowHelp(false);
    if (onMapKeyClick) onMapKeyClick();
  };

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
    setShowMapKey(false);
    if (onHelpClick) onHelpClick();
  };

  return (
    <div className="map-controls">
      <button 
        className="control-button map-key-button"
        onClick={handleMapKeyClick}
        title="Map legend"
      >
        <img src="/icons/Map Icons/CookieFull.png" alt="Map Key" className="control-icon" />
      </button>

      <button 
        className="control-button help-button"
        onClick={handleHelpClick}
        title="How to use"
      >
        <img src="/icons/MenuIcons/help-circle.svg" alt="Help" className="control-icon" />
      </button>

      {showMapKey && (
        <div className="modal map-key-modal">
          <div className="modal-content">
            <h2>Map Legend</h2>
            <button className="close-button" onClick={handleMapKeyClick}>×</button>
            <div className="legend-items">
              <div className="legend-item">
                <img src="/icons/Map Icons/Drink.png" alt="Drink Vending Machines" className="legend-marker marker-vending" />
                <span>Drink Vending Machines</span>
              </div>
              <div className="legend-item">
                <img src="/icons/Map Icons/Food.png" alt="Food Vending Machines" className="legend-marker marker-vending" />
                <span>Food Vending Machines</span>
              </div>
              <div className="legend-item">
                <img src="/icons/Map Icons/Food&Drink.png" alt="Food and Drink Vending Machines" className="legend-marker marker-vending" />
                <span>Food and Drink Vending Machines</span>
              </div>
              <div className="legend-item">
                <img src="/icons/Map Icons/Food&DrinkWarning.png" alt="Problem with vending machine" className="legend-marker marker-warning" />
                <span>Problem with vending machine</span>
              </div>
              <div className="legend-item">
                <img src="/icons/Map Icons/Food&DrinkClosed.png" alt="Building Closed" className="legend-marker marker-warning" />
                <span>Building Closed</span>
              </div>
              <div className="legend-item">
                <img src="/icons/Map Icons/SelfLocation.png" alt="Your Location" className="legend-marker marker-user" />
                <span>Your Location</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="modal help-modal">
          <div className="modal-content">
            <h2>How to Use MunchiMaps</h2>
            <button className="close-button" onClick={handleHelpClick}>×</button>
            <div className="help-content">
              <h3>Getting Started</h3>
              <ul>
                <li><strong>Search:</strong> Click the search button to search for vending machines</li>
                <li><strong>Report:</strong> Click the alert button to report a new vending machine or update info</li>
                <li><strong>Recenter:</strong> Click the crosshair button to center the map on your location</li>
              </ul>
              <h3>Navigation</h3>
              <ul>
                <li><strong>Pan:</strong> Click and drag the map to move around</li>
                <li><strong>Zoom:</strong> Scroll to zoom in or out</li>
                <li><strong>Click Markers:</strong> Click on vending machine markers to view details</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapControls;
