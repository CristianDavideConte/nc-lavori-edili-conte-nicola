import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Carousel from "./Carousel";
import BentoCard from "./BentoCard";
import { CalendarIcon, EuroIcon, LocationIcon } from "./Icons";

export default function Bento({ project, onClose }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const isClosing = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const closeAnimation = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onCloseRef.current();
      },
    });
  }, []);

  useEffect(() => {
    if (!project) return;

    window.history.pushState({ modalOpen: true }, "");

    const handlePopState = () => {
      closeAnimation();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [project, closeAnimation]);

  const handleUserClose = useCallback(
    (e) => {
      if (e) e.stopPropagation();

      if (window.history.state && window.history.state.modalOpen) {
        window.history.back();
      } else {
        closeAnimation();
      }
    },
    [closeAnimation],
  );

  useEffect(() => {
    if (project) {
      isClosing.current = false;
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );
      gsap.fromTo(
        containerRef.current,
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  if (!project) return null;

  const locationQuery = project.address
    ? `${project.address}, ${project.city || ""}`
    : project.city;

  const locationHref = locationQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`
    : undefined;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 flex flex-col h-[100dvh] overflow-hidden"
      onClick={handleUserClose}
    >
      <button
        onClick={handleUserClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-[160] bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-110 active:scale-90 transition-all"
      >
        ✕
      </button>

      <div className="flex-1 overflow-y-auto w-full">
        <div className="min-h-full flex items-center justify-center py-24 md:py-12 px-4 md:px-12">
          <div
            ref={containerRef}
            className="w-full max-w-7xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[minmax(320px,_auto)]">
              <BentoCard
                className="md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[450px]"
                noPadding
                bg="bg-slate-100 dark:bg-slate-900"
              >
                <Carousel
                  images={
                    project.images && project.images.length > 0
                      ? project.images
                      : ["cantieri/wip.jpg"]
                  }
                />
              </BentoCard>

              <BentoCard
                className="md:col-span-2 min-h-[250px] md:min-h-[300px] text-white"
                bg="bg-blue-600"
              >
                <div className="flex flex-col justify-center h-full">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-8 line-clamp-2 break-words">
                    {project.title}
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest">
                      <CalendarIcon />
                      <span>{project.year || "2024"}</span>
                    </span>

                    <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest">
                      <EuroIcon />
                      <span>{project.cost || "€€€"}</span>
                    </span>
                  </div>
                </div>
              </BentoCard>

              <BentoCard bg="bg-white dark:bg-slate-800">
                <div className="flex flex-col justify-center h-full">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Dettagli
                  </p>
                  <p className="text-lg md:text-xl font-medium italic text-slate-700 dark:text-slate-200 leading-relaxed">
                    "{project.description}"
                  </p>
                </div>
              </BentoCard>

              <BentoCard
                className="min-h-[180px] md:min-h-[300px] group"
                bg="bg-slate-50 dark:bg-slate-900/50"
                href={locationHref}
              >
                <div className="flex flex-col items-center justify-center text-center h-full w-full">
                  <div className="text-3xl md:text-4xl mb-4 text-slate-700 dark:text-slate-300">
                    <LocationIcon />
                  </div>
                  <p className="font-black text-slate-900 dark:text-white uppercase text-base md:text-lg tracking-tighter">
                    {project.city || "Emilia-Romagna"}
                  </p>
                  {project.address && (
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
                      {project.address}
                    </p>
                  )}
                  {locationHref && (
                    <p className="text-[10px] text-blue-600 dark:text-blue-500 font-bold uppercase mt-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Apri in Maps →
                    </p>
                  )}
                </div>
              </BentoCard>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
