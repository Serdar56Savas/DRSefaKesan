import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowLeft, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const isBiographyPage = location.pathname === "/biyografi";
  const isHomePage = location.pathname === "/";

  // WhatsApp Numarası
  const whatsappNumber = "905369242558";
  const whatsappMessage = encodeURIComponent(t("whatsappDefaultMessage"));

  // Dinamik Çok Dilli Hizmet Listesi
  const servicesList = [
    {
      category: t("navbar.categories.rhinoplasty"),
      name: t("navbar.items.primerRhinoplasty"),
      path: "/tedavi/rinoplasti",
    },
    {
      category: t("navbar.categories.revisionRhinoplasty"),
      name: t("navbar.items.revisionRhinoplasty"),
      path: "/tedavi/revizyon-rinoplasti",
    },
    {
      category: t("navbar.categories.otoplasty"),
      name: t("navbar.items.otoplasty"),
      path: "/tedavi/otoplasti",
    },
    {
      category: t("navbar.categories.fatGrafting"),
      name: t("navbar.items.fatGrafting"),
      path: "/tedavi/yag-enjeksiyonu",
    },
    {
      category: t("navbar.categories.bichectomy"),
      name: t("navbar.items.bichectomy"),
      path: "/tedavi/bisektomi",
    },
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (!isHomePage) {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceClick = (path) => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
    navigate(path);
  };

  // 1. Biyografi Sayfası Minimalist Üst Bar
  if (isBiographyPage) {
    return (
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-gray-200/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-all font-medium group cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="transform group-hover:-translate-x-1 transition-transform"
            />
            <span>{t("biographyPage.back")}</span>
          </button>

          <div className="flex items-center gap-6">
            <LanguageSelector />
            <div className="text-right leading-tight hidden sm:block">
              <span className="font-serif text-sm tracking-[0.15em] font-light text-gray-900 block uppercase">
                Op. Dr. Sefa Keşan
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#A68B6D] font-semibold block">
                {t("biographyPage.role")}
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // 2. Çok Dilli Mega Dropdown Navbar
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-gray-200/60 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div
          className="cursor-pointer"
          onClick={() => {
            if (!isHomePage) navigate("/");
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="font-serif text-lg tracking-[0.15em] font-light text-gray-900 block uppercase">
            Op. Dr. Sefa Keşan
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#A68B6D] font-semibold block">
            {t("navbar.clinicSubtitle")}
          </span>
        </div>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-gray-600">
          {/* HİZMETLERİMİZ MEGA DROPDOWN */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1 uppercase hover:text-gray-900 transition-colors cursor-pointer tracking-[0.15em]"
            >
              {t("navbar.services")}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isServicesOpen ? "rotate-180 text-[#A68B6D]" : ""
                }`}
              />
            </button>

            {/* İki Kolonlu Mega Dropdown */}
            {isServicesOpen && (
              <div className="absolute top-full -left-16 w-[640px] bg-[#FAF8F5] border border-gray-200/80 shadow-2xl rounded-2xl overflow-hidden grid grid-cols-12 z-50">
                {/* Sol Kolon: Görsel & İletişim */}
                <div className="col-span-5 relative min-h-[300px] bg-gray-900 text-white flex flex-col justify-end p-5 overflow-hidden group">
                  <img
                    src="/images/sefa-kesan-hastane.jpg"
                    alt="Op. Dr. Sefa Keşan"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  <div className="relative z-10">
                    <p className="text-[11px] font-light leading-snug text-gray-200 mb-3">
                      {t("navbar.contactInfoText")}
                    </p>

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-3 border border-white/60 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-semibold rounded transition-all"
                    >
                      <MessageCircle size={14} className="text-green-400" />
                      <span>+90 536 924 25 58</span>
                    </a>
                  </div>
                </div>

                {/* Sağ Kolon: Sitedeki Hizmet Listesi */}
                <div className="col-span-7 p-6 flex flex-col justify-center">
                  <div className="text-[10px] tracking-[0.2em] text-[#A68B6D] font-bold pb-3 border-b border-gray-200/60 mb-2">
                    {t("navbar.servicesTitle")}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {servicesList.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => handleServiceClick(service.path)}
                        className="text-left py-2 px-3 rounded-lg hover:bg-[#A68B6D]/10 transition-all cursor-pointer group"
                      >
                        <span className="block text-[8px] uppercase tracking-[0.2em] text-[#A68B6D] font-medium">
                          {service.category}
                        </span>
                        <span className="block text-[11px] uppercase tracking-[0.15em] text-gray-800 group-hover:text-gray-900 font-semibold">
                          {service.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#galeri"
            className="hover:text-gray-900 transition-colors tracking-[0.15em]"
          >
            {t("navbar.gallery")}
          </a>

          <button
            onClick={() => navigate("/biyografi")}
            className="hover:text-gray-900 transition-colors cursor-pointer uppercase tracking-[0.15em]"
          >
            {t("navbar.doctor")}
          </button>

          <a
            href="#iletisim"
            className="hover:text-gray-900 transition-colors tracking-[0.15em]"
          >
            {t("navbar.contact")}
          </a>
        </div>

        {/* SAĞ TARAF */}
        <div className="flex items-center gap-4">
          <LanguageSelector />

          <button
            onClick={() => handleNavClick("iletisim")}
            className="hidden md:block px-5 py-2.5 bg-[#A68B6D] text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#8F7559] cursor-pointer transition-colors rounded-sm shadow-sm"
          >
            {t("navbar.appointment")}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBİL MENÜ */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF8F5] border-b border-gray-200 shadow-2xl px-6 py-6 flex flex-col gap-4">
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between py-2 text-xs uppercase tracking-[0.15em] font-medium text-gray-700"
            >
              <span>{t("navbar.services")}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isMobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMobileServicesOpen && (
              <div className="pl-4 py-2 flex flex-col gap-2 border-l-2 border-[#A68B6D]/40 mt-1">
                {servicesList.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => handleServiceClick(service.path)}
                    className="text-left py-1.5 transition-colors"
                  >
                    <span className="block text-[8px] uppercase tracking-[0.15em] text-[#A68B6D]">
                      {service.category}
                    </span>
                    <span className="block text-[11px] uppercase tracking-[0.15em] text-gray-700 font-medium">
                      {service.name}
                    </span>
                  </button>
                ))}

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 py-2.5 bg-[#A68B6D] text-white text-[10px] uppercase tracking-widest font-semibold rounded"
                >
                  <MessageCircle size={14} />
                  <span>{t("navbar.whatsappButton")}</span>
                </a>
              </div>
            )}
          </div>

          <a
            href="#galeri"
            onClick={() => setIsOpen(false)}
            className="py-2 text-xs uppercase tracking-[0.15em] font-medium text-gray-700 hover:text-gray-900"
          >
            {t("navbar.gallery")}
          </a>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/biyografi");
            }}
            className="text-left py-2 text-xs uppercase tracking-[0.15em] font-medium text-gray-700 hover:text-gray-900"
          >
            {t("navbar.doctor")}
          </button>

          <a
            href="#iletisim"
            onClick={() => setIsOpen(false)}
            className="py-2 text-xs uppercase tracking-[0.15em] font-medium text-gray-700 hover:text-gray-900"
          >
            {t("navbar.contact")}
          </a>

          <button
            onClick={() => {
              setIsOpen(false);
              handleNavClick("iletisim");
            }}
            className="w-full mt-2 py-3 bg-[#A68B6D] text-white text-xs uppercase tracking-[0.15em] font-medium text-center rounded-sm"
          >
            {t("navbar.appointment")}
          </button>
        </div>
      )}
    </nav>
  );
}
