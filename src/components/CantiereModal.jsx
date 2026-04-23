import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom"; // Importante per il teletrasporto
import gsap from "gsap";
import Carousel from "./Carousel";

export default function CantiereModal({ cantiere, onClose }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (cantiere) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
      ).fromTo(
        modalRef.current,
        { scale: 0.2, y: 400, opacity: 0, transformOrigin: "bottom center" },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.2)" },
        "-=0.1",
      );
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cantiere]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, {
      scale: 0.2,
      y: 400,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.3,
      },
      "-=0.2",
    );
  };

  if (!cantiere) return null;

  // Usiamo createPortal per renderizzare il modale fuori dal contenitore "Cantieri"
  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-md flex justify-center items-center p-4 z-[9999]"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl border border-white/20 dark:border-slate-600/30 p-6 md:p-8 rounded-2xl max-w-lg w-full relative shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
      >
        <button
          className="absolute top-4 right-4 bg-black/5 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 w-8 h-8 rounded-full text-gray-600 dark:text-gray-300 font-bold flex items-center justify-center transition"
          onClick={handleClose}
        >
          ✕
        </button>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 pr-8">
            {cantiere.titolo}
          </h2>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-slate-400 mb-2">
            <span className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
              📅 {cantiere.anno}
            </span>
            <span className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
              💰 {cantiere.costo}
            </span>
          </div>
        </div>

        <Carousel images={cantiere.images} />

        <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-2">
          {cantiere.desc}
        </p>
      </div>
    </div>,
    document.body, // Destinazione del teletrasporto
  );
}
