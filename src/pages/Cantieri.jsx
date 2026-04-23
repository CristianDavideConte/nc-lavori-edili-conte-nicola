import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
// 1. IMPORTANTE: Questo deve essere presente per dare altezza alla mappa
import "leaflet/dist/leaflet.css";
import gsap from "gsap";
import BentoCard from "../components/BentoCard";
import Bento from "../components/Bento";

const customIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: "<div style='background-color: #2563eb; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3); cursor: pointer;'></div>",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// 2. Fix fondamentale: forza la mappa a ricalcolare le dimensioni
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    // Ricalcola la dimensione ogni volta che il browser cambia risoluzione
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    window.addEventListener("resize", () => map.invalidateSize());
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", () => map.invalidateSize());
    };
  }, [map]);
  return null;
}

export default function Cantieri() {
  const pageRef = useRef(null);
  const heroContentRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      position: [44.42, 11.91],
      title: "Villa Storica",
      city: "Lugo",
      category: "Ristrutturazione",
      cost: "€€€",
      description: "Restauro conservativo.",
    },
    {
      id: 2,
      position: [41.89, 12.49],
      title: "Attico Roma",
      city: "Roma",
      category: "Lusso",
      cost: "€€€€",
      description: "Design moderno.",
    },
    {
      id: 3,
      position: [45.46, 9.19],
      title: "Uffici Milano",
      city: "Milano",
      category: "Industriale",
      cost: "€€€",
      description: "Sede aziendale.",
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(pageRef.current, { autoAlpha: 1, duration: 0.4 })
        .fromTo(
          heroContentRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          mapWrapperRef.current,
          { y: 40, scale: 0.9, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.5",
        );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-white dark:bg-slate-950 min-h-screen"
      style={{ visibility: "hidden" }}
    >
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 lg:py-0 px-6">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div ref={heroContentRef} className="w-full lg:flex-1 text-left z-20">
            <h1 className="text-sm uppercase tracking-[0.3em] font-bold text-blue-600 mb-6">
              I nostri lavori — Italia
            </h1>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tighter uppercase">
              Qualità in <br /> ogni città.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
              Ogni punto sulla mappa indica un progetto completato. Clicca sulle
              posizioni per scoprire i dettagli del lavoro.
            </p>
          </div>

          <div ref={mapWrapperRef} className="w-full lg:flex-[1.5] relative">
            {/* 3. ALTEZZA FISSA: Cruciale per evitare altezza 0 su mobile */}
            <div className="w-full h-[450px] md:h-[550px] lg:h-[600px] relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 bg-slate-100">
              {/* Placeholder WIP visibile se la mappa non carica */}
              <img
                src="cantieri/wip.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-10"
                alt=""
              />

              <MapContainer
                center={[41.87, 12.56]}
                zoom={5}
                scrollWheelZoom={false}
                zoomControl={false}
                style={{ height: "100%", width: "100%" }} // Forza l'altezza al 100% del div genitore
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <MapResizer />

                {projectsData.map((project) => (
                  <Marker
                    key={project.id}
                    position={project.position}
                    icon={customIcon}
                    eventHandlers={{ click: () => setSelectedProject(project) }}
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <Bento
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
