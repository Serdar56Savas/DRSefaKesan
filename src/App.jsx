import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X } from "lucide-react";

// Sayfa Bileşenleri
import Home from "./pages/Home";
import DiseaseDetail from "./pages/DiseaseDetail";
import Biyografi from "./pages/Biyografi";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <Router>
      <div className="bg-darkBg text-gray-200 min-h-screen font-sans antialiased selection:bg-gold selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biyografi" element={<Biyografi />} />
          <Route path="/tedavi/:id" element={<DiseaseDetail />} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

// DINAMIK NAVBAR BİLEŞENİ
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Şu an ana sayfada olup olmadığımızı kontrol ediyoruz
  const isHomePage = location.pathname === "/";

  // Menü tıklamalarını yöneten akıllı fonksiyon
  const handleNavClick = (item) => {
    setIsOpen(false);

    if (item.type === "page") {
      navigate(item.path);
    } else {
      if (!isHomePage) {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(item.id)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document
          .getElementById(item.id)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // 🌟 SAYFAYA GÖRE DEĞİŞEN DİNAMİK MENÜ ELEMANLARI 🌟
  const navItems = isHomePage
    ? [
        // Sadece Ana Sayfada Gösterilecek Menü
        { name: "Giriş", id: "hero", type: "section" },
        { name: "Dr. Sefa Keşan", path: "/biyografi", type: "page" },
        { name: "Uzmanlık Alanları", id: "uzmanlik", type: "section" },
        { name: "Öncesi / Sonrası", id: "galeri", type: "section" },
        { name: "İletişim", id: "iletisim", type: "section" },
      ]
    : [
        // Detay Sayfalarında (Hastalık detayı, Biyografi vb.) Gösterilecek Sade Menü
        // { name: 'Ana Sayfa', path: '/', type: 'page' },
        // { name: 'Dr. Sefa Keşan', path: '/biyografi', type: 'page' },
      ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-darkBg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-xl tracking-widest text-gray-900 hover:text-gold transition-colors"
        >
          DR. SEFA <span className="text-gold font-light">KEŞAN</span>
        </Link>

        {/* Desktop Menü */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item)}
              className="text-sm tracking-wide text-gray-400 hover:text-gold cursor-pointer transition-colors"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => handleNavClick({ id: "iletisim", type: "section" })}
            className="px-5 py-2.5 bg-gold text-black text-xs uppercase tracking-wider font-medium hover:bg-yellow-600 cursor-pointer transition-colors"
          >
            Randevu Al
          </button>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-gray-900 cursor-pointer"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobil Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-darkBg border-b border-white/5 px-6 py-6 flex flex-col gap-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item)}
              className="text-left py-2 text-gray-300 hover:text-gold cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default App;
