import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const openMenu = () => setIsMenuOpen(true);

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsMenuOpen(false);
        if (window.history.state?.menuOpen) {
          window.history.back();
        }
      },
    });
  };

  const handleNavigation = (path) => {
    if (path === location.pathname) {
      closeMenu();
      return;
    }

    navigate(path);
    closeMenu();
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      window.history.pushState({ menuOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="p-6 flex justify-between items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border-b border-gray-200/50 dark:border-slate-800/50 fixed w-full z-50 transition-colors duration-300">
        <div className="text-xl font-bold">N.C Lavori Edili</div>

        <div className="hidden md:flex gap-8">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 uppercase font-medium transition-colors"
          >
            Chi Siamo
          </Link>
          <Link
            to="/cantieri"
            className="hover:text-blue-600 dark:hover:text-blue-400 uppercase font-medium transition-colors"
          >
            I Nostri Cantieri
          </Link>
          <Link
            to="/contatti"
            className="hover:text-blue-600 dark:hover:text-blue-400 uppercase font-medium transition-colors"
          >
            Contattaci
          </Link>
        </div>

        <button
          onClick={openMenu}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-0.5 bg-current"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[100] bg-white/98 dark:bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center"
        >
          <button
            onClick={closeMenu}
            className="absolute top-5 right-5 md:top-10 md:right-10 z-[160] bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-110 active:scale-90 transition-all"
          >
            ✕
          </button>

          <div className="flex flex-col gap-10 text-center font-bold">
            <button
              ref={(el) => (linksRef.current[0] = el)}
              onClick={() => handleNavigation("/")}
              className="text-4xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Chi Siamo
            </button>
            <button
              ref={(el) => (linksRef.current[1] = el)}
              onClick={() => handleNavigation("/cantieri")}
              className="text-4xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              I Nostri Cantieri
            </button>
            <button
              ref={(el) => (linksRef.current[2] = el)}
              onClick={() => handleNavigation("/contatti")}
              className="text-4xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contattaci
            </button>
          </div>
        </div>
      )}
    </>
  );
}
