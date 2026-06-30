import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  Milestone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
export default function Biyografi() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const memberships = t("biographyPage.memberships", { returnObjects: true });
  const timeline = t("biographyPage.timelineCards", { returnObjects: true });
  const achievements = t("biographyPage.achievements", {
    returnObjects: true,
  });
  // Sayfa açıldığında en yukarıdan başlaması için
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleBackToDiseases = () => {
    navigate("/");
    setTimeout(() => {
      const targetSection = document.getElementById("biyografi");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <div className="bg-[#FAF8F5] text-gray-800 min-h-screen font-sans antialiased overflow-x-hidden">
      {/* ÜST BAR / NAVIGASYON */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackToDiseases}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-all font-medium group cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="transform group-hover:-translate-x-1 transition-transform"
            />
            <span>{t("biographyPage.back")}</span>
          </button>
          <div className="flex items-center gap-4">
            {/* LANGUAGE */}
            <LanguageSelector />

            {/* DOCTOR INFO */}
            <div className="text-right leading-tight">
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

      {/* HERO BÖLÜMÜ */}
      <header className="relative py-20 lg:py-28 bg-[#F4F0EA] border-b border-gray-200/80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#E3ECF5] rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FAF8F5] rounded-full blur-[100px] opacity-80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 aspect-[3/4] bg-white rounded-sm overflow-hidden shadow-xl border border-gray-100 relative group">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
              alt="Op. Dr. Sefa Keşan"
              className="w-full h-full object-cover filter grayscale contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent"></div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 border border-gray-200 rounded-full shadow-sm">
              <Sparkles size={12} className="text-[#A68B6D]" />
              <span className="text-gray-600 tracking-widest text-[9px] uppercase font-semibold">
                {t("biographyPage.heroBadge")}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-gray-950 leading-tight">
              {t("biographyPage.heroTitle1")} <br />
              <span className="font-normal italic text-[#A68B6D]">
                {t("biographyPage.heroTitle2")}
              </span>
            </h1>
            <p className="text-gray-600 font-light leading-relaxed text-base">
              {t("biographyPage.heroText")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                <GraduationCap size={16} className="text-[#A68B6D]" />{" "}
                {t("biographyPage.education")}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                <ShieldCheck size={16} className="text-[#A68B6D]" />{" "}
                {t("biographyPage.certification")}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ÖZGEÇMİŞ & AKADEMİK KARİYER */}
      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sol Kolon: Detaylı Biyografi */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[#A68B6D] text-xs tracking-widest uppercase font-semibold block border-b border-gray-200 pb-2 w-max">
                {t("biographyPage.lifeStory")}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-950">
                {t("biographyPage.educationTitle")}
              </h2>
            </div>

            <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
              {t("biographyPage.about1Part1")}
              <strong>{t("biographyPage.about1Strong")}</strong>
              {t("biographyPage.about1Part2")}
            </p>

            <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
              {t("biographyPage.about2")}
            </p>

            <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
              {t("biographyPage.about3")}
            </p>

            {/* İdari ve Bilimsel Üyelikler */}
            <div className="pt-6 space-y-4">
              <h3 className="font-serif text-lg font-normal text-gray-900 flex items-center gap-2">
                <BookOpen size={18} className="text-[#A68B6D]" />{" "}
                {t("biographyPage.membershipsTitle")}
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-500 font-light list-disc list-inside pl-1">
                {memberships?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sağ Kolon: Başarılar & Kilometre Taşları */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[#A68B6D] text-xs tracking-widest uppercase font-semibold block border-b border-gray-200 pb-2 w-max">
                {t("biographyPage.timelineTitle")}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-950">
                {t("biographyPage.timeline")}
              </h2>
            </div>

            {/* Zaman Tüneli Kartları */}
            <div className="space-y-6 border-l border-gray-200 pl-4 relative">
              {timeline?.map((item, index) => (
                <div key={index} className="relative space-y-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#A68B6D]"></div>

                  <span className="text-xs font-semibold text-[#A68B6D] font-mono">
                    {item.year}
                  </span>

                  <h4 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-500 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* İstatistik Ödül Paneli */}
            <div className="bg-[#F4F0EA] p-6 border border-gray-200/50 rounded-sm space-y-4 shadow-sm">
              <h3 className="font-serif text-sm uppercase tracking-wider font-semibold text-gray-900 flex items-center gap-2">
                <Award size={16} className="text-[#A68B6D]" />{" "}
                {t("biographyPage.achievementsTitle")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 border border-gray-100 rounded-sm"
                  >
                    <span className="font-serif text-2xl text-gray-900 font-light block">
                      {item.value}
                    </span>

                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ALT ALAN BANNER */}
      <section className=" py-16 border-t border-gray-100 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <Heart size={28} className="text-[#A68B6D] mx-auto animate-pulse" />
          <h3 className="font-serif text-2xl font-light text-gray-950">
            {t("biographyPage.appointment")}
          </h3>
          <p className="text-gray-500 font-light text-sm leading-relaxed">
            {t("biographyPage.appointmentText")}
          </p>
          <button
            onClick={() => navigate("/#iletisim")}
            className="px-8 py-3.5 bg-[#A68B6D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#93795C] transition-all rounded-sm shadow-md cursor-pointer inline-block"
          >
            {t("biographyPage.appointmentBtn")}
          </button>
        </div>
      </section>
      {/* 6. BÖLÜM: PREMIUM FOOTER ALANI */}
      <Footer />
    </div>
  );
}
