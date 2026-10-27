import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Bileşenler ve Sayfalar
import Navbar from "./components/Navbar"; // Yeni oluşturduğumuz bağımsız Navbar
import Home from "./pages/Home";
import DiseaseDetail from "./pages/DiseaseDetail";
import Biyografi from "./pages/Biyografi";
import ChatBot from "./components/ChatBot";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="bg-[#FAF8F5] text-gray-800 min-h-screen font-sans antialiased selection:bg-[#A68B6D] selection:text-white">
        {/* Navbar burada tek bir yerden tüm sayfalara hizmet verir */}
        <Navbar />

        {/* Navbar 'fixed' olduğu için sayfaların üst üste binmemesi için pt-20 (padding-top) ekleyebilirsiniz */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biyografi" element={<Biyografi />} />
            <Route path="/tedavi/:id" element={<DiseaseDetail />} />
          </Routes>
        </main>

        <ChatBot />
      </div>
    </Router>
  );
}
