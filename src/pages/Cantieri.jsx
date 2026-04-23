import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Link } from "react-router-dom";
import gsap from "gsap";
import L from "leaflet";
import Bento from "../components/Bento";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const projectsMock = [
  {
    id: 1,
    lat: 44.4172,
    lng: 11.9033,
    title: "Villa Residenziale",
    year: 2023,
    cost: "€250.000",
    description: "Ristrutturazione completa e cappotto termico.",
    images: ["cantieri/wip.jpg", "cantieri/wip.jpg"],
  },
  {
    id: 2,
    lat: 44.38,
    lng: 11.92,
    title: "Capannone Industriale",
    year: 2022,
    cost: "€450.000",
    description: "Nuova costruzione con pannelli solari integrati.",
    images: [],
  },
];

export default function Cantieri() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMapActive, setIsMapActive] = useState(false);
  const mapContainerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedProject) return;
      if (
        mapContainerRef.current &&
        !mapContainerRef.current.contains(e.target)
      ) {
        setIsMapActive(false);
      }
    };
    if (isMapActive) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isMapActive, selectedProject]);

  return (
    <div className="p-4 md:p-12 opacity-0" ref={pageRef}>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        I Nostri Cantieri
      </h1>

      <div
        ref={mapContainerRef}
        className="relative shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 mx-auto max-w-6xl bg-gray-100 dark:bg-slate-800"
      >
        {!isMapActive && L.Browser.mobile && (
          <div
            className="absolute inset-0 z-[20] bg-white/10 dark:bg-slate-900/10 backdrop-blur-[2px] flex items-center justify-center cursor-pointer"
            onClick={() => setIsMapActive(true)}
          >
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 shadow-xl text-sm font-semibold">
              📍 Tocca per esplorare
            </div>
          </div>
        )}

        {isMapActive && L.Browser.mobile && (
          <button
            className="absolute top-4 right-4 z-[20] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-xl text-xs font-bold"
            onClick={() => setIsMapActive(false)}
          >
            🔒 Blocca Scorrimento
          </button>
        )}

        <div
          className={`h-[350px] md:h-[600px] w-full relative transition-opacity duration-300 ${!isMapActive && L.Browser.mobile ? "opacity-70 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
        >
          <MapContainer
            center={[44.417, 11.903]}
            zoom={11}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {projectsMock.map((project) => (
              <Marker
                key={project.id}
                position={[project.lat, project.lng]}
                eventHandlers={{ click: () => setSelectedProject(project) }}
              />
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="mt-12 text-center pb-8">
        <Link
          to="/contatti"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg"
        >
          Hai un progetto? Contattaci
        </Link>
      </div>

      <Bento
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
