import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css"; // Il CSS fondamentale di Leaflet
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const center = [44.417, 11.903]; // Lugo (RA)

const cantieriMock = [
  {
    id: 1,
    lat: 44.4172,
    lng: 11.9033,
    titolo: "Villa Residenziale",
    anno: 2023,
    costo: "€250.000",
    desc: "Ristrutturazione completa e cappotto termico.",
  },
  {
    id: 2,
    lat: 44.38,
    lng: 11.92,
    titolo: "Capannone Industriale",
    anno: 2022,
    costo: "€450.000",
    desc: "Nuova costruzione con pannelli solari integrati.",
  },
];

export default function Cantieri() {
  const [selectedCantiere, setSelectedCantiere] = useState(null);

  return (
    <div className="p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white transition-colors">
        I Nostri Cantieri
      </h1>

      <div className="relative shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 transition-colors">
        <div className="h-[600px] w-full z-0 relative">
          <MapContainer
            center={center}
            zoom={11}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {cantieriMock.map((cantiere) => (
              <Marker
                key={cantiere.id}
                position={[cantiere.lat, cantiere.lng]}
                eventHandlers={{
                  click: () => setSelectedCantiere(cantiere),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {selectedCantiere && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center p-4 z-10">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl max-w-md w-full relative shadow-2xl transition-colors duration-300">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white font-bold"
                onClick={() => setSelectedCantiere(null)}
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {selectedCantiere.titolo}
              </h2>
              <p className="text-gray-600 dark:text-slate-300 mb-4">
                <strong>Anno:</strong> {selectedCantiere.anno}
              </p>
              <p className="text-gray-600 dark:text-slate-300 mb-4">
                <strong>Costo:</strong> {selectedCantiere.costo}
              </p>
              <p className="mb-4 text-gray-700 dark:text-slate-200">
                {selectedCantiere.desc}
              </p>

              <div className="h-40 bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-400 rounded">
                [Immagine Cantiere]
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/contatti"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Hai un progetto? Contattaci
        </Link>
      </div>
    </div>
  );
}
