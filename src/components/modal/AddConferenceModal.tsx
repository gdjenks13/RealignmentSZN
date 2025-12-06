import { useState } from "react";
import { Conference } from "../../types/types";

interface RawConference {
  conf_id: number;
  conf_name: string;
  conf_longname: string;
  conf_abbreviation: string;
  start_year: number;
  end_year: number;
  conf_logo: string;
}

interface AddConferenceModalProps {
  existingConferences: RawConference[];
  usedConferenceIds: Set<number>;
  onAddExisting: (conference: RawConference) => void;
  onCreateNew: (conference: Omit<Conference, "teams">) => void;
  onClose: () => void;
}

export function AddConferenceModal({
  existingConferences,
  usedConferenceIds,
  onAddExisting,
  onCreateNew,
  onClose,
}: AddConferenceModalProps) {
  const [mode, setMode] = useState<"select" | "create">("select");
  const [searchQuery, setSearchQuery] = useState("");

  // Form state for creating new conference
  const [newConf, setNewConf] = useState({
    conf_name: "",
    conf_longname: "",
    conf_abbreviation: "",
    conf_logo: "",
  });

  const availableConferences = existingConferences.filter(
    (conf) =>
      !usedConferenceIds.has(conf.conf_id) &&
      (searchQuery === "" ||
        conf.conf_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conf.conf_longname.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateNew = () => {
    if (!newConf.conf_name.trim()) return;

    // Generate a unique ID for the new conference (negative to avoid conflicts)
    const newId = -(Date.now() % 100000);

    onCreateNew({
      conf_id: newId,
      conf_name: newConf.conf_name.trim(),
      conf_longname: newConf.conf_longname.trim() || newConf.conf_name.trim(),
      conf_abbreviation:
        newConf.conf_abbreviation.trim() ||
        newConf.conf_name.slice(0, 3).toUpperCase(),
      start_year: new Date().getFullYear(),
      end_year: 0,
      conf_logo: newConf.conf_logo.trim() || "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Add Conference</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setMode("select")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === "select"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Select Existing
          </button>
          <button
            onClick={() => setMode("create")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === "create"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Create New
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {mode === "select" ? (
            <>
              <input
                type="text"
                placeholder="Search conferences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <div className="space-y-2">
                {availableConferences.map((conf) => (
                  <button
                    key={conf.conf_id}
                    onClick={() => onAddExisting(conf)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-red-300 transition-colors text-left"
                  >
                    {conf.conf_logo ? (
                      <img
                        src={conf.conf_logo}
                        alt={conf.conf_name}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 font-bold">
                          {conf.conf_abbreviation.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {conf.conf_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {conf.conf_longname}
                      </p>
                    </div>
                  </button>
                ))}

                {availableConferences.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    {searchQuery
                      ? "No conferences match your search"
                      : "All conferences have been added"}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conference Name *
                </label>
                <input
                  type="text"
                  value={newConf.conf_name}
                  onChange={(e) =>
                    setNewConf({ ...newConf, conf_name: e.target.value })
                  }
                  placeholder="e.g., Super Conference"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newConf.conf_longname}
                  onChange={(e) =>
                    setNewConf({ ...newConf, conf_longname: e.target.value })
                  }
                  placeholder="e.g., The Super Conference of America"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Abbreviation
                </label>
                <input
                  type="text"
                  value={newConf.conf_abbreviation}
                  onChange={(e) =>
                    setNewConf({
                      ...newConf,
                      conf_abbreviation: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="e.g., SUP"
                  maxLength={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL (optional)
                </label>
                <input
                  type="text"
                  value={newConf.conf_logo}
                  onChange={(e) =>
                    setNewConf({ ...newConf, conf_logo: e.target.value })
                  }
                  placeholder="https://... or data:image/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                onClick={handleCreateNew}
                disabled={!newConf.conf_name.trim()}
                className="w-full py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Create Conference
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
