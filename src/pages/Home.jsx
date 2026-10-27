import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MoveHorizontal,
  Sparkles,
  Award,
  ShieldCheck,
  Users,
  Video,
  HeartHandshake,
  Zap,
  Play,
  MapPin,
  Phone,
  Clock,
  Search,
  Maximize2,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GoogleReviewsSlider from "../components/GoogleReviewsSlider";

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
        {
          before: "/images/gallery/rinoplasti/rino-8.png",
          after: "/images/gallery/rinoplasti/rino-8.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-9.png",
          after: "/images/gallery/rinoplasti/rino-9.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-10.png",
          after: "/images/gallery/rinoplasti/rino-10.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-11.png",
          after: "/images/gallery/rinoplasti/rino-11.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-12.png",
          after: "/images/gallery/rinoplasti/rino-12.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-13.png",
          after: "/images/gallery/rinoplasti/rino-13.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-14.png",
          after: "/images/gallery/rinoplasti/rino-14.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-15.png",
          after: "/images/gallery/rinoplasti/rino-15.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-16.png",
          after: "/images/gallery/rinoplasti/rino-16.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-17.png",
          after: "/images/gallery/rinoplasti/rino-17.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-18.png",
          after: "/images/gallery/rinoplasti/rino-18.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-19.png",
          after: "/images/gallery/rinoplasti/rino-19.1.png",
        },
        {
          before: "/images/gallery/rinoplasti/rino-20.png",
          after: "/images/gallery/rinoplasti/rino-20.1.png",
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
        {
          before: "/images/gallery/revizyon/revi-3.png",
          after: "/images/gallery/revizyon/revi-3.1.png",
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

  // ----------------------------------------------------------------------
  // 2. DAHİLİ BİLEŞEN: DİNAMİK VAKA & MERYA SLIDER (SİNEMATİK DİZAYN)
  // ----------------------------------------------------------------------
  function OperationCasesSlider() {
    const { t } = useTranslation();
    const [activeSlide, setActiveSlide] = useState(0);
    const [selectedMedia, setSelectedMedia] = useState(null);

    // i18next JSON dosyasından dinamik vaka listesini çekiyoruz
    const caseItemsData = t("operationCases.items", { returnObjects: true });
    const caseItems = Array.isArray(caseItemsData) ? caseItemsData : [];

    // Instagram URL'sini gömülebilir (embed) formata dönüştüren yardımcı fonksiyon
    const getInstagramEmbedUrl = (url) => {
      if (!url) return "";
      const cleanUrl = url.split("?")[0].replace(/\/$/, "");
      return `${cleanUrl}/embed/captioned/`;
    };

    // 6 Saniyede bir otomatik slide döngüsü
    useEffect(() => {
      if (caseItems.length === 0) return;
      const timer = setInterval(() => {
        setActiveSlide((prev) =>
          prev === caseItems.length - 1 ? 0 : prev + 1,
        );
      }, 6000);

      return () => clearInterval(timer);
    }, [caseItems.length]);

    const handlePrev = () => {
      setActiveSlide((prev) => (prev === 0 ? caseItems.length - 1 : prev - 1));
    };

    const handleNext = () => {
      setActiveSlide((prev) => (prev === caseItems.length - 1 ? 0 : prev + 1));
    };

    if (caseItems.length === 0) return null;

    return (
      <div className="relative">
        {/* Slayt İçerik Alanı */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161616] shadow-2xl">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {caseItems.map((item) => (
              <div
                key={item.id}
                className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 min-h-[420px]"
              >
                {/* Sol Taraf: Görsel / Medya Alanı */}
                <div
                  className="lg:col-span-7 relative group cursor-pointer overflow-hidden bg-black flex items-center justify-center"
                  onClick={() => setSelectedMedia(item)}
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Video Oynat / Büyüt Butonu */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#A68B6D] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.type === "video" ? (
                        <Play size={28} className="ml-1 fill-white" />
                      ) : (
                        <Maximize2 size={24} />
                      )}
                    </div>
                  </div>

                  {/* Tür Rozeti (Fotoğraf / Video) */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider backdrop-blur-md ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/60 border border-white/20 text-white backdrop-blur-md uppercase tracking-wider flex items-center gap-1.5">
                      {item.type === "video" ? (
                        <>
                          <Video size={12} className="text-[#A68B6D]" />{" "}
                          Instagram Reels
                        </>
                      ) : (
                        <>
                          <Camera size={12} className="text-[#A68B6D]" /> Görsel
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Sağ Taraf: Metin Açıklama Alanı */}
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-[#1A1817]">
                  <div>
                    <span className="text-[#A68B6D] text-[10px] tracking-[0.25em] font-bold uppercase block mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mb-4 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMedia(item)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A68B6D] hover:bg-[#8F7559] text-white text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      {item.type === "video" ? (
                        <>
                          <Play size={14} className="fill-white" />
                          <span>{t("operationCases.watchBtn")}</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 size={14} />
                          <span>{t("operationCases.detailBtn")}</span>
                        </>
                      )}
                    </button>

                    <span className="text-xs font-mono text-gray-500">
                      0{item.id} / 0{caseItems.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigasyon Okları */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center shadow-2xl hover:bg-[#A68B6D] hover:border-[#A68B6D] transition-all cursor-pointer z-10"
          title="Önceki Vaka"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center shadow-2xl hover:bg-[#A68B6D] hover:border-[#A68B6D] transition-all cursor-pointer z-10"
          title="Sonraki Vaka"
        >
          <ChevronRight size={22} />
        </button>

        {/* Kontrol Noktaları (Indicators) */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {caseItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeSlide
                  ? "w-8 bg-[#A68B6D]"
                  : "w-2 bg-gray-600 hover:bg-gray-400"
              }`}
              title={`Vaka ${idx + 1}`}
            />
          ))}
        </div>

        {/* MEDYA POP-UP MODAL (INSTAGRAM REELS VEYA FOTOĞRAF BÜYÜTÜCÜ) */}
        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="relative w-full max-w-md bg-[#111] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#A68B6D] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Medya Gösterim Alanı */}
              <div className="w-full">
                {selectedMedia.type === "video" ? (
                  <div className="w-full h-[580px] pt-2">
                    <iframe
                      src={getInstagramEmbedUrl(selectedMedia.instagramUrl)}
                      className="w-full h-full border-0 rounded-2xl"
                      title={selectedMedia.title}
                      allowTransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                ) : (
                  <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black p-2">
                    <img
                      src={selectedMedia.coverImage}
                      alt={selectedMedia.title}
                      className="max-h-[65vh] w-auto object-contain rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Alt Bilgi */}
              <div className="w-full p-6 bg-[#1A1817] border-t border-white/10">
                <span className="text-[#A68B6D] text-[10px] tracking-widest uppercase font-bold block mb-1">
                  {selectedMedia.category}
                </span>
                <h4 className="text-lg font-serif text-white mb-2">
                  {selectedMedia.title}
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  {selectedMedia.desc}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    // Tüm kategorilerdeki tüm vakaları döngüye al
    Object.values(galleryData).forEach((tab) => {
      tab.cases.forEach((c) => {
        const imgBefore = new Image();
        imgBefore.src = c.before; // Tarayıcı bu resmi cache'e alır

        const imgAfter = new Image();
        imgAfter.src = c.after;
      });
    });
  }, []);
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
    // requestAnimationFrame ile tarayıcının ekran yenileme hızına (60fps) senkronize olur
    requestAnimationFrame(() => {
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPos(percent);
    });
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
    const klinikTelefon = "905369242558";
    const mesaj = `Merhaba Op. Dr. Sefa Keşan Kliniği,\n\nWeb siteniz üzerinden yeni bir randevu talebi oluşturdum.\n\n👤 *Ad Soyad:* ${formData.name}\n📞 *Telefon:* ${formData.phone}\n🏥 *İlgilendiğim Tedavi:* ${formData.treatment}`;
    window.open(
      `https://api.whatsapp.com/send?phone=${klinikTelefon}&text=${encodeURIComponent(mesaj)}`,
      "_blank",
    );
  };

  return (
    <div className="bg-[#FAF8F5] text-gray-800 overflow-hidden">
      <Navbar />

      {/* 1. BÖLÜM: HERO */}
      <Hero />

      {/* 2. BÖLÜM: BİYOGRAFİ ÖZET */}
      <section
        id="biyografi"
        className="py-24 max-w-6xl mx-auto px-6 border-b border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 relative group cursor-pointer">
            {/* 1. VARSAYILAN RESİM (Siyah & Beyaz Stilde) */}
            <img
              src="/images/sefa-kesan.jpg"
              alt="Op. Dr. Sefa Keşan"
              className="w-full h-full object-cover filter grayscale contrast-105 group-hover:scale-105 transition-all duration-700 absolute inset-0"
            />

            {/* 2. HOVER ANINDA GÖRÜNECEK İKİNCİ RESİM (Renkli / Farklı Poz) */}
            <img
              src="/images/sefa-kesan-ameliyat.jpg" // Buraya gösterilmesini istediğiniz 2. resmin yolunu yazın
              alt="Op. Dr. Sefa Keşan"
              className="w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 absolute inset-0 z-10"
            />

            {/* İsteğe Bağlı: Yumuşak Karanlık Alt Gradyan */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
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
      {/* 3. BÖLÜM: PREMIUM UZMANLIK ALANLARI (GÖRSEL DESTEKLİ LÜKS DİZAYN) */}
      <section
        id="uzmanlik"
        className="py-28 bg-[#FAF8F5] border-b border-gray-200/80 relative overflow-hidden"
      >
        {/* Arka Plan Yumuşak Işık Efekti */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A68B6D]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Üst Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#A68B6D]/30 rounded-full shadow-2xs mb-4">
              <Sparkles size={14} className="text-[#A68B6D]" />
              <span className="text-[#A68B6D] text-[10px] tracking-[0.25em] uppercase font-bold">
                {t("treatmentsSection.badge")}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-gray-950 leading-tight">
              {t("treatmentsSection.title")}
            </h2>
          </div>

          {/* KARTLAR GRID ALANI */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((item) => {
              // Hastalıklara ve operasyon alanlarına doğrudan odaklanan özel görseller
              const treatmentImages = {
                rinoplasti: "/images/gallery/card/rino.jpg", // Doğal burun profili ve estetik açı
                "revizyon-rinoplasti": "/images/gallery/card/reviz.jpg", // Anatomik yapı ve revizyon şeması
                otoplasti: "/images/gallery/card/oto.jpg", // Kulak kepçesi ve estetik form
                "yag-enjeksiyonu": "/images/gallery/card/yag.jpg", // Otolog yağ dokusu ve transfer hücreleri
                bisektomi: "/images/gallery/card/bisek.jpg", // Yüz hatları, yanak ve çene kontürü
              };

              const bgImage =
                treatmentImages[item.id] || treatmentImages["rinoplasti"];

              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/tedavi/${t(item.id)}`)}
                  className="group relative h-[420px] rounded-2xl overflow-hidden shadow-xl border border-gray-200/60 cursor-pointer transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* 1. ARKA PLAN RESMİ (HASTALIĞA/İŞLEME ÖZEL BÖLGE GÖRSELİ) */}
                  <img
                    src={bgImage}
                    alt={t(item.title)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out filter brightness-90 contrast-105"
                  />

                  {/* 2. GRADYAN KARARTMA KATMANI (Metin Okunabilirliği İçin) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/65 to-black/30 opacity-90 group-hover:opacity-85 transition-opacity duration-500"></div>

                  {/* 3. HOVER ALTIN ÇİZGİSİ */}
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-[#A68B6D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

                  {/* 4. KART İÇERİĞİ */}
                  <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                    {/* ÜST ETİKET VE ARAMA İKONU */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3.5 py-1 bg-[#A68B6D]/20 backdrop-blur-md border border-[#A68B6D]/40 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full shadow-sm">
                        {t(item.subtitle)}
                      </span>

                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#A68B6D] group-hover:border-[#A68B6D] transition-all duration-500 shadow-md">
                        <Search size={16} />
                      </div>
                    </div>

                    {/* ALT BAŞLIK & AÇIKLAMA */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#F3E5AB] transition-colors duration-300">
                        {t(item.title)}
                      </h3>

                      <p className="text-gray-300 text-xs font-light leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                        {t(item.desc)}
                      </p>

                      {/* SÜREÇ & DETAYLAR LINKI */}
                      <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#A68B6D] font-semibold group-hover:text-white transition-colors">
                        <span>{t("treatmentsClinic.process")}</span>
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#A68B6D] group-hover:translate-x-1 transition-all duration-300">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BÖLÜM: 6 HASTALIK/TEDAVİ ENTEGRELİ GALERİ */}
      <section
        id="galeri"
        className="py-28 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-gray-200/60 relative overflow-hidden"
      >
        {/* Dekoratif Arka Plan Işıltısı */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A68B6D]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Başlık Alanı */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#A68B6D]/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A68B6D] animate-pulse"></span>
              <span className="text-[#A68B6D] text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("gallery.sectionBadge")}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-950 tracking-wide">
              {t("gallery.sectionTitle")}
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Gerçek vakaların öncesi ve sonrası dokusal değişim süreçleri
            </p>
          </div>

          {/* Modern Sekmeler (Tabs) */}
          <div className="flex justify-start md:justify-center gap-3 mb-16 border-b border-gray-200/80 pb-4 overflow-x-auto scrollbar-none">
            {Object.keys(galleryData).map((tabId) => (
              <button
                key={tabId}
                onClick={() => {
                  setActiveTab(tabId);
                  setCaseIndex(0);
                  setSliderPos(50);
                }}
                className={`text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === tabId
                    ? "bg-[#A68B6D] text-white shadow-md shadow-[#A68B6D]/20 font-semibold"
                    : "bg-white text-gray-500 hover:text-gray-950 border border-gray-200/60"
                }`}
              >
                {t(`gallery.tabs.${tabId}`)}
              </button>
            ))}
          </div>

          {/* İNTERAKTİF BEFORE/AFTER SLIDER KARTI */}
          <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-gray-200/80 shadow-2xl space-y-8">
            <div
              className="relative w-full aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-2xl shadow-inner cursor-col-resize select-none bg-neutral-950"
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
                loading="eager"
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
                  key={currentCase?.before}
                  alt="before"
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-105"
                  draggable={false}
                />
              </div>

              {/* Şık Kaydırma Çubuğu */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-[#A68B6D] text-[#A68B6D] flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                  <MoveHorizontal size={22} />
                </div>
              </div>

              {/* Etiketler (Modern Rozetler) */}
              <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-mono border border-white/10 shadow-lg">
                {t("gallery.before")}
              </div>
              <div className="absolute top-6 right-6 bg-[#A68B6D] backdrop-blur-md text-white px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-mono shadow-lg">
                {t("gallery.after")}
              </div>
            </div>

            {/* Navigasyon Okları ve İlerleme Noktaları */}
            <div className="flex justify-between items-center px-2 md:px-4 pt-2 gap-2">
              <button
                onClick={() => {
                  setCaseIndex((prev) =>
                    prev === 0
                      ? galleryData[activeTab].cases.length - 1
                      : prev - 1,
                  );
                  setSliderPos(50);
                }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#FAF8F5] border border-gray-200 hover:border-[#A68B6D] hover:text-[#A68B6D] transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-2xs"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Vaka İlerleme Noktaları (Dots) - Mobilde taşmayı önlemek için yatay kaydırma eklendi */}
              <div className="flex gap-2 md:gap-3 items-center overflow-x-auto max-w-[200px] sm:max-w-md px-2 py-1 scrollbar-none">
                {galleryData[activeTab].cases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCaseIndex(i);
                      setSliderPos(50);
                    }}
                    className={`transition-all duration-300 rounded-full cursor-pointer shrink-0 ${
                      caseIndex === i
                        ? "w-8 md:w-10 h-2 bg-[#A68B6D]"
                        : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
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
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#FAF8F5] border border-gray-200 hover:border-[#A68B6D] hover:text-[#A68B6D] transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-2xs"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* HASTALIĞA / İŞLEME ÖZEL TEKNİK DETAY KÜNYESİ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Uygulanan Teknik */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-gray-200/60 text-center space-y-1">
                <span className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">
                  {t("gallery.specLabels.technique")}
                </span>
                <span className="text-xs font-semibold text-gray-950 block">
                  {t(`gallery.${activeTab}.technique`)}
                </span>
              </div>

              {/* Anatomi / Deformite */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-gray-200/60 text-center space-y-1">
                <span className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">
                  {t("gallery.specLabels.anatomy")}
                </span>
                <span className="text-xs font-semibold text-gray-950 block">
                  {t(`gallery.${activeTab}.anatomy`)}
                </span>
              </div>

              {/* Fonksiyonel Kazanım */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-gray-200/60 text-center space-y-1">
                <span className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">
                  {t("gallery.specLabels.benefit")}
                </span>
                <span className="text-xs font-semibold text-[#A68B6D] block">
                  {t(`gallery.${activeTab}.benefit`)}
                </span>
              </div>
            </div>

            {/* Vaka Detay ve Açıklama Alanı */}
            <div className="bg-[#FAF8F5] p-8 md:p-10 rounded-2xl border border-gray-200/60 text-center space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A68B6D] font-bold block">
                {t("gallery.caseReportBadge")}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-950">
                {t(`gallery.${activeTab}.title`)}
              </h3>
              <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed max-w-3xl mx-auto pt-2">
                {t(`gallery.${activeTab}.details`)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPERASYON VAKALARI (DİNAMİK SLIDER & POP-UP VİDEO BÖLÜMÜ) */}
      <section className="py-24 bg-gradient-to-b from-[#111111] to-[#1A1817] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
            <div>
              <span className="text-[#A68B6D] text-xs tracking-[0.3em] uppercase font-bold block mb-3 flex items-center gap-2">
                <Zap size={14} className="text-[#A68B6D]" />
                {t("operationCases.sectionBadge")}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
                {t("operationCases.sectionTitle")}
              </h2>
            </div>
            <p className="text-gray-400 text-xs font-light max-w-sm mt-4 md:mt-0 leading-relaxed">
              {t("operationCases.sectionDesc")}
            </p>
          </div>

          {/* DİNAMİK SLIDER BİLEŞENİ */}
          <OperationCasesSlider />
        </div>
      </section>

      <GoogleReviewsSlider />

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
                    <option value="Yağ Enjeksiyonu (Dolgu)">
                      {t("contactForm.treatments.yag-enjeksiyonu")}
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
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+905426952089"
                    className="text-xs text-gray-700 font-light hover:text-[#A68B6D] transition-colors"
                  >
                    {t("address.number")}
                  </a>
                  <a
                    href="mailto:info@drsefakesan.com.tr"
                    className="text-xs text-gray-700 font-light hover:text-[#A68B6D] transition-colors"
                  >
                    {t("address.mail")}
                  </a>
                </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.647295301221!2d28.9010918!3d41.0329718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabaf4a295f5c7%3A0x76355b3144e7785a!2sTerazidere%2C%2060.%20Y%C4%B1l%20Cd.%20No%3A3%2C%2034035%20Bayrampa%C5%9Fa%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1783589539406!5m2!1str!2str"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
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
