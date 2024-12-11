import { Team, Location } from '../../types/types';
import { useState, useCallback } from 'react';
import { US_STATES } from '../../data/states';

interface AddTeamModalProps {
    onSave: (newTeam: Team) => void;
    onClose: () => void;
    conferences: { id: number; name: string }[];
    teams: Team[];
  }

export function AddTeamModal({ onSave, onClose, conferences, teams }: AddTeamModalProps) {
  const [formData, setFormData] = useState<Omit<Team, 'id'>>({
    school: '',
    mascot: '',
    abbreviation: '',
    conference: 0,
    division: '',
    color: '#000000',
    alt_color: '#FFFFFF',
    logo: '',
    alt_logo: '',
    location: {
      name: '',
      city: '',
      state: '',
      latitude: 0,
      longitude: 0
    },
    elo: 1500 // Default ELO rating
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'elo') {
      const numValue = parseInt(value, 10) || 1;
      const clampedValue = Math.min(Math.max(numValue, 1), 3000);
      setFormData(prev => ({ ...prev, elo: clampedValue }));
      return;
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof Team, keyof Location];
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as Location),
          [child]: child === 'latitude' || child === 'longitude' 
            ? parseFloat(value) || 0
            : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'conference' 
          ? parseInt(value, 10) || 0 
          : value
      }));
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ['school', 'mascot', 'abbreviation'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }

    const tempId = Math.max(...teams.map(team => team.id), 0) + 1;
    onSave({ id: tempId, ...formData });
  }, [formData, onSave, teams]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Team</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">School</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mascot</label>
              <input
                type="text"
                name="mascot"
                value={formData.mascot}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Abbreviation</label>
              <input
                type="text"
                name="abbreviation"
                value={formData.abbreviation}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Division</label>
              <input
                type="text"
                name="division"
                value={formData.division || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-12 h-8 p-0 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={handleInputChange}
                  name="color"
                  className="flex-1 border rounded p-2 uppercase"
                  pattern="^#([A-Fa-f0-9]{6})$"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alternate Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="alt_color"
                  value={formData.alt_color}
                  onChange={handleInputChange}
                  className="w-12 h-8 p-0 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.alt_color}
                  onChange={handleInputChange}
                  name="alt_color"
                  className="flex-1 border rounded p-2 uppercase"
                  pattern="^#([A-Fa-f0-9]{6})$"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Logo URL</label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alt Logo URL</label>
              <input
                type="text"
                name="alt_logo"
                value={formData.alt_logo}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ELO Rating</label>
              <input
                type="number"
                name="elo"
                value={formData.elo}
                onChange={handleInputChange}
                min={1}
                max={3000}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Conference</label>
              <select
                name="conference"
                value={formData.conference}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select a conference...</option>
                {conferences.map(conf => (
                  <option key={conf.id} value={conf.id}>
                    {conf.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <fieldset className="border p-4 rounded">
            <legend className="text-sm font-medium">Location</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="location.name"
                  value={formData.location.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="">Select a state...</option>
                    {US_STATES.map(({ code, name }) => (
                        <option key={code} value={code}>
                        {code} - {name}
                        </option>
                    ))}
                    </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  name="location.latitude"
                  value={formData.location.latitude}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  name="location.longitude"
                  value={formData.location.longitude}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          </fieldset>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}