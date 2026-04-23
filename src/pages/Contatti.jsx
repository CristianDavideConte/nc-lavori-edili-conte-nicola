import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contatti() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current.children[0],
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      )
        .fromTo(
          containerRef.current.children[1],
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          cardsRef.current,
          { opacity: 0, y: 40, scale: 0.6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.3,
            ease: "back.out(1.2)",
          },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center"
      ref={containerRef}
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white transition-colors opacity-0">
        Parliamo del tuo progetto
      </h1>

      <p className="text-lg text-gray-600 dark:text-slate-400 mb-10 max-w-xl transition-colors opacity-0">
        Siamo a tua disposizione per preventivi gratuiti e sopralluoghi. Scegli
        il metodo che preferisci per contattarci.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center">
        <a
          ref={(el) => (cardsRef.current[0] = el)}
          href="tel:+393336477943"
          className="flex-1 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl opacity-0"
        >
          <div className="text-3xl mb-3">📞</div>
          <div className="font-bold text-gray-900 dark:text-white mb-1">
            Telefono
          </div>
          <div className="text-blue-600 dark:text-blue-400 font-medium">
            +39 333 647 7943
          </div>
        </a>

        <a
          ref={(el) => (cardsRef.current[1] = el)}
          href="https://wa.me/393336477943"
          target="_blank"
          rel="noreferrer"
          className="flex-1 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl opacity-0"
        >
          <div className="text-3xl mb-3">💬</div>
          <div className="font-bold text-gray-900 dark:text-white mb-1">
            WhatsApp
          </div>
          <div className="text-green-600 dark:text-green-400 font-medium">
            Scrivici subito
          </div>
        </a>

        <a
          ref={(el) => (cardsRef.current[2] = el)}
          href="mailto:nicolaconte999@gmail.com"
          className="flex-1 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl opacity-0"
        >
          <div className="text-3xl mb-3">✉️</div>
          <div className="font-bold text-gray-900 dark:text-white mb-1">
            Email
          </div>
          <div className="text-red-600 dark:text-red-400 font-medium">
            nicolaconte999@gmail.com
          </div>
        </a>
      </div>
    </div>
  );
}
