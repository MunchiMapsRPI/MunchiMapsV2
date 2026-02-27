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
                <img src="/icons/Map Icons/Food&Drink.png" alt="Vending Machine" className="legend-marker marker-vending" />
                <span>Vending Machine</span>
              </div>
              <div className="legend-item">
                <img src="/icons/Map Icons/Food&DrinkWarning.png" alt="Limited Stock" className="legend-marker marker-warning" />
                <span>Limited Stock</span>
              </div>
              <div className="legend-item">
                <span className="legend-marker marker-user">📍</span>
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
