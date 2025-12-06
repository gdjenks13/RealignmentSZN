import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { SeasonView } from "./components/SeasonView";
import { CustomConferencesView } from "./components/CustomConferencesView";
import { SelectSeasonModal } from "./components/modal/SelectSeasonModal";

type AppView = "home" | "season" | "custom";

export function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showSeasonModal, setShowSeasonModal] = useState(false);

  const handleSelectSeason = () => {
    setShowSeasonModal(true);
  };

  const handleSeasonSelected = (year: number) => {
    setSelectedYear(year);
    setShowSeasonModal(false);
    setCurrentView("season");
  };

  const handleCustomConferences = () => {
    setCurrentView("custom");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedYear(null);
  };

  return (
    <>
      {currentView === "home" && (
        <HomePage
          onSelectSeason={handleSelectSeason}
          onCustomConferences={handleCustomConferences}
        />
      )}

      {currentView === "season" && selectedYear !== null && (
        <SeasonView initialYear={selectedYear} onBack={handleBackToHome} />
      )}

      {currentView === "custom" && (
        <CustomConferencesView onBack={handleBackToHome} />
      )}

      {showSeasonModal && (
        <SelectSeasonModal
          onSelect={handleSeasonSelected}
          onClose={() => setShowSeasonModal(false)}
        />
      )}
    </>
  );
}
