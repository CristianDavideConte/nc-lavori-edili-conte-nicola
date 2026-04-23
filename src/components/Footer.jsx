export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">N.C Lavori Edili</h3>
          <p className="text-gray-500 text-sm mt-1">
            Costruzioni e Ristrutturazioni
          </p>
        </div>

        <div className="flex flex-col text-sm text-gray-600 space-y-1">
          <span className="flex items-center justify-center md:justify-start gap-2">
            📍 <span className="font-medium text-gray-900">Lugo (RA)</span>
          </span>
          <span className="flex items-center justify-center md:justify-start gap-2">
            📞{" "}
            <a href="tel:+393336477943" className="hover:text-blue-600">
              +39 333 647 7943
            </a>
          </span>
          <span className="flex items-center justify-center md:justify-start gap-2">
            ✉️{" "}
            <a
              href="mailto:nicolaconte999@gmail.com"
              className="hover:text-blue-600"
            >
              nicolaconte999@gmail.com
            </a>
          </span>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} N.C Lavori Edili. Tutti i diritti
        riservati.
      </div>
    </footer>
  );
}
