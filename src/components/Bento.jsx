import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Carousel from "./Carousel";

export default function Bento({ project, onClose }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      ).fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20, scale: 0.75 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.1",
      );
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  if (!project) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-6 md:p-12"
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-7xl h-full max-h-[85vh] md:max-h-[90vh] relative flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
      >
        <button
          onClick={handleClose}
          className="fixed top-10 right-10 md:top-16 md:right-16 z-160 bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-90 md:hover:scale-110 transition-transform"
        >
          ✕
        </button>

        <div className="flex-1 overflow-y-auto no-scrollbar relative p-0">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full"
          >
            <div className="md:col-span-2 md:row-span-2 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden min-h-[50vh] md:h-full">
              <Carousel images={project.images} />
            </div>

            <div className="md:col-span-2 bg-blue-600 p-10 md:p-14 rounded-[2.5rem] text-white flex flex-col justify-center relative overflow-hidden min-h-[300px] md:h-full">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black select-none pointer-events-none">
                {project.year}
              </div>
              <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight relative z-10">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-3 relative z-10">
                <span className="bg-white/20 px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold uppercase tracking-wider">
                  📅 {project.year}
                </span>
                <span className="bg-white/20 px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold uppercase tracking-wider">
                  💰 {project.cost}
                </span>
              </div>
            </div>

            <div className="md:col-span-1 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 flex flex-col justify-center min-h-[200px] md:h-full">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                Dettagli
              </p>
              <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-medium italic">
                "{project.description}"
              </p>
            </div>

            <div className="md:col-span-1 bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center group border border-black/5 dark:border-white/5 min-h-[200px] md:h-full">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-blue-600/20">
                📍
              </div>
              <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-lg">
                Lugo, RA
              </p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">
                Posizione Verificata
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none z-[150] md:hidden" />
      </div>
    </div>,
    document.body,
  );
}
