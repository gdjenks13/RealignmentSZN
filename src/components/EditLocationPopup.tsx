import { useState, useEffect } from 'react';
import { Location } from '../types/types';

interface EditLocationPopupProps {
    location: Location;
    position: { x: number; y: number };
    onClose: () => void;
    onSave: (newLocation: Location) => void;
  }

export function EditLocationPopup({ location, position, onClose, onSave }: EditLocationPopupProps) {
  const [name, setName] = useState(location.name);
  const [city, setCity] = useState(location.city);
  const [state, setState] = useState(location.state);
  const [latitude, setLatitude] = useState(location.latitude);
  const [longitude, setLongitude] = useState(location.longitude);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const popupWidth = 256;
    const popupHeight = 300; // Approximate height
    
    let adjustedX = position.x;
    let adjustedY = position.y;
    
    if (adjustedX + popupWidth > viewportWidth) {
      adjustedX = viewportWidth - popupWidth - 16;
    }
    
    if (adjustedY + popupHeight > viewportHeight) {
      adjustedY = viewportHeight - popupHeight - 16;
    }
    
    if (adjustedX < 16) {
      adjustedX = 16;
    }
    
    if (adjustedY < 16) {
      adjustedY = 16;
    }
    
    setAdjustedPosition({ x: adjustedX, y: adjustedY });
  }, [position]);

  const handleSave = () => {
    onSave({ name, city, state, latitude, longitude });
    onClose();
  };

  return (
    <div 
      className="fixed z-[60] bg-white rounded-lg shadow-xl border border-gray-200 p-4"
      style={{ top: adjustedPosition.y, left: adjustedPosition.x }}
    >
      <div className="flex flex-col w-64">
        <label className="mb-2">
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label className="mb-2">
          City:
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label className="mb-2">
          State:
          <input 
            type="text" 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label className="mb-2">
          Latitude:
          <input 
            type="number" 
            value={latitude} 
            onChange={(e) => setLatitude(Number(e.target.value))} 
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label className="mb-2">
          Longitude:
          <input 
            type="number" 
            value={longitude} 
            onChange={(e) => setLongitude(Number(e.target.value))} 
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}