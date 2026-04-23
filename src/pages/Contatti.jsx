import React from "react";

export default function Contatti() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <h1 className="text-4xl font-bold mb-8">Parliamo del tuo progetto</h1>
      <p className="text-lg text-gray-600 dark:text-slate-400 mb-10 max-w-xl">
        Siamo a tua disposizione per preventivi gratuiti e sopralluoghi. Scegli
        il metodo che preferisci per contattarci.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center">
        <a
          href="tel:+393336477943"
          className="flex-1 p-6 border border-gray-200 dark:border-slate-700 rounded-xl hover:shadow-lg dark:hover:bg-slate-800 transition"
        >
          <div className="text-2xl mb-2">📞</div>
          <div className="font-bold">Telefono</div>
          <div className="text-blue-600 dark:text-blue-400">
            +39 333 647 7943
          </div>
        </a>

        <a
          href="https://wa.me/393336477943"
          target="_blank"
          rel="noreferrer"
          className="flex-1 p-6 border border-gray-200 dark:border-slate-700 rounded-xl hover:shadow-lg dark:hover:bg-slate-800 transition"
        >
          <div className="text-2xl mb-2">💬</div>
          <div className="font-bold">WhatsApp</div>
          <div className="text-green-600 dark:text-green-400">
            Scrivici subito
          </div>
        </a>

        <a
          href="mailto:nicolaconte999@gmail.com"
          className="flex-1 p-6 border border-gray-200 dark:border-slate-700 rounded-xl hover:shadow-lg dark:hover:bg-slate-800 transition"
        >
          <div className="text-2xl mb-2">✉️</div>
          <div className="font-bold">Email</div>
          <div className="text-red-600 dark:text-red-400">
            nicolaconte999@gmail.com
          </div>
        </a>
      </div>
    </div>
  );
}
