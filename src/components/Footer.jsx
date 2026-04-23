import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div>
          <h3 className="text-xl font-bold">N.C Lavori Edili</h3>
          <p className="text-gray-400 text-sm mt-2">
            Costruzioni e Ristrutturazioni
          </p>
        </div>

        <div className="flex flex-col text-sm text-gray-300">
          <span>📍 Indirizzo: Lugo (RA)</span>
          <span>📞 Tel: +39 3336477943</span>
          <span>✉️ Email: nicolaconte999@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
