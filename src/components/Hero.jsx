import React, { useState, useEffect } from "react";
import {
  Calendar,
  ChevronRight,
  Award,
  Users,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero({ isLoaded = true }) {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Arka planda dönecek slider görselleri
  const slides = [
    {
      image: "/images/gallery/slide/slide-1.jpg",
    },
    {
      image: "/images/gallery/slide/slide-2.jpg",
    },
    {
      image: "/images/gallery/slide/slide-3.jpg",
    },
    {
      image: "/images/gallery/slide/slide-4.jpg",
    },
  ];

  // 5 Saniyede bir otomatik slayt geçişi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-36 lg:pt-44 pb-12 overflow-hidden bg-[#FAF8F5]"
    >
      {/* 1. BELİRGİN SLIDER GÖRSELLERİ VE ZARİF KREM GRADİAN */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            } transform transition-transform duration-[6000ms]`}
          >
            <img
              src={slide.image}
              alt="Op. Dr. Sefa Keşan"
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 opacity-85"
            />
            {/* Sol taraftaki yazıları okuturken sağdaki resmi açık bırakan yumuşak maske */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent w-full md:w-[70%]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/40"></div>
          </div>
        ))}
      </div>

      {/* 2. ÖN PLAN: YAZILAR VE BUTONLAR */}
      <div
        className={`relative z-20 max-w-7xl mx-auto px-6 w-full my-auto transition-all duration-1000 transform ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-2xl text-left">
          {/* BADGE / ETİKET */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-[#A68B6D]/30 rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A68B6D] animate-ping"></span>
            <span className="text-[#A68B6D] tracking-[0.25em] text-[10px] uppercase font-bold">
              {t("hero.badge")}
            </span>
          </div>

          {/* BAŞLIK */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.15] mb-6 drop-shadow-sm">
            {t("hero.title1")}{" "}
            <span className="italic font-normal text-[#A68B6D] block mt-1">
              {t("hero.title2")}
            </span>
          </h1>

          {/* AÇIKLAMA */}
          <p className="text-gray-700 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
            {t("hero.description")}
          </p>

          {/* BUTONLAR */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#iletisim"
              className="px-8 py-4 bg-[#A68B6D] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 hover:bg-[#8F7559] transition-all rounded-sm shadow-md hover:shadow-lg cursor-pointer"
            >
              <Calendar size={16} />
              <span>{t("hero.consultation")}</span>
            </a>

            <a
              href="#galeri"
              className="px-8 py-4 bg-white/90 hover:bg-white text-gray-800 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 border border-gray-300 transition-all rounded-sm shadow-sm cursor-pointer group"
            >
              <span>{t("hero.galleryButton")}</span>
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform text-[#A68B6D]"
              />
            </a>
          </div>
        </div>
      </div>

      {/* MANUEL SLAYT GEÇİŞ NOKTALARI */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 transition-all duration-300 rounded-full cursor-pointer shadow-sm ${
              idx === currentSlide
                ? "h-8 bg-[#A68B6D]"
                : "h-2.5 bg-white/80 hover:bg-[#A68B6D]"
            }`}
          />
        ))}
      </div>

      {/* 3. ALT İSTATİSTİK ŞERİDİ */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm">
          <div className="flex items-center gap-4 p-2">
            <div className="p-3 bg-[#FAF8F5] text-[#A68B6D] rounded-lg shadow-inner">
              <Award size={20} />
            </div>
            <div>
              <span className="font-serif text-2xl font-light text-gray-900 block leading-none">
                11<span className="text-[#A68B6D]">+</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-1">
                {t("stats.experience")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="p-3 bg-[#FAF8F5] text-[#A68B6D] rounded-lg shadow-inner">
              <Users size={20} />
            </div>
            <div>
              <span className="font-serif text-2xl font-light text-gray-900 block leading-none">
                4000<span className="text-[#A68B6D]">+</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-1">
                {t("stats.cases")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="p-3 bg-[#FAF8F5] text-[#A68B6D] rounded-lg shadow-inner">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="font-serif text-2xl font-light text-gray-900 block leading-none">
                A<span className="text-[#A68B6D] font-serif">++</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-1">
                {t("stats.clinic")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="p-3 bg-[#FAF8F5] text-[#A68B6D] rounded-lg shadow-inner">
              <HeartHandshake size={20} />
            </div>
            <div>
              <span className="font-serif text-2xl font-light text-gray-900 block leading-none">
                %99<span className="text-[#A68B6D] text-lg">.8</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block mt-1">
                {t("stats.satisfaction")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
