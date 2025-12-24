import { Conference } from "../../types/types";
import { useState } from "react";

interface ExportJSONModalProps {
  conferences: Conference[];
  onClose: () => void;
}

export function ExportJSONModal({
  conferences,
  onClose,
}: ExportJSONModalProps) {
  const conferenceFields = [
    { key: "conf_id", label: "ID" },
    { key: "conf_name", label: "Name" },
    { key: "conf_longname", label: "Full Name" },
    { key: "conf_abbreviation", label: "Abbreviation" },
    { key: "start_year", label: "Start Year" },
    { key: "end_year", label: "End Year" },
    { key: "conf_logo", label: "Logo" },
  ];

  const teamFields = [
    { key: "team_id", label: "ID" },
    { key: "team_name", label: "Team Name" },
    { key: "team_nickname", label: "Nickname" },
    { key: "team_abbreviation", label: "Abbreviation" },
    { key: "conf_id", label: "Conference" },
    { key: "primary_color", label: "Primary Color" },
    { key: "secondary_color", label: "Secondary Color" },
    { key: "team_logo", label: "Logo" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
  ];

  const [selectedConferenceFields, setSelectedConferenceFields] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    conferenceFields.forEach((field) => {
      initial[field.key] = true;
    });
    return initial;
  });

  const [selectedTeamFields, setSelectedTeamFields] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    teamFields.forEach((field) => {
      initial[field.key] = true;
    });
    return initial;
  });

  const [includeTeams, setIncludeTeams] = useState(true);

  const handleExport = () => {
    // Check if any conference fields are selected
    const hasConferenceFields = Object.values(selectedConferenceFields).some(
      (v) => v
    );

    // If no conference fields selected but teams are included, export flat array of teams
    if (!hasConferenceFields && includeTeams) {
      const allTeams = conferences.flatMap((conference) =>
        (conference.teams || []).map((team) => {
          const filteredTeam: Record<string, unknown> = {};
          teamFields.forEach((field) => {
            if (selectedTeamFields[field.key]) {
              filteredTeam[field.key] = team[field.key as keyof typeof team];
            }
          });
          return filteredTeam;
        })
      );

      const jsonString = JSON.stringify(allTeams, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "teams.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onClose();
      return;
    }

    const exportData = conferences.map((conference) => {
      const filteredConference: Record<string, unknown> = {};

      // Add selected conference fields
      conferenceFields.forEach((field) => {
        if (selectedConferenceFields[field.key]) {
          filteredConference[field.key] =
            conference[field.key as keyof Conference];
        }
      });

      // Add teams if included
      if (includeTeams && conference.teams && conference.teams.length > 0) {
        const filteredTeams = conference.teams.map((team) => {
          const filteredTeam: Record<string, unknown> = {};
          teamFields.forEach((field) => {
            if (selectedTeamFields[field.key]) {
              const value = team[field.key as keyof typeof team];
              if (value !== undefined) {
                filteredTeam[field.key] = value;
              }
            }
          });
          return filteredTeam;
        });
        // Only add teams array if there are teams with data
        if (filteredTeams.length > 0) {
          filteredConference.teams = filteredTeams;
        }
      }

      return filteredConference;
    });

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "conferences.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const toggleConferenceGroup = (value: boolean) => {
    const newSelected: Record<string, boolean> = {};
    conferenceFields.forEach((field) => {
      newSelected[field.key] = value;
    });
    setSelectedConferenceFields(newSelected);
  };

  const toggleTeamGroup = (value: boolean) => {
    const newSelected: Record<string, boolean> = {};
    teamFields.forEach((field) => {
      newSelected[field.key] = value;
    });
    setSelectedTeamFields(newSelected);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Select Fields to Export</h2>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Conference Fields */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Conference Fields</h3>
              <div className="space-x-2">
                <button
                  onClick={() => toggleConferenceGroup(true)}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <button
                  onClick={() => toggleConferenceGroup(false)}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Deselect All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {conferenceFields.map((field) => (
                <label
                  key={field.key}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedConferenceFields[field.key]}
                    onChange={(e) =>
                      setSelectedConferenceFields({
                        ...selectedConferenceFields,
                        [field.key]: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Team Fields */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold">Team Fields</h3>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTeams}
                    onChange={(e) => setIncludeTeams(e.target.checked)}
                    className="rounded border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">Include Teams</span>
                </label>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => toggleTeamGroup(true)}
                  disabled={!includeTeams}
                  className={`text-sm cursor-pointer ${
                    includeTeams
                      ? "text-blue-600 hover:underline"
                      : "text-gray-400"
                  }`}
                >
                  Select All
                </button>
                <button
                  onClick={() => toggleTeamGroup(false)}
                  disabled={!includeTeams}
                  className={`text-sm cursor-pointer ${
                    includeTeams
                      ? "text-blue-600 hover:underline"
                      : "text-gray-400"
                  }`}
                >
                  Deselect All
                </button>
              </div>
            </div>

            <div
              className={`grid grid-cols-2 sm:grid-cols-3 gap-2 ${
                !includeTeams ? "opacity-50" : ""
              }`}
            >
              {teamFields.map((field) => (
                <label
                  key={field.key}
                  className={`flex items-center space-x-2 ${
                    includeTeams ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTeamFields[field.key]}
                    disabled={!includeTeams}
                    onChange={(e) =>
                      setSelectedTeamFields({
                        ...selectedTeamFields,
                        [field.key]: e.target.checked,
                      })
                    }
                    className={`rounded border-gray-300 ${
                      includeTeams ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  />
                  <span className="text-sm">{field.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
