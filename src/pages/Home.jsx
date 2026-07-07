import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MoveHorizontal,
  Sparkles,
  Award,
  ShieldCheck,
  Users,
  HeartHandshake,
  MapPin,
  Phone,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rinoplasti");
  const [sliderPos, setSliderPos] = useState(50);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDragging = useRef(false);
  const [caseIndex, setCaseIndex] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    setCaseIndex(0);
    setSliderPos(50);
  }, [activeTab]);

  const treatments = [
    {
      id: "rinoplasti",
      title: "treatmentsClinic.rhinoplasty.title",
      subtitle: "treatmentsClinic.rhinoplasty.subtitle",
      desc: "treatmentsClinic.rhinoplasty.desc",
    },
    {
      id: "revizyon-rinoplasti",
      title: "treatmentsClinic.revision.title",
      subtitle: "treatmentsClinic.revision.subtitle",
      desc: "treatmentsClinic.revision.desc",
    },
    {
      id: "otoplasti",
      title: "treatmentsClinic.otoplasty.title",
      subtitle: "treatmentsClinic.otoplasty.subtitle",
      desc: "treatmentsClinic.otoplasty.desc",
    },
    {
      id: "yag-enjeksiyonu",
      title: "treatmentsClinic.yag-enjeksiyonu.title",
      subtitle: "treatmentsClinic.yag-enjeksiyonu.subtitle",
      desc: "treatmentsClinic.yag-enjeksiyonu.desc",
    },
    {
      id: "bisektomi",
      title: "treatmentsClinic.bisektomi.title",
      subtitle: "treatmentsClinic.bisektomi.subtitle",
      desc: "treatmentsClinic.bisektomi.desc",
    },
  ];

  const galleryData = {
    rinoplasti: {
      titleKey: "gallery.rhinoplasty.title",
      caseKey: "gallery.rhinoplasty.caseNo",
      detailsKey: "gallery.rhinoplasty.details",

      cases: [
        {
          before: "/images/gallery/rinoplasti/rino-1.png",
          after: "/images/gallery/rinoplasti/rino-1.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-2.png",
          after: "/images/gallery/rinoplasti/rino-2.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-3.png",
          after: "/images/gallery/rinoplasti/rino-3.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-4.png",
          after: "/images/gallery/rinoplasti/rino-4.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-5.png",
          after: "/images/gallery/rinoplasti/rino-5.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-6.png",
          after: "/images/gallery/rinoplasti/rino-6.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-7.png",
          after: "/images/gallery/rinoplasti/rino-7.1.png",
        },
      ],
    },

    "revizyon-rinoplasti": {
      titleKey: "gallery.revision.title",
      caseKey: "gallery.revision.caseNo",
      detailsKey: "gallery.revision.details",

      cases: [
        {
          before: "/images/gallery/revizyon/revi-1.png",
          after: "/images/gallery/revizyon/revi-1.1.png",
        },
        {
          before: "/images/gallery/revizyon/revi-2.png",
          after: "/images/gallery/revizyon/revi-2.1.png",
        },
      ],
    },

    otoplasti: {
      titleKey: "gallery.otoplasty.title",
      caseKey: "gallery.otoplasty.caseNo",
      detailsKey: "gallery.otoplasty.details",

      cases: [
        {
          before: "/images/gallery/otoplasti/otoplasti-1.png",
          after: "/images/gallery/otoplasti/otoplasti-1.1.png",
        },
        {
          before: "/images/gallery/otoplasti/otoplasti-2.png",
          after: "/images/gallery/otoplasti/otoplasti-2.1.png",
        },
      ],
    },

    "yag-enjeksiyonu": {
      titleKey: "gallery.yag-enjeksiyonu.title",
      caseKey: "gallery.yag-enjeksiyonu.caseNo",
      detailsKey: "gallery.yag-enjeksiyonu.details",

      cases: [
        {
          before: "/images/gallery/yagEnjeksiyon/yag-1.png",
          after: "/images/gallery/yagEnjeksiyon/yag-1.1.png",
        },
        {
          before: "/images/gallery/yagEnjeksiyon/yag-2.png",
          after: "/images/gallery/yagEnjeksiyon/yag-2.1.png",
        },
      ],
    },

    bisektomi: {
      titleKey: "gallery.bisektomi.title",
      caseKey: "gallery.bisektomi.caseNo",
      detailsKey: "gallery.bisektomi.details",

      cases: [
        {
          before: "/images/gallery/bisektomi/bisektomi-1.png",
          after: "/images/gallery/bisektomi/bisektomi-1.1.png",
        },
        {
          before: "/images/gallery/bisektomi/bisektomi-2.png",
          after: "/images/gallery/bisektomi/bisektomi-2.1.png",
        },
      ],
    },
  };
  const currentCase = galleryData[activeTab]?.cases?.[caseIndex];
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: "Rinoplasti (Burun Estetiği)",
  });
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMove = (clientX, rect) => {
    let x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };
  const isHomePage = location.pathname === "/";
  const handleNavClick = (item) => {
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

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Lütfen adınızı ve telefon numaranızı doldurun.");
      return;
    }
    const klinikTelefon = "905000000000";
    const mesaj = `Merhaba Op. Dr. Sefa Keşan Kliniği,\n\nWeb siteniz üzerinden yeni bir randevu talebi oluşturdum.\n\n👤 *Ad Soyad:* ${formData.name}\n📞 *Telefon:* ${formData.phone}\n🏥 *İlgilendiğim Tedavi:* ${formData.treatment}`;
    window.open(
      `https://api.whatsapp.com/send?phone=${klinikTelefon}&text=${encodeURIComponent(mesaj)}`,
      "_blank",
    );
  };

  return (
    <div className="bg-[#FAF8F5] text-gray-800 overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <div
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="font-serif text-lg tracking-[0.15em] font-light text-gray-900 block uppercase">
              Op. Dr. Sefa Keşan
            </span>

            <span className="text-[9px] uppercase tracking-[0.2em] text-[#A68B6D] font-semibold block">
              {t("navbar.clinicSubtitle")}
            </span>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-gray-500">
            <a
              href="#uzmanlik"
              className="hover:text-gray-900 transition-colors"
            >
              {t("navbar.services")}
            </a>

            <a href="#galeri" className="hover:text-gray-900 transition-colors">
              {t("navbar.gallery")}
            </a>

            <button
              onClick={() => navigate("/biyografi")}
              className="hover:text-gray-900 transition-colors cursor-pointer uppercase tracking-widest"
            >
              {t("navbar.doctor")}
            </button>

            <a
              href="#iletisim"
              className="hover:text-gray-900 transition-colors"
            >
              {t("navbar.contact")}
            </a>
          </div>

          {/* SAĞ TARAF */}
          <div className="flex items-center gap-4">
            {/* LANGUAGE */}
            <LanguageSelector />

            {/* RANDEVU */}
            <button
              onClick={() =>
                handleNavClick({ id: "iletisim", type: "section" })
              }
              className="px-5 py-2.5 bg-gold text-black text-xs uppercase tracking-wider font-medium hover:bg-yellow-600 cursor-pointer transition-colors"
            >
              {t("navbar.appointment")}
            </button>
          </div>
        </div>
      </nav>

      {/* 1. BÖLÜM: HERO */}
      <section
        id="hero"
        className="relative min-h-screen lg:h-screen flex flex-col justify-between pt-28 pb-20 lg:py-0 overflow-hidden bg-[#F4F0EA]"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 opacity-25 mix-blend-multiply filter brightness-105 contrast-95 sepia-[20%]"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-dermatologist-examining-a-patient-41527-large.mp4"
              type="video/mp4"
            />
          </video>
          <div
            className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#E3ECF5] rounded-full blur-[130px] opacity-70 animate-pulse"
            style={{ animationDuration: "9s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#EFEBE4] rounded-full blur-[120px] opacity-80 animate-pulse"
            style={{ animationDuration: "6s" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F4F0EA]/80 via-transparent to-[#FAF8F5]"></div>
        </div>

        <div
          className={`relative z-10 max-w-5xl mx-auto px-6 text-center my-auto transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5]/80 backdrop-blur-md px-5 py-2.5 border border-[#E3ECF5] rounded-full mb-8 shadow-sm">
            <Sparkles
              size={14}
              className="text-[#8FA9C4] animate-spin"
              style={{ animationDuration: "5s" }}
            />
            <span className="text-gray-700 tracking-[0.25em] text-[10px] uppercase font-semibold">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-gray-900 mb-8 leading-[1.15]">
            {t("hero.title1")} <br />
            <span className="font-normal italic text-[#A68B6D]">
              {t("hero.title2")}
            </span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg font-light mb-10 leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#iletisim"
              className="w-full sm:w-auto px-8 py-4 bg-[#A68B6D] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#93795C] transition-all rounded-sm shadow-md transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar size={16} /> {t("hero.consultation")}
            </a>
            <a
              href="#galeri"
              className="w-full sm:w-auto px-8 py-4 bg-white/90 backdrop-blur-md text-gray-800 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 border border-[#E3ECF5] hover:bg-white transition-all rounded-sm shadow-sm cursor-pointer"
            >
              {t("hero.galleryButton")}
            </a>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 mb-12 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FAF8F5] rounded-sm text-[#A68B6D]">
                  <Award size={20} />
                </div>
                <div>
                  <span className="font-serif text-2xl font-light text-gray-900 block">
                    15<span className="text-[#8FA9C4] font-normal">+</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-0.5">
                    {t("stats.experience")}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FAF8F5] rounded-sm text-[#A68B6D]">
                  <Users size={20} />
                </div>
                <div>
                  <span className="font-serif text-2xl font-light text-gray-900 block">
                    4000<span className="text-[#8FA9C4] font-normal">+</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-0.5">
                    {t("stats.cases")}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FAF8F5] rounded-sm text-[#A68B6D]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="font-serif text-2xl font-light text-gray-900 block">
                    A<span className="text-[#8FA9C4] font-serif">++</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-0.5">
                    {t("stats.clinic")}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FAF8F5] rounded-sm text-[#A68B6D]">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <span className="font-serif text-2xl font-light text-gray-900 block">
                    %99<span className="text-[#8FA9C4] text-lg">.8</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-0.5">
                    {t("stats.satisfaction")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BÖLÜM: BİYOGRAFİ ÖZET */}
      <section
        id="biyografi"
        className="py-24 max-w-6xl mx-auto px-6 border-b border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[3/4] bg-white rounded overflow-hidden shadow-md border border-gray-100 relative group">
            <img
              src="/images/sefa-kesan.jpg"
              alt="Dr. Sefa Keşan"
              className="w-full h-full object-cover filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="space-y-6">
            <span className="text-[#A68B6D] text-xs tracking-widest uppercase font-semibold block border-b border-gray-200 pb-2 w-max">
              {t("biography.philosophy")}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-gray-950">
              {t("biography.title")}
            </h2>
            <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
              {t("biography.desc")}
            </p>
            <button
              onClick={() => navigate("/biyografi")}
              className="px-6 py-3 bg-[#A68B6D] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#93795C] transition-all rounded-sm shadow-sm cursor-pointer"
            >
              {t("biography.button")}
            </button>
            <div className="pt-4 font-serif italic text-xl text-[#A68B6D] font-medium flex items-center gap-3">
              <div className="w-8 h-px bg-[#A68B6D]"></div> Op. Dr. Sefa Keşan
            </div>
          </div>
        </div>
      </section>

      {/* 3. BÖLÜM: PREMIUM UZMANLIK ALANLARI */}
      <section
        id="uzmanlik"
        className="py-24 bg-[#F4F0EA]/40 border-b border-gray-200 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#A68B6D] text-xs tracking-widest uppercase font-semibold">
              {t("treatmentsSection.badge")}
            </span>

            <h2 className="font-serif text-3xl md:text-5xl font-light text-gray-950 mt-2">
              {t("treatmentsSection.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((item) => (
              <div
                key={t(item.id)}
                onClick={() => navigate(`/tedavi/${t(item.id)}`)}
                className="bg-white p-8 border border-gray-200/70 transition-all duration-500 flex flex-col justify-between shadow-sm hover:shadow-xl rounded-sm group relative overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-[#F4F0EA]/30"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#A68B6D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div>
                  <span className="text-[10px] text-[#A68B6D] tracking-widest uppercase font-semibold block mb-2 opacity-80 group-hover:opacity-100">
                    {t(item.subtitle)}
                  </span>
                  <h3 className="font-serif text-xl font-light mb-4 text-gray-900 group-hover:text-[#A68B6D] transition-colors duration-300">
                    {t(item.title)}
                  </h3>
                  <p className="text-gray-500 text-xs font-light mb-6 leading-relaxed group-hover:text-gray-600 transition-colors">
                    {t(item.desc)}
                  </p>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium border-t border-gray-100 pt-4 flex justify-between items-center group-hover:text-gray-900 transition-colors">
                  <span>{t("treatmentsClinic.process")}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
                <div className="absolute inset-0 bg-gray-950/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-white/95 text-gray-900 p-4 rounded-full shadow-2xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center border border-gray-100">
                    <Search size={22} className="text-[#A68B6D]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BÖLÜM: 6 HASTALIK/TEDAVİ ENTEGRELİ GALERİ */}
      <section
        id="galeri"
        className="py-24 max-w-7xl mx-auto px-6 border-b border-gray-200"
      >
        <div className="text-center mb-12">
          <span className="text-[#A68B6D] text-xs tracking-[0.35em] uppercase block mb-2">
            {t("gallery.sectionBadge")}
          </span>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-gray-950">
            {t("gallery.sectionTitle")}
          </h2>
        </div>

        {/* Tabs */}

        <div className="flex justify-start md:justify-center gap-5 mb-14 border-b border-gray-200 pb-5 overflow-x-auto scrollbar-none">
          {Object.keys(galleryData).map((tabId) => (
            <button
              key={tabId}
              onClick={() => {
                setActiveTab(tabId);
                setCaseIndex(0);
                setSliderPos(50);
              }}
              className={`text-xs uppercase tracking-[0.25em] pb-3 whitespace-nowrap transition-all ${
                activeTab === tabId
                  ? "text-[#A68B6D] border-b-2 border-[#A68B6D] font-semibold"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              {t(`gallery.tabs.${tabId}`)}
            </button>
          ))}
        </div>

        {/* BEFORE AFTER */}

        <div className="max-w-4xl mx-auto">
          {/* Sabit Boyutlu Slider Container */}
          <div
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl border border-gray-100 cursor-col-resize select-none"
            onMouseMove={(e) =>
              isDragging.current &&
              handleMove(e.clientX, e.currentTarget.getBoundingClientRect())
            }
            onTouchMove={(e) =>
              isDragging.current &&
              handleMove(
                e.touches[0].clientX,
                e.currentTarget.getBoundingClientRect(),
              )
            }
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onTouchStart={() => (isDragging.current = true)}
            onTouchEnd={() => (isDragging.current = false)}
          >
            {/* AFTER Görseli (Altta) */}
            <img
              src={currentCase?.after}
              alt="after"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* BEFORE Görseli (Üstte - Maskeli) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={currentCase?.before}
                alt="before"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Kaydırma Çubuğu */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#A68B6D] flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#A68B6D] text-[#A68B6D] flex items-center justify-center shadow-xl">
                <MoveHorizontal size={24} />
              </div>
            </div>

            {/* Etiketler */}
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest">
              {t("gallery.before")}
            </div>
            <div className="absolute bottom-6 right-6 bg-[#A68B6D]/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest">
              {t("gallery.after")}
            </div>
          </div>

          {/* Navigasyon Okları */}
          <div className="flex justify-center items-center gap-8 mt-10">
            <button
              onClick={() => {
                setCaseIndex((prev) =>
                  prev === 0
                    ? galleryData[activeTab].cases.length - 1
                    : prev - 1,
                );
                setSliderPos(50);
              }}
              className="w-14 h-14 rounded-full border border-gray-200 hover:border-[#A68B6D] hover:text-[#A68B6D] transition flex items-center justify-center"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-3">
              {galleryData[activeTab].cases.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 ${caseIndex === i ? "w-12 h-2 rounded-full bg-[#A68B6D]" : "w-2 h-2 rounded-full bg-gray-300"}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setCaseIndex((prev) =>
                  prev === galleryData[activeTab].cases.length - 1
                    ? 0
                    : prev + 1,
                );
                setSliderPos(50);
              }}
              className="w-14 h-14 rounded-full border border-gray-200 hover:border-[#A68B6D] hover:text-[#A68B6D] transition flex items-center justify-center"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Detay Bilgisi */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h3 className="font-serif text-4xl font-light text-gray-950">
              {t(`gallery.${activeTab}.title`)}
            </h3>
            <p className="mt-8 text-gray-600 leading-9 text-lg font-light">
              {t(`gallery.${activeTab}.details`)}
            </p>
          </div>
        </div>
      </section>

      {/* 5. BÖLÜM: İLETİŞİM & HARİTA */}
      <section
        id="iletisim"
        className="py-24 max-w-7xl mx-auto px-6 border-b border-gray-200"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white p-8 md:p-10 border border-gray-100 rounded-sm shadow-xl relative flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <span className="text-xs text-[#A68B6D] uppercase tracking-widest font-semibold block mb-1">
                  {t("contactForm.badge")}
                </span>
                <h2 className="font-serif text-3xl font-light text-gray-950">
                  {t("contactForm.title")}
                </h2>
              </div>
              <form className="space-y-5" onSubmit={handleWhatsAppSubmit}>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                    {t("contactForm.nameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("contactForm.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-[#FAF8F5] w-full p-4 text-sm border border-gray-200 focus:border-[#A68B6D] outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                    {t("contactForm.phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t("contactForm.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-[#FAF8F5] w-full p-4 text-sm border border-gray-200 focus:border-[#A68B6D] outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                    {t("contactForm.treatmentLabel")}
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) =>
                      setFormData({ ...formData, treatment: e.target.value })
                    }
                    className="bg-[#FAF8F5] w-full p-4 text-sm border border-gray-200 focus:border-[#A68B6D] outline-none rounded-sm cursor-pointer"
                  >
                    <option value="Rinoplasti (Burun Estetiği)">
                      {t("contactForm.treatments.rinoplasti")}
                    </option>
                    <option value="Revizyon Burun Estetiği">
                      {t("contactForm.treatments.revizyon")}
                    </option>
                    <option value="Otoplasti (Kulak Estetiği)">
                      {t("contactForm.treatments.otoplasti")}
                    </option>
                    <option value="Likit Yüz Estetiği">
                      {t("contactForm.treatments.likit")}
                    </option>
                    <option value="bisektomi">
                      {t("contactForm.treatments.bisektomi")}
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-[#A68B6D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#93795C] transition-all shadow-md rounded-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t("contactForm.submit")}</span>
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-6 justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-sm flex flex-col gap-2">
                <MapPin size={18} className="text-[#A68B6D]" />
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  {t("address.clinic")}
                </span>
                <p className="text-xs text-gray-700 font-light">
                  {t("address.clinicAddress")}
                </p>
              </div>
              <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-sm flex flex-col gap-2">
                <Phone size={18} className="text-[#A68B6D]" />
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  {t("address.contact")}
                </span>
                <p className="text-xs text-gray-700 font-light">
                  {t("address.number")}
                </p>
              </div>
              <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-sm flex flex-col gap-2">
                <Clock size={18} className="text-[#A68B6D]" />
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  {t("address.workClock")}
                </span>
                <p className="text-xs text-gray-700 font-light">
                  {t("address.workText")}
                </p>
              </div>
            </div>
            <div className="w-full h-full min-h-[300px] bg-white border border-gray-100 rounded-sm overflow-hidden shadow-xl relative group">
              <iframe
                title="Klinik Haritası"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.2619077716943!2d28.989718476569116!3d41.06316271570774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6f6160da309%3A0xc3b8a1c97a5b399d!2zTmnFn2FudGHFn8EsIMWeacWfli_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
                className="w-full h-full border-0 grayscale contrast-115 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BÖLÜM: PREMIUM FOOTER ALANI */}

      <Footer />
    </div>
  );
}
