interface HomePageProps {
  onSelectSeason: () => void;
  onCustomConferences: () => void;
}

export function HomePage({
  onSelectSeason,
  onCustomConferences,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-red-700 text-white py-4 px-3 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Realignment Season</h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Choose Your Starting Point
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Custom Conferences Option */}
            <button
              onClick={onCustomConferences}
              className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-red-500 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Custom Conferences
                </h3>
              </div>
              <p className="text-gray-600">
                Start from scratch. Create your own conferences and assign teams
                however you want. Perfect for creating hypothetical realignment
                scenarios.
              </p>
            </button>

            {/* Select Season Option */}
            <button
              onClick={onSelectSeason}
              className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Select a Season
                </h3>
              </div>
              <p className="text-gray-600">
                Start with an existing season's conference alignments
                (1978-2025). Make changes to see how realignment could have
                played out differently.
              </p>
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-red-700 text-white py-4 px-3 shadow-lg">
        <p className="text-base text-right">made by glenn jenkins</p>
      </footer>
    </div>
  );
}
