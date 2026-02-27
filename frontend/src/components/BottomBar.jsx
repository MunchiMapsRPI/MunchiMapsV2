import { useState } from 'react';
import '../styles/BottomBar.css';

function BottomBar({ onSearch, onReport, onRecenter }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bottom-bar">
      <button 
        className="bar-button search-button"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        title="Search vending machines"
      >
        <img src="/icons/MenuIcons/search.svg" alt="Search" className="button-icon" />
      </button>

      {isSearchOpen && (
        <input
          type="text"
          className="search-input"
          placeholder="Search vending machines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      )}

      <button 
        className="bar-button report-button"
        onClick={onReport}
        title="Report a vending machine"
      >
        <img src="/icons/MenuIcons/alert-triangle.svg" alt="Report" className="button-icon" />
      </button>

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
