import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 py-10 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            N.C Lavori Edili
          </h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
            Costruzioni e Ristrutturazioni
          </p>
        </div>

        <div className="flex flex-col text-sm text-gray-600 dark:text-slate-300 space-y-1">
          <span className="flex items-center justify-center md:justify-start gap-2">
            📍{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              Lugo (RA)
            </span>
          </span>
          <span className="flex items-center justify-center md:justify-start gap-2">
            📞{" "}
            <a
              href="tel:+393336477943"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              +39 333 647 7943
            </a>
          </span>
          <span className="flex items-center justify-center md:justify-start gap-2">
            ✉️{" "}
            <a
              href="mailto:nicolaconte999@gmail.com"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              nicolaconte999@gmail.com
            </a>
          </span>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400 dark:text-slate-500">
        © {new Date().getFullYear()} N.C Lavori Edili. Tutti i diritti
        riservati.
      </div>
    </footer>
  );
}
