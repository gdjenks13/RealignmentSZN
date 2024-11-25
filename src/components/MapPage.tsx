import { Link } from "react-router-dom";
import MapComponent from './MapComponent';

export function MapPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-red-700 text-white py-6 px-4 shadow-lg">
                <div className="max-w-full mx-auto flex justify-center items-center">
                <Link to="/" className="absolute left-4">
                    <button className="bg-white text-black font-bold px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
                    Return Home
                    </button>
                </Link>
                <h1 className="text-3xl font-bold">Realignment SZN</h1>
                </div>
            </header>

            <main className="flex justify-center items-center" style={{ height: 'calc(100vh - 96px)' }}>
                <MapComponent />
            </main>
        </div>
      );
}

export default MapPage;