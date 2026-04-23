import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const center = [44.417, 11.903];

// 1. Mock aggiornato con ARRAY di immagini
const cantieriMock = [
  {
    id: 1,
    lat: 44.4172,
    lng: 11.9033,
    titolo: "Villa Residenziale",
    anno: 2023,
    costo: "€250.000",
    desc: "Ristrutturazione completa e cappotto termico.",
    images: ["cantieri/wip.jpg", "cantieri/wip.jpg"],
  },
  {
    id: 2,
    lat: 44.38,
    lng: 11.92,
    titolo: "Capannone Industriale",
    anno: 2022,
    costo: "€450.000",
    desc: "Nuova costruzione con pannelli solari integrati.",
    images: ["cantieri/wip.jpg", "cantieri/wip.jpg"],
  },
];

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
  const prevIndex = useRef(0);
  const direction = useRef(1);

  const nextSlide = () => {
    direction.current = 1;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    direction.current = -1;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (idx) => {
    if (idx === currentIndex) return;
    direction.current = idx > currentIndex ? 1 : -1;
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (!images || images.length <= 1) return;

    if (currentIndex === prevIndex.current) {
      gsap.set(imageRefs.current, {
        opacity: 0,
        scale: 0.5,
        xPercent: 0,
        zIndex: 0,
      });
      gsap.set(imageRefs.current[currentIndex], {
        opacity: 1,
        scale: 1,
        xPercent: 0,
        zIndex: 10,
      });
      return;
    }

    const oldImg = imageRefs.current[prevIndex.current];
    const newImg = imageRefs.current[currentIndex];
    const dir = direction.current;

    gsap.set(newImg, { zIndex: 10 });
    gsap.set(oldImg, { zIndex: 5 });

    gsap.to(oldImg, {
      scale: 0.9,
      opacity: 0,
      xPercent: dir * -50,
      duration: 0.5,
      ease: "fade",
    });

    gsap.fromTo(
      newImg,
      { scale: 0.8, opacity: 0, xPercent: dir * 50 },
      {
        scale: 1,
        opacity: 1,
        xPercent: 0,
        duration: 0.6,
        ease: "power2.out",
      },
    );

    prevIndex.current = currentIndex;
  }, [currentIndex, images]);

  if (!images || images.length === 0)
    return (
      <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center">
        Nessuna foto
      </div>
    );

  return (
    <div className="relative w-full h-48 md:h-64 bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden group">
      {images.map((img, index) => (
        <img
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          src={`${import.meta.env.BASE_URL}${img.replace(/^\//, "")}`}
          alt={`Cantiere foto ${index + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0"
        />
      ))}

      {images.length > 1 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition pointer-events-auto flex items-center justify-center"
          >
            &#8592;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition pointer-events-auto flex items-center justify-center"
          >
            &#8594;
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Vai alla foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Cantieri() {
  const [selectedCantiere, setSelectedCantiere] = useState(null);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (selectedCantiere && modalRef.current && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );

      gsap.fromTo(
        modalRef.current,
        { scale: 0.2, y: 400, opacity: 0, transformOrigin: "bottom center" },
        { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
      );
    }
  }, [selectedCantiere]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.2,
      y: 400,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => setSelectedCantiere(null),
    });
  };

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
                eventHandlers={{ click: () => setSelectedCantiere(cantiere) }}
              />
            ))}
          </MapContainer>
        </div>

        {selectedCantiere && (
          <div
            ref={overlayRef}
            className="absolute top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center p-4 z-10"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl max-w-lg w-full relative shadow-2xl transition-colors duration-300 flex flex-col gap-4"
            >
              <button
                className="absolute top-4 right-4 bg-gray-100 dark:bg-slate-700 w-8 h-8 rounded-full text-gray-500 hover:text-black dark:hover:text-white font-bold flex items-center justify-center transition"
                onClick={closeModal}
              >
                ✕
              </button>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 pr-8">
                  {selectedCantiere.titolo}
                </h2>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-slate-400 mb-2">
                  <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                    📅 {selectedCantiere.anno}
                  </span>
                  <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                    💰 {selectedCantiere.costo}
                  </span>
                </div>
              </div>

              <Carousel images={selectedCantiere.images} />

              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-2">
                {selectedCantiere.desc}
              </p>
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
