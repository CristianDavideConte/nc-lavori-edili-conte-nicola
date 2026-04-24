import { useState, useRef, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import gsap from "gsap";
import Home from "./pages/Home";
import Cantieri from "./pages/Cantieri";
import Contatti from "./pages/Contatti";
import Footer from "./components/Footer";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
      );
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.4)",
          delay: 0.1,
        },
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const openMenu = () => setIsMenuOpen(true);

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setIsMenuOpen(false),
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-950 transition-colors duration-300">
      <nav className="p-6 flex justify-between items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border-b border-gray-200/50 dark:border-slate-800/50 fixed w-full z-50 transition-colors duration-300">
        <div className="text-xl font-bold">N.C Lavori Edili</div>

        <div className="hidden md:flex gap-8">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Chi Siamo
          </Link>
          <Link
            to="/cantieri"
            className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            I Nostri Cantieri
          </Link>
          <Link
            to="/contatti"
            className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Contattaci
          </Link>
        </div>

        <button
          onClick={openMenu}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 focus:outline-none p-2"
          aria-label="Apri Menu"
        >
          <span className="block w-6 h-0.5 bg-current"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          ref={menuRef}
          onClick={closeMenu}
          className="fixed inset-0 z-[60] bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-center cursor-pointer"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeMenu();
            }}
            className="absolute top-6 right-6 w-10 h-10 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-xl font-bold cursor-pointer"
            aria-label="Chiudi Menu"
          >
            ✕
          </button>

          <div className="flex flex-col gap-10 text-center">
            <Link
              ref={(el) => (linksRef.current[0] = el)}
              to="/"
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
              className="text-4xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Chi Siamo
            </Link>
            <Link
              ref={(el) => (linksRef.current[1] = el)}
              to="/cantieri"
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
              className="text-4xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              I Nostri Cantieri
            </Link>
            <Link
              ref={(el) => (linksRef.current[2] = el)}
              to="/contatti"
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
              className="text-4xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Contattaci
            </Link>
          </div>
        </div>
      )}

      <main className="flex-grow pt-20 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cantieri" element={<Cantieri />} />
          <Route path="/contatti" element={<Contatti />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
