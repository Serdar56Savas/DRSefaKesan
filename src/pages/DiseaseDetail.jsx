import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Info,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import LanguageSelector from "../components/LanguageSelector";

export default function DiseaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const data = t(`procedures.${id}`, { returnObjects: true }) || {};

  const [sliderPos, setSliderPos] = useState(50);
  const [selectedSymptom, setSelectedSymptom] = useState("none");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBackToDiseases = () => {
    navigate("/");
    setTimeout(() => {
      const targetSection = document.getElementById("uzmanlik");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-gray-800 font-sans selection:bg-[#A68B6D] selection:text-white">
        <header className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between border-b border-gray-200/50">
          <button
            onClick={handleBackToDiseases}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> ANA SAYFAYA DÖN
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
        </header>
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400 text-sm font-light">
            Aradığınız tedavi yöntemi bulunamadı.
          </p>
        </div>
      </div>
    );
  }

  const currentSymptomData = data.symptoms?.find(
    (s) => s.id === selectedSymptom,
  );

  const renderSpecializedSVG = () => {
    const correction = sliderPos / 100;
    const defect = 1 - correction;
    const strokeColor = sliderPos > 80 ? "#D4AF37" : "#525252";
    const strokeWidth = 6;

    // SEMPTOM EŞLEŞTİRME (Dilden bağımsız çalışması için)
    const symptomMap = {
      // --- Rinoplasti ---
      kemer: "kemer",
      hump: "kemer",
      bosse: "kemer",
      gobba: "kemer",
      حدبة: "kemer",
      egrilik: "egrilik",
      deviation: "egrilik",
      deviation: "egrilik",
      deviazione: "egrilik",
      انحراف: "egrilik",
      dusukluk: "dusukluk",
      droopy: "dusukluk",
      tombant: "dusukluk",
      cadente: "dusukluk",
      تدلي: "dusukluk",

      // --- Otoplasti ---
      kepce: "kepce",
      prominent: "kepce",
      decollees: "kepce",
      sporgenti: "kepce",
      "اذن-بارزة": "kepce",

      // --- Yağ Enjeksiyonu ---
      hacim: "hacim",
      volume: "hacim",
      volume: "hacim",
      volume: "hacim",
      "فقدان-حجم": "hacim",

      // --- Bişektomi ---
      yanak: "yanak",
      fullness: "yanak",
      joues: "yanak",
      guance: "yanak",
      "امتلاء-الخد": "yanak",
    };

    const normalizedSymptom = symptomMap[selectedSymptom] || selectedSymptom;

    // 1. OTOPLASTİ
    if (id === "otoplasti") {
      let earAngleOffset = normalizedSymptom === "kepce" ? defect * 60 : 0;
      return (
        <g transform="translate(45, 20)">
          <path
            d="M 30 10 Q 45 80, 45 150"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="2"
            strokeDasharray="3,3"
          />
          <path
            d={`M 45 50 C ${70 + earAngleOffset} 20, ${115 + earAngleOffset} 60, ${100 + earAngleOffset} 100 C ${90 + earAngleOffset} 125, ${65 + earAngleOffset} 135, 45 120`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      );
    }

    // 2. BİŞEKTOMİ
    if (id === "bisektomi") {
      let curveX = normalizedSymptom === "yanak" ? 90 - correction * 45 : 60;
      return (
        <g transform="translate(20, 10)">
          <path
            d={`M 60 20 Q ${curveX} 90, 60 160`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="5"
            x2="60"
            y2="175"
            stroke="#A3A3A3"
            strokeWidth="2"
            strokeDasharray="6,6"
          />
        </g>
      );
    }

    // 3. YAĞ ENJEKSİYONU
    if (id === "yag-enjeksiyonu") {
      let volumeX = 60 + correction * 30;
      return (
        <g transform="translate(20, 15)">
          <path
            d={`M 60 20 Q 60 85, 60 150`}
            fill="none"
            stroke="#525252"
            strokeWidth="3"
          />
          {normalizedSymptom === "hacim" && (
            <path
              d={`M 60 45 C ${volumeX + 20} 45, ${volumeX + 20} 115, 60 115 Z`}
              fill="#D4AF37"
              fillOpacity={0.2 + correction * 0.5}
              stroke="#D4AF37"
              strokeWidth="2"
            />
          )}
          <line
            x1="60"
            y1="5"
            x2="60"
            y2="165"
            stroke="#E5E5E5"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        </g>
      );
    }

    // 4. RİNOPLASTİ
    if (id === "rinoplasti") {
      let bridgeX = 110,
        bridgeY = 90,
        tipX = 140,
        tipY = 130;
      if (normalizedSymptom === "kemer") {
        const h = defect * 70;
        bridgeX += h;
        bridgeY -= h * 0.2;
      } else if (normalizedSymptom === "egrilik") {
        const d = defect * 60;
        bridgeX += d;
        tipX -= d * 0.5;
      } else if (normalizedSymptom === "dusukluk") {
        const dr = defect * 50;
        tipY += dr;
        tipX -= dr * 0.3;
      }
      return (
        <g transform="translate(-10, -10)">
          <line
            x1="110"
            y1="10"
            x2="110"
            y2="190"
            stroke="#A3A3A3"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <path
            d={`M 60 40 Q ${bridgeX} ${bridgeY}, ${tipX} ${tipY} Q 110 150, 110 170`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      );
    }

    return <g />;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-800 font-sans antialiased selection:bg-[#A68B6D] selection:text-white flex flex-col justify-between">
      {/* HEADER BÖLÜMÜ */}
      <header className="fixed top-0 left-0 w-full h-24 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-gray-200/40 z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <button
            onClick={handleBackToDiseases}
            className="group flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft
              size={15}
              className="transform group-hover:-translate-x-1 transition-transform text-[#A68B6D]"
            />
            <span>ANA SAYFAYA DÖN</span>
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
      </header>

      {/* ANA İÇERİK */}
      <main className="pt-36 pb-12 max-w-5xl mx-auto px-6 w-full flex-grow">
        {/* Başlık */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-light text-gray-950 mb-3 tracking-wide">
            {data.title}
          </h1>
          <p className="text-[#A68B6D] font-light italic text-base tracking-wide">
            {data.subtitle}
          </p>
        </div>

        {/* SIMÜLATÖR PANELİ */}
        <div className="bg-white border border-gray-200/80 shadow-sm rounded-sm p-6 mb-12">
          <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68B6D] font-bold block">
                {t("diseaseDetail.interactiveSimulator")}
              </span>

              <h2 className="font-serif text-xl font-light text-gray-900 mt-0.5">
                {t("diseaseDetail.anatomicalAnalysis")}
              </h2>
            </div>

            <div className="text-xs text-gray-400 font-light">
              {sliderPos === 0
                ? t("diseaseDetail.statusBefore")
                : sliderPos === 100
                  ? t("diseaseDetail.statusAfter")
                  : `${t("diseaseDetail.changeRate")}: %${sliderPos}`}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-7 flex flex-col justify-between bg-gray-50/50 p-4 border border-gray-100 rounded-sm">
              <div className="w-full aspect-[4/3] relative overflow-hidden select-none bg-[#F7F5F0] rounded-sm flex items-center justify-center border border-gray-200/60 shadow-inner">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full max-w-[280px]"
                >
                  {renderSpecializedSVG()}
                </svg>
                <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  {t("diseaseDetail.before")}
                </div>
                <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-[#A68B6D] font-bold">
                  {t("diseaseDetail.after")}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 bg-white p-3 border border-gray-100 rounded-sm">
                <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                  {t("diseaseDetail.profileChange")}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-[#A68B6D] h-1 bg-gray-200 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono font-bold bg-[#FAF8F5] px-2 py-1 border border-gray-200 text-gray-700 rounded shadow-sm w-12 text-center">
                  %{sliderPos}
                </span>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between bg-[#FAF8F5] p-5 border border-gray-200/60 rounded-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#A68B6D] tracking-wide flex items-center gap-1.5">
                    <Info size={15} /> {t("diseaseDetail.clinicalAlgorithm")}
                  </h3>
                  <p className="text-[11px] italic text-gray-500 mt-1">
                    {t("diseaseDetail.clinicalAlgorithmDesc")}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">
                    {t("diseaseDetail.complaintType")}
                  </label>
                  <select
                    value={selectedSymptom}
                    onChange={(e) => {
                      setSelectedSymptom(e.target.value);
                      setSliderPos(0);
                    }}
                    className="w-full bg-white p-3 text-xs border border-gray-200 focus:border-[#A68B6D] outline-none rounded-sm cursor-pointer text-gray-800 font-medium shadow-sm"
                  >
                    <option value="none">
                      {t("diseaseDetail.generalProfile")}
                    </option>
                    {data.symptoms?.map((symptom) => (
                      <option key={symptom.id} value={symptom.id}>
                        {symptom.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-amber-50/30 border-l-2 border-[#A68B6D] p-4 rounded-sm min-h-[110px] flex flex-col justify-center">
                  <h4 className="text-[11px] uppercase tracking-widest text-gray-900 font-bold mb-1">
                    {t("diseaseDetail.surgicalSolution")}:
                  </h4>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {selectedSymptom === "none"
                      ? t("diseaseDetail.selectComplaint")
                      : currentSymptomData?.path}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-gray-200/60 pt-4 mt-4 text-center">
                <div className="bg-white p-2 border border-gray-100 rounded-sm">
                  <span className="text-[9px] uppercase text-gray-400 block font-medium">
                    {t("diseaseDetail.consultation")}
                  </span>
                  <span className="text-xs text-green-700 font-semibold block mt-0.5">
                    {t("diseaseDetail.available")}
                  </span>
                </div>
                <div className="bg-white p-2 border border-gray-100 rounded-sm">
                  <span className="text-[9px] uppercase text-gray-400 block font-medium">
                    {t("diseaseDetail.segment")}
                  </span>
                  <span className="text-xs text-gray-800 font-semibold block mt-0.5">
                    {t("diseaseDetail.premiumEnt")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href={`https://wa.me/905000000000?text=Merhaba,%20${encodeURIComponent(data.title)}%20bölümündeki%20interaktif%20klinik%20simülasyonu%20inceledim.%20Detaylı%20muayene%20randevusu%20almak%20istiyorum.`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-neutral-950 text-white font-medium text-xs uppercase tracking-widest hover:bg-neutral-900 transition-all rounded-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle size={16} className="text-[#A68B6D]" />{" "}
              {t("diseaseDetail.quickConsultation")}
            </a>
          </div>
        </div>

        {/* Tedavi Hakkında ve Süreç Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          <div className="md:col-span-7">
            <h3 className="font-serif text-lg font-normal text-gray-950 mb-3 border-b border-gray-200 pb-2">
              {t("diseaseDetail.aboutTreatment")}
            </h3>
            <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
              {data.content}
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="bg-neutral-900 p-6 border border-white/5 rounded-sm shadow-xl space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#A68B6D] font-bold border-b border-white/10 pb-2">
                {t("diseaseDetail.operationProcess")}
              </h4>
              <div className="space-y-3">
                {data.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm font-light text-neutral-200"
                  >
                    <CheckCircle
                      size={15}
                      className="text-[#A68B6D] shrink-0"
                    />
                    <span className="tracking-wide">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 6. BÖLÜM: PREMIUM FOOTER ALANI */}
      <Footer />
    </div>
  );
}
