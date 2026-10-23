import { useState } from 'react';
import Fuse from 'fuse.js';
import '../styles/BottomBar.css';

function getBuildingMatches(buildings, query) {
  if (!query.trim()) return [];

  const fuse = new Fuse(buildings, {
    threshold: 0.4,
    ignoreLocation: true,
  });

  return fuse.search(query).map((result) => result.item);
}

function BottomBar({ onSearch, onReport, onRecenter, buildings = [] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const buildingMatches = getBuildingMatches(buildings, searchQuery);

  return (
    <div className="bottom-bar">
      <button 
        className="bar-button search-button"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        title="Search buildings"
      >
        <img src="/icons/MenuIcons/search.svg" alt="Search" className="button-icon" />
      </button>

      {isSearchOpen && (
        <input
          type="text"
          className="search-input"
          placeholder="Search buildings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      )}

      {isSearchOpen && buildingMatches.length > 0 && (
        <div className="building-results" role="listbox" aria-label="Building search results">
          {buildingMatches.map((building) => (
            <button
              className="building-result"
              key={building}
              type="button"
              role="option"
              onClick={() => setSearchQuery(building)}
            >
              {building}
            </button>
          ))}
        </div>
      )}

      <button 
        className="bar-button recenter-button"
        onClick={onRecenter}
        title="Recenter to your location"
      >
        <img src="/icons/MenuIcons/crosshair.svg" alt="Recenter" className="button-icon" />
      </button>
    </div>
  );
}

export default BottomBar;
