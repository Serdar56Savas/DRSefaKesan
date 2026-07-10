import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X, MoveHorizontal } from "lucide-react";

// Sayfa Bileşenleri
import Home from "./pages/Home";
import DiseaseDetail from "./pages/DiseaseDetail";
import Biyografi from "./pages/Biyografi";
import ChatBot from "./components/ChatBot";

// 1. URL'deki Hash'e göre otomatik kaydırma yapan bileşen
function ScrollToHash() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Eğer sayfada bir hash varsa (#galeri, #iletisim gibi)
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Eğer hash yoksa (ana sayfa), sayfayı en tepeye al
      window.scrollTo(0, 0);
    }

    // YENİLEME DURUMUNDA URL'İ TEMİZLEME:
    // Eğer tarayıcıda bir hash varsa ve bu bir sayfa yenilemeyse (load),
    // bunu ana sayfa '/' olarak sıfırla:
    if (
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD &&
      hash
    ) {
      window.history.replaceState(null, "", "/");
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToHash />
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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const handleNavClick = (item) => {
    setIsOpen(false);
    if (item.type === "page") {
      navigate(item.path);
    } else {
      // Eğer ana sayfada değilsek hash ile ana sayfaya yönlendir
      if (!isHomePage) {
        navigate(`/#${item.id}`);
      } else {
        // Ana sayfadaysak doğrudan kaydır
        document
          .getElementById(item.id)
          ?.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${item.id}`);
      }
    }
  };

  const navItems = isHomePage
    ? [
        { name: "Giriş", id: "hero", type: "section" },
        { name: "Dr. Sefa Keşan", path: "/biyografi", type: "page" },
        { name: "Uzmanlık Alanları", id: "uzmanlik", type: "section" },
        { name: "Öncesi / Sonrası", id: "galeri", type: "section" },
        { name: "İletişim", id: "iletisim", type: "section" },
      ]
    : [
        { name: "Ana Sayfa", path: "/", type: "page" },
        { name: "Dr. Sefa Keşan", path: "/biyografi", type: "page" },
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
            className="px-5 py-2.5 bg-gold text-black text-xs uppercase tracking-wider font-medium hover:bg-yellow-600 transition-colors"
          >
            Randevu Al
          </button>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-gray-900"
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
              className="text-left py-2 text-gray-300 hover:text-gold"
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
