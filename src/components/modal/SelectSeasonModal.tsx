import { useState } from "react";

interface SelectSeasonModalProps {
  onSelect: (year: number) => void;
  onClose: () => void;
}

export function SelectSeasonModal({
  onSelect,
  onClose,
}: SelectSeasonModalProps) {
  const [selectedYear, setSelectedYear] = useState(2025);

  // Generate years from 1978 to 2025
  const years = Array.from({ length: 2025 - 1978 + 1 }, (_, i) => 2025 - i);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Select a Season</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starting Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year} Season
              </option>
            ))}
          </select>

          <p className="text-sm text-gray-500 mb-4">
            You'll be able to modify the conference alignments and save your
            changes.
          </p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => onSelect(selectedYear)}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700"
            >
              Start with {selectedYear}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
