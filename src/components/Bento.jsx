import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Carousel from "./Carousel";
import BentoCard from "./BentoCard";
import { CalendarIcon, EuroIcon, LocationIcon } from "./Icons";
import { useCallback } from "react";

export default function Bento({ project, onClose }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onClose();

        if (window.history.state && window.history.state.modalOpen) {
          window.history.back();
        }
      },
    });
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    const handlePopState = (e) => {
      e.preventDefault();
      handleClose();
    };

    window.history.pushState({ modalOpen: true }, "");
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [project, handleClose]);

  useEffect(() => {
    if (project) {
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

  const locationHref = project.href
    ? project.href
    : project.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${project.address}, ${project.city || ""}`)}`
      : undefined;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto flex justify-center items-start md:items-center p-4 md:p-12"
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="fixed top-5 right-5 md:top-10 md:right-10 z-[160] bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-110 active:scale-90 transition-all"
      >
        ✕
      </button>

      <div
        ref={containerRef}
        className="w-full max-w-7xl relative flex flex-col pt-16 pb-10 md:pt-0"
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
    </div>,
    document.body,
  );
}
