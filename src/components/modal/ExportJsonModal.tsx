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
  const fieldGroups = {
    Conference: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "full_name", label: "Full Name" },
      { key: "abbreviation", label: "Abbreviation" },
      { key: "classification", label: "Classification" },
      { key: "logo", label: "Logo" },
    ],
    Team: [
      { key: "teams.id", label: "ID" },
      { key: "teams.school", label: "School" },
      { key: "teams.mascot", label: "Mascot" },
      { key: "teams.abbreviation", label: "Abbreviation" },
      { key: "teams.conference", label: "Conference" },
      { key: "teams.division", label: "Division" },
      { key: "teams.color", label: "Color" },
      { key: "teams.alt_color", label: "Alt Color" },
      { key: "teams.logo", label: "Logo" },
      { key: "teams.alt_logo", label: "Alt Logo" },
      { key: "teams.elo", label: "ELO" },
    ],
    Location: [
      { key: "teams.location.name", label: "Name" },
      { key: "teams.location.city", label: "City" },
      { key: "teams.location.state", label: "State" },
      { key: "teams.location.latitude", label: "Latitude" },
      { key: "teams.location.longitude", label: "Longitude" },
    ],
  };

  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      Object.values(fieldGroups)
        .flat()
        .forEach((field) => {
          initial[field.key] = true;
        });
      return initial;
    }
  );

  const handleExport = () => {
    const filterData = (data: any, parentKey = "") => {
      // Handle arrays
      if (Array.isArray(data)) {
        const filtered = data
          .map((item) => filterData(item, parentKey))
          .filter((item) => {
            if (typeof item === "object" && item !== null) {
              return Object.keys(item).length > 0;
            }
            return true;
          });
        return filtered.length > 0 ? filtered : undefined;
      }

      // Handle objects
      if (typeof data === "object" && data !== null) {
        const filtered: any = {};
        Object.entries(data).forEach(([key, value]) => {
          const fullKey = parentKey ? `${parentKey}.${key}` : key;

          // Skip if parent is unselected
          if (fullKey.includes(".")) {
            const parentPath = fullKey.split(".").slice(0, -1).join(".");
            if (!selectedFields[parentPath]) return;
          }

          if (selectedFields[fullKey]) {
            const processedValue = filterData(value, fullKey);
            if (
              processedValue !== undefined &&
              !(
                typeof processedValue === "object" &&
                Object.keys(processedValue).length === 0
              )
            ) {
              filtered[key] = processedValue;
            }
          }
        });
        return Object.keys(filtered).length > 0 ? filtered : undefined;
      }

      return data;
    };

    const filteredData = filterData(conferences)?.filter(Boolean) ?? [];
    const jsonString = JSON.stringify(filteredData, null, 2);
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

  const toggleGroup = (group: string, value: boolean) => {
    const newSelected = { ...selectedFields };
    fieldGroups[group as keyof typeof fieldGroups].forEach((field) => {
      newSelected[field.key] = value;
    });
    setSelectedFields(newSelected);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Select Fields to Export</h2>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {Object.entries(fieldGroups).map(([group, fields]) => (
            <div key={group} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{group}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => toggleGroup(group, true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => toggleGroup(group, false)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {fields.map((field) => (
                  <label
                    key={field.key}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFields[field.key]}
                      onChange={(e) =>
                        setSelectedFields({
                          ...selectedFields,
                          [field.key]: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{field.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
