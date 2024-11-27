import { useState, useRef, useEffect } from "react";
import { Team } from "../types/types";
import { EditLocationPopup } from "./EditLocationPopup";

interface EditTeamPopupProps {
  team: Team;
  position: { x: number; y: number };
  onClose: () => void;
}

interface LocationPopupState {
  isOpen: boolean;
  position: {
    x: number;
    y: number;
  };
}

export function EditTeamPopup({ team, position, onClose }: EditTeamPopupProps) {
  const [school, setSchool] = useState(team.school);
  const [mascot, setMascot] = useState(team.mascot);
  const [logo, setLogo] = useState(team.logo);
  const [altLogo, setAltLogo] = useState(team.alt_logo);
  const [location, setLocation] = useState(team.location);
  const [elo, setElo] = useState(team.elo);
  const [editLocationPopup, setEditLocationPopup] = useState<LocationPopupState>({
    isOpen: false,
    position: { x: 0, y: 0 }
  });
  const popupRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const popupWidth = 256; // w-64 = 16rem = 256px
    const popupHeight = 400; // Approximate height
    
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
    // TODO: Implement save logic
    onClose();
  };

  const handleEditLocation = () => {
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      setEditLocationPopup({
        isOpen: true,
        position: {
          x: rect.right + 8,
          y: rect.top,
        },
      });
    }
  };

  return (
    <div
      ref={popupRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200"
      style={{ top: adjustedPosition.y, left: adjustedPosition.x }}
    >
      <form className="flex flex-col p-4 w-64">
        <label htmlFor="school" className="mb-2">
          School:
          <input
            id="school"
            name="school"
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label htmlFor="mascot" className="mb-2">
          Mascot:
          <input
            id="mascot"
            name="mascot"
            type="text"
            value={mascot}
            onChange={(e) => setMascot(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label htmlFor="logo" className="mb-2">
          Logo:
          <input
            id="logo"
            name="logo"
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label htmlFor="altLogo" className="mb-2">
          Alt Logo:
          <input
            id="altLogo"
            name="altLogo"
            type="text"
            value={altLogo}
            onChange={(e) => setAltLogo(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <label htmlFor="location" className="mb-2">
          Location:
          <button
            id="location"
            name="location"
            type="button"
            onClick={handleEditLocation}
            className="w-full px-2 py-1 border rounded"
          >
            Edit Location
          </button>
        </label>
        <label htmlFor="elo" className="mb-2">
          Elo:
          <input
            id="elo"
            name="elo"
            type="number"
            value={elo}
            onChange={(e) => setElo(Number(e.target.value))}
            className="w-full px-2 py-1 border rounded"
          />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <button 
            type="button"
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button 
            type="submit"
            onClick={handleSave} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>

      {editLocationPopup.isOpen && (
        <EditLocationPopup
          location={location}
          position={editLocationPopup.position}
          onClose={() => setEditLocationPopup({ isOpen: false, position: { x: 0, y: 0 } })}
          onSave={(newLocation) => {
            setLocation(newLocation);
            setEditLocationPopup({ isOpen: false, position: { x: 0, y: 0 } });
          }}
        />
      )}
    </div>
  );
}
