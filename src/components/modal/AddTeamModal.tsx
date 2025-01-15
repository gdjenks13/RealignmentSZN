import { Team } from "../../types/types";
import { useState, useCallback } from "react";
import { US_STATES } from "../../data/states";

interface AddTeamModalProps {
  onSave: (newTeam: Team) => void;
  onClose: () => void;
  conferences: { id: number; name: string }[];
  teams: Team[];
}

export function AddTeamModal({
  onSave,
  onClose,
  conferences,
  teams,
}: AddTeamModalProps) {
  const [formData, setFormData] = useState<Omit<Team, "team_id">>({
    team_name: "",
    team_nickname: "",
    team_abbreviation: "",
    conf_id: 0,
    primary_color: "#000000",
    secondary_color: "#FFFFFF",
    team_logo: "",
    city: "",
    state: "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "conf_id" ? parseInt(value, 10) || 0 : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const requiredFields = ["team_name", "team_nickname", "team_abbreviation"];
      const missingFields = requiredFields.filter(
        (field) => !formData[field as keyof typeof formData]
      );

      if (missingFields.length > 0) {
        alert(`Please fill in required fields: ${missingFields.join(", ")}`);
        return;
      }

      const tempId = Math.max(...teams.map((team) => team.team_id), 0) + 1;
      onSave({ team_id: tempId, ...formData });
    },
    [formData, onSave, teams]
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Team</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Team Name</label>
              <input
                type="text"
                name="team_name"
                value={formData.team_name}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nickname</label>
              <input
                type="text"
                name="team_nickname"
                value={formData.team_nickname}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Abbreviation
              </label>
              <input
                type="text"
                name="team_abbreviation"
                value={formData.team_abbreviation}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="primary_color"
                  value={formData.primary_color}
                  onChange={handleInputChange}
                  className="w-12 h-8 p-0 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_color}
                  onChange={handleInputChange}
                  name="primary_color"
                  className="flex-1 border rounded p-2 uppercase"
                  pattern="^#([A-Fa-f0-9]{6})$"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Secondary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  name="secondary_color"
                  value={formData.secondary_color}
                  onChange={handleInputChange}
                  className="w-12 h-8 p-0 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondary_color}
                  onChange={handleInputChange}
                  name="secondary_color"
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
                name="team_logo"
                value={formData.team_logo}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Conference
              </label>
              <select
                name="conf_id"
                value={formData.conf_id}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select a conference...</option>
                {conferences.map((conf) => (
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
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
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
