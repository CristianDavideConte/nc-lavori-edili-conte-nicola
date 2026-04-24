import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cantieri from "./pages/Cantieri";
import Contatti from "./pages/Contatti";
import Footer from "./components/Footer";

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-950 transition-colors duration-300">
      <Header />

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
