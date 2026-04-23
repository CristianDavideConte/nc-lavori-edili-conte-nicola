import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Home() {
  const heroRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    // GSAP Animation all'avvio
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
    );
  }, []);

  const scrollToDesc = () => {
    descRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center p-4 bg-gray-50"
        ref={heroRef}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          N.C Lavori Edili
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-600">
          Costruiamo il futuro, con fondamenta solide.
        </p>
        <button
          onClick={scrollToDesc}
          className="animate-bounce p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          ↓ Scopri di più
        </button>
      </section>

      {/* Descrizione Azienda */}
      <section
        className="min-h-screen py-20 px-6 md:px-20 max-w-5xl mx-auto flex flex-col justify-center"
        ref={descRef}
      >
        <h2 className="text-3xl font-bold mb-6">La Nostra Storia</h2>
        <div className="text-lg leading-relaxed mb-12 space-y-4">
          <p>
            Fondata con la passione per il mattone e l'innovazione,{" "}
            <strong>N.C Lavori Edili</strong> opera sul territorio nazionale
            garantendo qualità e sicurezza.
          </p>
          <p>
            Siamo specializzati in ristrutturazioni chiavi in mano, nuove
            costruzioni civili e industriali, e riqualificazione energetica.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link
            to="/cantieri"
            className="px-8 py-4 bg-gray-900 text-white text-center font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Esplora i nostri cantieri
          </Link>
          <Link
            to="/contatti"
            className="px-8 py-4 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Contattaci Ora
          </Link>
        </div>
      </section>
    </div>
  );
}
