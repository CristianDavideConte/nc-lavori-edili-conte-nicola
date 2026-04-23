import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cantieri from "./pages/Cantieri";
import Contatti from "./pages/Contatti";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-800">
        <nav className="p-6 flex justify-between items-center bg-white shadow-md fixed w-full z-50">
          <div className="text-xl font-bold">N.C Lavori Edili</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-blue-600 font-medium">
              Chi Siamo
            </Link>
            <Link to="/cantieri" className="hover:text-blue-600 font-medium">
              I Nostri Cantieri
            </Link>
            <Link to="/contatti" className="hover:text-blue-600 font-medium">
              Contattaci
            </Link>
          </div>
        </nav>

        {/* Padding top per compensare la navbar fissa */}
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
