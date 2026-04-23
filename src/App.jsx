import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cantieri from "./pages/Cantieri";
import Contatti from "./pages/Contatti";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-950 transition-colors duration-300">
        <nav className="p-6 flex justify-between items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/50 fixed w-full z-50 transition-colors duration-300">
          <div className="text-xl font-bold">N.C Lavori Edili</div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Chi Siamo
            </Link>
            <Link
              to="/cantieri"
              className="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              I Nostri Cantieri
            </Link>
            <Link
              to="/contatti"
              className="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Contattaci
            </Link>
          </div>
        </nav>

        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cantieri" element={<Cantieri />} />
            <Route path="/contatti" element={<Contatti />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
