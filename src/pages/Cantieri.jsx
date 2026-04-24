import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import gsap from "gsap";
import Bento from "../components/Bento";

const customIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: "<div style='background-color: #2563eb; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.2); cursor: pointer;'></div>",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function MapRefresher() {
  const map = useMap();

  useEffect(() => {
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
      title: "Ristrutturazione Villa",
      city: "Lugo",
      category: "Residenziale",
      cost: "€€€",
      description: "Intervento di restyling completo.",
    },
    {
      id: 2,
      position: [41.89, 12.49],
      title: "Attico Design",
      city: "Roma",
      category: "Lusso",
      cost: "€€€€",
      description: "Finiture di pregio in centro.",
    },
    {
      id: 3,
      position: [45.46, 9.19],
      title: "Uffici Pro",
      city: "Milano",
      category: "Business",
      cost: "€€€",
      description: "Sede aziendale moderna.",
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      gsap.set([heroContentRef.current.children, mapWrapperRef.current], {
        opacity: 0,
        y: 30,
      });

      tl.to(pageRef.current, { autoAlpha: 1, duration: 0.5 })
        .to(
          heroContentRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .to(
          mapWrapperRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
          },
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
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-24 lg:py-0 px-6">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div ref={heroContentRef} className="w-full lg:flex-1 text-left z-20">
            <h1 className="text-sm uppercase tracking-[0.3em] font-bold text-blue-600 mb-6">
              I nostri lavori — Italia
            </h1>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tighter">
              Qualità in <br /> ogni città.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
              Ogni punto sulla mappa indica un progetto che abbiamo portato a
              termine. Clicca sulle posizioni per scoprire i dettagli del
              lavoro.
            </p>
          </div>

          <div ref={mapWrapperRef} className="w-full lg:flex-[1.4] relative">
            <div className="w-full h-[450px] md:h-[550px] lg:h-[600px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <img
                src="cantieri/wip.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
                alt=""
              />

              <MapContainer
                center={[41.87, 12.56]}
                zoom={5}
                scrollWheelZoom={true}
                wheelPxPerZoomLevel={60}
                zoomControl={false}
                touchZoom={true}
                className="w-full h-full absolute inset-0 z-10"
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <MapRefresher />

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
