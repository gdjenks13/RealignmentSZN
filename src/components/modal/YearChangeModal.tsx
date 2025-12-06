import { useState } from "react";

interface YearChangeModalProps {
  currentYear: number;
  onClose: () => void;
  onSubmit: (year: number) => void;
}

export function YearChangeModal({
  currentYear,
  onClose,
  onSubmit,
}: YearChangeModalProps) {
  const [year, setYear] = useState<number>(currentYear);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (year < 1978 || year > 2024) {
      setError("Year must be between 1978 and 2024");
      return;
    }
    onSubmit(year);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Change Year</h2>

        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-700">
              Warning: Changing the year will reload all conference data and
              reset any unsaved changes.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Select Year (1978-2025):
            </label>
            <input
              type="number"
              min={1978}
              max={2025}
              value={year}
              onChange={(e) => {
                setYear(Number(e.target.value));
                setError("");
              }}
              className="w-full p-2 border rounded"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Change Year
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
