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

const cantieriMock = [
  {
    id: 1,
    lat: 44.4172,
    lng: 11.9033,
    titolo: "Villa Residenziale",
    anno: 2023,
    costo: "€250.000",
    desc: "Ristrutturazione completa e cappotto termico.",
    images: ["/cantieri/wip.jpg"],
  },
  {
    id: 2,
    lat: 44.38,
    lng: 11.92,
    titolo: "Capannone Industriale",
    anno: 2022,
    costo: "€450.000",
    desc: "Nuova costruzione con pannelli solari integrati.",
    images: [],
  },
];

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
  const prevIndex = useRef(0);
  const direction = useRef(1);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

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

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!images || images.length === 0) return;

    if (images.length === 1 || currentIndex === prevIndex.current) {
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
      prevIndex.current = currentIndex;
      return;
    }

    const oldImg = imageRefs.current[prevIndex.current];
    const newImg = imageRefs.current[currentIndex];
    const dir = direction.current;

    gsap.set(newImg, { zIndex: 10 });
    gsap.set(oldImg, { zIndex: 5 });

    gsap.to(oldImg, {
      scale: 0.5,
      opacity: 0,
      xPercent: dir * -50,
      duration: 0.4,
      ease: "power2.in",
    });

    gsap.fromTo(
      newImg,
      { scale: 0.5, opacity: 0, xPercent: dir * 50 },
      {
        scale: 1,
        opacity: 1,
        xPercent: 0,
        duration: 0.8,
        ease: "bounce.out",
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
    <div
      className="relative w-full h-48 md:h-64 bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden group touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, index) => (
        <img
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          src={`${import.meta.env.BASE_URL}${img.replace(/^\//, "")}`}
          alt={`Cantiere foto ${index + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
        />
      ))}

      {images.length > 1 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white w-8 h-8 rounded-full opacity-0 md:group-hover:opacity-100 transition pointer-events-auto flex items-center justify-center border border-white/20 shadow-sm"
          >
            &#8592;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white w-8 h-8 rounded-full opacity-0 md:group-hover:opacity-100 transition pointer-events-auto flex items-center justify-center border border-white/20 shadow-sm"
          >
            &#8594;
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white scale-125 shadow-sm"
                    : "bg-white/50 hover:bg-white/90"
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
  const [isMapActive, setIsMapActive] = useState(false);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const mapContainerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedCantiere) return;
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
  }, [isMapActive, selectedCantiere]);

  useEffect(() => {
    if (selectedCantiere) {
      document.body.style.overflow = "hidden";
      if (modalRef.current && overlayRef.current) {
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
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
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
    <div className="p-4 md:p-12 opacity-0" ref={pageRef}>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white transition-colors">
        I Nostri Cantieri
      </h1>

      <div
        ref={mapContainerRef}
        className="relative shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 transition-colors mx-auto max-w-6xl bg-gray-100 dark:bg-slate-800"
      >
        {!isMapActive && L.Browser.mobile && (
          <div
            className="absolute inset-0 z-[20] bg-white/10 dark:bg-slate-900/10 backdrop-blur-[2px] flex items-center justify-center cursor-pointer"
            onClick={() => setIsMapActive(true)}
          >
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 dark:border-slate-600 shadow-xl text-sm font-semibold text-gray-900 dark:text-white transform transition active:scale-95">
              📍 Tocca per esplorare la mappa
            </div>
          </div>
        )}

        {isMapActive && L.Browser.mobile && (
          <button
            className="absolute top-4 right-4 z-[20] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-slate-600 shadow-xl text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2 transform transition active:scale-95"
            onClick={() => setIsMapActive(false)}
          >
            🔒 Blocca Scorrimento
          </button>
        )}

        <div
          className={`h-[350px] md:h-[600px] w-full relative transition-opacity duration-300 ${!isMapActive && L.Browser.mobile ? "opacity-70 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
        >
          <MapContainer
            center={center}
            zoom={11}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
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
      </div>

      <div className="mt-12 text-center pb-8">
        <Link
          to="/contatti"
          className="px-8 py-4 bg-blue-600/90 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-lg shadow-blue-600/20"
        >
          Hai un progetto? Contattaci
        </Link>
      </div>

      {selectedCantiere && (
        <div
          ref={overlayRef}
          className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-[100]"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl border border-white/20 dark:border-slate-600/30 p-6 md:p-8 rounded-2xl max-w-lg w-full relative shadow-2xl transition-colors duration-300 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
          >
            <button
              className="absolute top-4 right-4 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 w-8 h-8 rounded-full text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-bold flex items-center justify-center transition"
              onClick={closeModal}
            >
              ✕
            </button>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 pr-8">
                {selectedCantiere.titolo}
              </h2>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-slate-400 mb-2">
                <span className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                  📅 {selectedCantiere.anno}
                </span>
                <span className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
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
  );
}
