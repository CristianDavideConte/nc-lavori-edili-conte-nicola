import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";

const mapContainerStyle = { width: "100%", height: "600px" };
const center = { lat: 44.417, lng: 11.903 };

const cantieriMock = [
  {
    id: 1,
    lat: 44.4172,
    lng: 11.9033,
    titolo: "Villa Residenziale",
    anno: 2023,
    costo: "€250.000",
    desc: "Ristrutturazione completa e cappotto termico.",
    img: "link-img.jpg",
  },
  // TODO: new worksites
];

export default function Cantieri() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "INSERISCI_QUI_LA_TUA_API_KEY", // Da sostituire
  });

  const [selectedCantiere, setSelectedCantiere] = useState(null);

  if (loadError) return <div>Errore nel caricamento della mappa</div>;
  if (!isLoaded) return <div>Caricamento mappa...</div>;

  return (
    <div className="p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center">I Nostri Cantieri</h1>

      <div className="relative shadow-xl rounded-lg overflow-hidden border">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
        >
          {cantieriMock.map((cantiere) => (
            <Marker
              key={cantiere.id}
              position={{ lat: cantiere.lat, lng: cantiere.lng }}
              onClick={() => setSelectedCantiere(cantiere)}
            />
          ))}
        </GoogleMap>

        {/* Modale Cantiere */}
        {selectedCantiere && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-8 rounded-xl max-w-md w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold"
                onClick={() => setSelectedCantiere(null)}
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-2">
                {selectedCantiere.titolo}
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>Anno:</strong> {selectedCantiere.anno}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Costo:</strong> {selectedCantiere.costo}
              </p>
              <p className="mb-4">{selectedCantiere.desc}</p>
              {/* Qui andrebbero i tag <img> per le foto prima/dopo */}
              <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
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
