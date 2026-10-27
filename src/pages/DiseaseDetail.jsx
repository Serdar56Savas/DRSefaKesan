import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Info,
  MessageCircle,
  ShieldCheck,
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
  Camera,
  Layers,
  ArrowRight,
  RotateCw,
  Move,
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
  const [activeRecoveryStage, setActiveRecoveryStage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSliderPos(50);
    setSelectedSymptom("none");
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

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-gray-800 font-sans">
        <header className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between border-b border-gray-200/50">
          <button
            onClick={handleBackToDiseases}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> ANA SAYFAYA DÖN
          </button>
          <LanguageSelector />
        </header>
        <div className="h-[60vh] flex items-center justify-center">
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

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - rotation.y, y: e.clientY - rotation.x });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newY = e.clientX - dragStart.x;
    const newX = e.clientY - dragStart.y;
    setRotation({
      x: Math.max(-45, Math.min(45, newX)),
      y: newY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 1. OPERASYON KÜNYESİ DİNAMİK VERİLERİ
  const getSurgerySpecs = () => {
    // i18n üzerinden ilgili dildeki künye verisini çekiyoruz
    const specs = t(`surgerySpecs.${id}`, { returnObjects: true });

    // Eğer çeviri dosyasında o ID'ye ait özel bir künye yoksa varsayılanı (rinoplasti vb.) döner
    if (typeof specs === "object" && specs !== null && !Array.isArray(specs)) {
      return specs;
    }
    return t("surgerySpecs.default", { returnObjects: true });
  };

  const specs = getSurgerySpecs();

  // 2. İYİLEŞME GRAFİĞİ VERİLERİ
  const getRecoveryGraphData = () => {
    // i18n üzerinden ilgili dildeki dizi verisini çekiyoruz
    const data = t(`recoveryData.${id}`, { returnObjects: true });

    // Eğer çeviri dosyasında o ID'ye ait özel bir dizi yoksa varsayılanı (rinoplasti) döner
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return t("recoveryData.default", { returnObjects: true });
  };

  const recoveryData = getRecoveryGraphData();
  const currentStage = recoveryData[activeRecoveryStage] || recoveryData[0];

  // 3. ANATOMİK SİMÜLÂTÖR SVG ÇİZİM MANTIĞI
  const renderSpecializedSVG = () => {
    const correction = sliderPos / 100;
    const defect = 1 - correction;
    const strokeColor = sliderPos > 80 ? "#D4AF37" : "#525252";
    const strokeWidth = 6;

    // Semptom Eşleştirme (Tüm diller için)
    const symptomMap = {
      kemer: "kemer",
      hump: "kemer",
      bosse: "kemer",
      gobba: "kemer",
      حدبة: "kemer",

      egrilik: "egrilik",
      deviaitonError: "egrilik",
      déviationFrontale: "egrilik",
      deviazione: "egrilik",
      انحراف: "egrilik",

      dusukluk: "dusukluk",
      droopy: "dusukluk",
      tombant: "dusukluk",
      cadente: "dusukluk",
      تدلي: "dusukluk",

      kepce: "kepce",
      prominent: "kepce",
      oreilles: "kepce",
      decollees: "kepce",
      sporgenti: "kepce",
      "اذن-بارزة": "kepce",
      hacim: "hacim",
      volumeLoss: "hacim",
      perte: "hacim",
      perdita: "hacim",
      "فقدان-حجم": "hacim",
      yanak: "yanak",
      fullness: "yanak",
      joues: "yanak",
      guance: "yanak",
      "امتلاء-الخد": "yanak",
      // --- Revizyon Spesifik Semptomlar ---

      // Pollybeak
      pollybeak: "pollybeak",
      "papağan-gagası": "pollybeak",
      "bec-de-perroquet": "pollybeak",
      "naso-a-pappagallo": "pollybeak",
      "منقار-الببغاء": "pollybeak",

      // Nazal Valv Çökmesi
      "valve-collapse": "valve-collapse",
      "nazal-valv": "valve-collapse",
      "collapsus-valve": "valve-collapse",
      "collasso-valvola": "valve-collapse",
      "انهيار-الصمام": "valve-collapse",

      // Burun Ucu Asimetrisi
      "tip-asymmetry": "tip-asymmetry",
      asimetri: "tip-asymmetry",
      asymétrie: "tip-asymmetry",
      asimmetria: "tip-asymmetry",
      "عدم-تناسق": "tip-asymmetry",

      // Kolumella Çekilmesi
      "columella-retraction": "columella-retraction",
      kolumella: "columella-retraction",
      "retraction-columelle": "columella-retraction",
      "retrazione-columella": "columella-retraction",
      "انكماش-الكولوميلا": "columella-retraction",

      // Ters V Deformitesi
      "inverted-v": "inverted-v",
      "ters-v": "inverted-v",
      "v-inversé": "inverted-v",
      "v-invertita": "inverted-v",
      "حرف-v-مقلوب": "inverted-v",
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

    // 4. RİNOPLASTİ ve REVİZYON RİNOPLASTİ
    if (id.includes("rinoplasti")) {
      const isRevizyon = id === "revizyon-rinoplasti";

      // 1. Başlangıç Değerleri
      let bridgeX = isRevizyon ? 115 : 110;
      let bridgeY = isRevizyon ? 85 : 90;
      let tipX = isRevizyon ? 135 : 140;
      let tipY = isRevizyon ? 135 : 130;

      // 2. Semptom hesaplaması (Ortak + Revizyon Özel)
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
      // --- Revizyon Özel Semptomlar ---
      else if (normalizedSymptom === "pollybeak") {
        // Burun ucunda şişkinlik simülasyonu
        tipY -= defect * 20;
        bridgeY += defect * 15;
      } else if (normalizedSymptom === "valve-collapse") {
        // Burun kanadı çökmesi etkisi
        bridgeX += defect * 20;
        tipX -= defect * 10;
      } else if (normalizedSymptom === "tip-asymmetry") {
        // Asimetri için yatay kaydırma
        tipX += defect * 25;
      } else if (normalizedSymptom === "columella-retraction") {
        // Kolumella çekilmesi için ucu aşağı ve içeri çekme
        tipY += defect * 40;
        tipX += defect * 5;
      } else if (normalizedSymptom === "inverted-v") {
        // Ters V için köprü yapısını genişletme
        bridgeX += defect * 30;
        bridgeY += defect * 10;
      }

      // 3. Render
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

          {isRevizyon && (
            <path
              d="M 80 120 Q 110 110, 140 120"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
          )}

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

  const allTreatmentKeys = [
    "rinoplasti",
    "revizyon-rinoplasti",
    "otoplasti",
    "yag-enjeksiyonu",
    "bisektomi",
  ];

  // Dil dosyasından ilgili tedavinin çevirisini çeken yardımcı fonksiyon
  const getTreatmentTitle = (treatId) => {
    return t(`treatmentsList.${treatId}`, {
      defaultValue: treatId.replace("-", " "),
    });
  };

  // İnsan Kafa Anatomisi ve Tedaviye Göre Değişen SVG Modeli

  const renderHumanHeadSVG = () => {
    const progress = Math.max(0, Math.min(100, Number(sliderPos) || 0)) / 100;
    const defect = 1 - progress;

    const gold = "#D4AF6A";
    const skin = "#C8B398";

    const isRino = id?.includes("rinoplasti");
    const isRevision = id === "revizyon-rinoplasti";
    const isEar = id === "otoplasti";
    const isCheek = id === "bisektomi";
    const isFat = id === "yag-enjeksiyonu";

    // Çok dilli semptom adlarını ortak değerlere dönüştür.
    const aliases = {
      hump: "kemer",
      bosse: "kemer",
      gobba: "kemer",
      حدبة: "kemer",

      deviation: "egrilik",
      deviaitonError: "egrilik",
      "déviation-frontale": "egrilik",
      deviazione: "egrilik",
      انحراف: "egrilik",

      droopy: "dusukluk",
      tombant: "dusukluk",
      cadente: "dusukluk",
      تدلي: "dusukluk",

      prominent: "kepce",
      oreilles: "kepce",
      decollees: "kepce",
      sporgenti: "kepce",
      "اذن-بارزة": "kepce",

      fullness: "yanak",
      joues: "yanak",
      guance: "yanak",
      "امتلاء-الخد": "yanak",

      volumeLoss: "hacim",
      perte: "hacim",
      perdita: "hacim",
      "فقدان-حجم": "hacim",

      "papağan-gagası": "pollybeak",
      "bec-de-perroquet": "pollybeak",
      "naso-a-pappagallo": "pollybeak",
      "منقار-الببغاء": "pollybeak",

      "nazal-valv": "valve-collapse",
      "collapsus-valve": "valve-collapse",
      "collasso-valvola": "valve-collapse",
      "انهيار-الصمام": "valve-collapse",

      asimetri: "tip-asymmetry",
      asymétrie: "tip-asymmetry",
      asimmetria: "tip-asymmetry",
      "عدم-تناسق": "tip-asymmetry",

      kolumella: "columella-retraction",
      "retraction-columelle": "columella-retraction",
      "retrazione-columella": "columella-retraction",
      "انكماش-الكولوميلا": "columella-retraction",

      "ters-v": "inverted-v",
      "v-inversé": "inverted-v",
      "v-invertita": "inverted-v",
      "حرف-v-مقلوب": "inverted-v",
    };

    const symptom = aliases[selectedSymptom] || selectedSymptom;

    // Yüz profilinin burun koordinatları.
    // Burun kökü sabit; yalnızca seçilen alt dal ilgili noktaları değiştirir.
    let rootX = 151;
    let rootY = 84;
    let bridgeX = 160;
    let bridgeY = 96;
    let tipX = 176;
    let tipY = 111;
    let undersideX = 168;
    let undersideY = 117;
    let hump = 0;
    let asymmetry = 0;
    let valveIndent = 0;
    let columella = 0;

    if (isRino) {
      switch (symptom) {
        case "kemer":
          hump = defect * 9;
          break;

        case "egrilik":
          asymmetry = defect * 7;
          bridgeX += defect * 4;
          tipX -= defect * 3;
          break;

        case "dusukluk":
          tipY += defect * 13;
          undersideY += defect * 13;
          tipX -= defect * 2;
          break;

        case "pollybeak":
          bridgeY += defect * 6;
          undersideY -= defect * 2;
          break;

        case "valve-collapse":
          valveIndent = defect * 5;
          break;

        case "tip-asymmetry":
          tipX += defect * 7;
          undersideX += defect * 4;
          break;

        case "columella-retraction":
          columella = defect * 7;
          undersideY -= defect * 3;
          break;

        case "inverted-v":
          bridgeX += defect * 5;
          bridgeY += defect * 4;
          break;

        default:
          break;
      }
    }

    // Ortak profil koordinatları; burun yüzün dış sınırına dahildir.
    const noseTipX = tipX + asymmetry;
    const noseTipY = tipY;
    const noseUnderX = undersideX + asymmetry - valveIndent;
    const noseUnderY = undersideY;

    // Kulak çıkıklığı, başa göre ölçülür; kulak yüzün önüne taşınmaz.
    const earOut = isEar && symptom === "kepce" ? defect * 7 : 0;

    // Yanak konturu için operasyonun şiddeti.
    const cheekActive =
      (isCheek && symptom === "yanak") || (isFat && symptom === "hacim");

    const cheekAmount = cheekActive ? defect : 0;

    const label = isRevision
      ? "REVİZYON RİNOPLASTİ"
      : isRino
        ? "RİNOPLASTİ"
        : isEar
          ? "OTOPLASTİ"
          : isCheek
            ? "BİŞEKTOMİ"
            : isFat
              ? "YAĞ ENJEKSİYONU"
              : "YÜZ ANATOMİSİ";

    return (
      <svg
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${label} anatomik görselleştirme`}
        className="mx-auto h-full w-full max-w-[320px]"
      >
        <defs>
          <linearGradient id="faceGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D6BFA3" stopOpacity=".16" />
            <stop offset="100%" stopColor="#806B58" stopOpacity=".02" />
          </linearGradient>

          <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* BAŞ: burun dış profiliyle aynı koordinat sisteminde */}
        <path
          d={`
          M 58 43
          C 82 23 119 25 141 42
          C 155 54 160 68 ${rootX} ${rootY}
          Q ${bridgeX + asymmetry} ${bridgeY - hump}
            ${noseTipX} ${noseTipY}
          Q ${noseTipX + 5} ${noseTipY + 4}
            ${noseUnderX} ${noseUnderY}
          Q 164 ${121 + columella}
            170 ${124 + columella}
          Q 174 127 166 130
          Q 160 131 165 135
          Q 170 139 160 145
          C 154 154 145 158 142 167
          C 139 183 122 199 101 207
          L 64 199
          C 54 180 48 156 45 132
          C 38 101 39 66 58 43 Z
        `}
          fill="url(#faceGradient)"
          stroke={skin}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        {/* ALIN */}
        <path
          d="M 61 58 Q 91 41 122 59"
          fill="none"
          stroke={skin}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* GÖZ */}
        <path
          d="M 116 79 Q 129 70 141 80 Q 129 89 116 79 Z"
          fill="none"
          stroke={skin}
          strokeWidth="1.5"
        />
        <circle cx="129" cy="79" r="2.5" fill={skin} />

        {/* BURUN: dış profil ile birebir aynı kök, sırt ve uç noktaları */}
        {isRino && (
          <g
            fill="none"
            stroke={gold}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#goldGlow)"
          >
            <path
              d={`
              M ${rootX} ${rootY}
              Q ${bridgeX + asymmetry} ${bridgeY - hump}
                ${noseTipX} ${noseTipY}
            `}
              strokeWidth="2.7"
            />

            <path
              d={`
              M ${noseTipX} ${noseTipY}
              Q ${noseTipX + 5} ${noseTipY + 4}
                ${noseUnderX} ${noseUnderY}
              Q 164 ${121 + columella}
                170 ${124 + columella}
            `}
              strokeWidth="2.4"
            />
          </g>
        )}

        {/* KULAK: başın yan tarafında sabit anatomik bölge */}
        <g>
          <path
            d={`
            M ${111 - earOut} 92
            C ${99 - earOut} 85
              ${93 - earOut} 99
              ${97 - earOut} 115
            C ${100 - earOut} 128
              ${108 - earOut} 135
              ${115 - earOut} 124
            C ${121 - earOut} 112
              ${119 - earOut} 99
              ${111 - earOut} 92 Z
          `}
            fill={isEar ? gold : "none"}
            fillOpacity={isEar ? 0.15 + defect * 0.12 : 0}
            stroke={isEar ? gold : skin}
            strokeWidth={isEar ? 2.5 : 1.5}
          />

          <path
            d={`
            M ${108 - earOut} 100
            Q ${101 - earOut} 103
              ${106 - earOut} 113
            Q ${113 - earOut} 119
              ${108 - earOut} 125
          `}
            fill="none"
            stroke={isEar ? gold : skin}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>

        {/* YANAK: yalnızca ilgili işlem ve alt dal seçildiğinde */}
        {(isCheek || isFat) && (
          <g>
            <path
              d={`
              M 108 104
              Q ${126 + cheekAmount * (isCheek ? 10 : 16)} 111
                ${130 + cheekAmount * (isCheek ? 10 : 16)} 128
              Q ${127 + cheekAmount * 5} 143
                111 151
              Q 117 130 108 104 Z
            `}
              fill={gold}
              fillOpacity={0.05 + cheekAmount * 0.22}
              stroke={gold}
              strokeWidth="1.4"
            />

            {isFat && symptom === "hacim" && (
              <g fill={gold} filter="url(#goldGlow)">
                <circle cx="115" cy="117" r={1.5 + defect * 1.5} />
                <circle cx="122" cy="127" r={1.5 + defect * 1.5} />
                <circle cx="116" cy="137" r={1.5 + defect * 1.5} />
              </g>
            )}
          </g>
        )}

        {/* REVİZYON: işaretleme yalnızca burun bölgesinde */}
        {isRevision && (
          <path
            d="M 153 88 Q 164 99 174 111"
            fill="none"
            stroke={gold}
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
        )}

        {/* ALT ETİKET */}
        <path
          d="M 42 218 H 198"
          stroke="rgba(212,175,106,.35)"
          strokeWidth=".8"
        />

        <text
          x="120"
          y="230"
          textAnchor="middle"
          fill={gold}
          fontSize="8"
          letterSpacing=".8"
        >
          {label}
        </text>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-800 font-sans antialiased flex flex-col justify-between">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full h-24 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-gray-200/40 z-50">
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
          <LanguageSelector />
        </div>
      </header>

      {/* ANA İÇERİK */}
      <main className="pt-36 pb-20 max-w-5xl mx-auto px-6 w-full flex-grow space-y-16">
        {/* BAŞLIK */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A68B6D]/10 rounded-full mb-3">
            <ShieldCheck size={14} className="text-[#A68B6D]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B6D]">
              {t("treatmentDetail.clinicalBadge")}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-gray-950 mb-3 tracking-wide">
            {data.title}
          </h1>
          <p className="text-[#A68B6D] font-light italic text-base md:text-lg tracking-wide max-w-2xl">
            {data.subtitle}
          </p>
        </div>

        {/* OPERASYON KÜNYESİ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 text-center space-y-1 shadow-2xs">
            <span className="text-[10px] text-gray-400 uppercase font-medium block tracking-wider">
              {t("surgerySpecsLabels.anesthesia")}
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-900">
              {specs.anesthesia}
            </span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 text-center space-y-1 shadow-2xs">
            <span className="text-[10px] text-gray-400 uppercase font-medium block tracking-wider">
              {t("surgerySpecsLabels.duration")}
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-900">
              {specs.duration}
            </span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 text-center space-y-1 shadow-2xs">
            <span className="text-[10px] text-gray-400 uppercase font-medium block tracking-wider">
              {t("surgerySpecsLabels.stay")}
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-900">
              {specs.stay}
            </span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 text-center space-y-1 shadow-2xs">
            <span className="text-[10px] text-gray-400 uppercase font-medium block tracking-wider">
              {t("surgerySpecsLabels.returnWork")}
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-900">
              {specs.returnWork}
            </span>
          </div>
        </div>

        {/* İNTERAKTİF SİMÜLÂTÖR */}
        <div className="bg-white border border-gray-200/80 shadow-sm rounded-2xl p-6 md:p-8">
          <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A68B6D] font-bold block">
                {t("diseaseDetail.interactiveSimulator")}
              </span>
              <h2 className="font-serif text-xl font-light text-gray-900 mt-0.5">
                {t("diseaseDetail.anatomicalAnalysis")}
              </h2>
            </div>
            <div className="text-xs text-gray-400 font-light font-mono">
              {sliderPos === 0
                ? t("diseaseDetail.statusBefore")
                : sliderPos === 100
                  ? t("diseaseDetail.statusAfter")
                  : `${t("diseaseDetail.changeRate")}: %${sliderPos}`}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-7 flex flex-col justify-between bg-gray-50/50 p-5 border border-gray-100 rounded-xl">
              <div className="w-full aspect-[4/3] relative overflow-hidden select-none bg-[#F7F5F0] rounded-lg flex items-center justify-center border border-gray-200/60 shadow-inner">
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

              <div className="mt-4 flex items-center gap-4 bg-white p-3 border border-gray-100 rounded-lg shadow-2xs">
                <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                  {t("diseaseDetail.profileChange")}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-[#A68B6D] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono font-bold bg-[#FAF8F5] px-2.5 py-1 border border-gray-200 text-gray-700 rounded shadow-2xs w-14 text-center">
                  %{sliderPos}
                </span>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between bg-[#FAF8F5] p-5 border border-gray-200/60 rounded-xl">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-[#A68B6D] tracking-wider uppercase flex items-center gap-1.5">
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
                    className="w-full bg-white p-3 text-xs border border-gray-200 focus:border-[#A68B6D] outline-none rounded-lg cursor-pointer text-gray-800 font-medium shadow-2xs"
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

                <div className="bg-amber-50/40 border-l-2 border-[#A68B6D] p-4 rounded-r-lg min-h-[110px] flex flex-col justify-center">
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

              <div className="mt-4 pt-4 border-t border-gray-200/60 text-center">
                <a
                  href={`https://wa.me/905369242558?text=Merhaba,%20${encodeURIComponent(data.title)}%20randevusu%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-neutral-950 text-white text-xs uppercase tracking-widest hover:bg-neutral-900 transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle size={15} className="text-[#A68B6D]" />{" "}
                  {t("diseaseDetail.quickConsultation")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 360° DÖNDÜRÜLEBİLİR İNTERAKTİF ANATOMİK MODEL */}
        {/* 360° İNTERAKTİF İNSAN KAFA ANATOMİSİ MODELİ */}
        <div className="bg-gradient-to-br from-white via-[#FAF8F5] to-white p-6 md:p-8 rounded-2xl border border-[#A68B6D]/30 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200/80 pb-5 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A68B6D]/15 rounded-full mb-2">
                <RotateCw size={13} className="text-[#A68B6D] animate-spin" />
                <span className="text-[#A68B6D] text-[10px] font-bold uppercase tracking-[0.2em]">
                  {t("anatomy.sectionBadge")}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-950">
                {t("anatomy.sectionTitle")}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs">
              <Move size={14} className="text-[#A68B6D]" />{" "}
              {t("anatomy.dragInstruction")}
            </div>
          </div>

          {/* Döndürülebilir Kafa Alanı */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative h-[380px] md:h-[450px] w-full max-w-3xl mx-auto rounded-2xl bg-neutral-950 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center shadow-2xl border border-white/15"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>

            <div
              className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-75 ease-out flex items-center justify-center"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 rounded-3xl border border-[#A68B6D]/30 bg-[#A68B6D]/5 backdrop-blur-xs flex items-center justify-center shadow-[0_0_50px_rgba(166,139,109,0.15)]">
                {renderHumanHeadSVG()}
              </div>

              <div className="absolute inset-[-20px] rounded-full border border-dashed border-white/20 animate-[spin_25s_linear_infinite]"></div>
            </div>

            <div className="absolute bottom-4 inset-x-4 flex justify-between items-center text-[10px] font-mono text-gray-400 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span>X: {Math.round(rotation.x)}°</span>
              <span className="text-[#A68B6D] font-bold">
                {t("anatomy.modelBadge")}
              </span>
              <span>Y: {Math.round(rotation.y)}°</span>
            </div>
          </div>
        </div>

        {/* İYİLEŞME PERFORMANS GRAFİĞİ */}
        <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-200/80 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-5">
            <div>
              <span className="text-[#A68B6D] text-xs tracking-[0.2em] uppercase font-bold block mb-1 flex items-center gap-1.5">
                <TrendingUp size={16} /> {t("recovery.sectionBadge")}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-950">
                {t("recovery.sectionTitle")}
              </h3>
            </div>
            <span className="text-xs text-gray-400 font-light mt-2 md:mt-0">
              {t("recovery.sectionSubtitle")}
            </span>
          </div>

          <div className="relative w-full bg-[#FAF8F5] p-6 rounded-xl border border-gray-200/60 overflow-hidden">
            <div className="flex items-center justify-between mb-2 text-xs text-gray-400 font-mono">
              <span>{t("recovery.rateLabel")}</span>
              <span className="text-[#A68B6D] font-bold">
                {t("recovery.activationLabel")}: {currentStage.day}
              </span>
            </div>

            <div className="h-44 w-full relative">
              <svg
                viewBox="0 0 400 120"
                className="w-full h-full overflow-visible"
              >
                <line
                  x1="0"
                  y1="30"
                  x2="400"
                  y2="30"
                  stroke="#E5E5E5"
                  strokeDasharray="3,3"
                />
                <line
                  x1="0"
                  y1="70"
                  x2="400"
                  y2="70"
                  stroke="#E5E5E5"
                  strokeDasharray="3,3"
                />
                <defs>
                  <linearGradient
                    id="recoveryGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#A68B6D" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A68B6D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,100 Q 100,75 200,45 T 400,10 L 400,120 L 0,120 Z"
                  fill="url(#recoveryGradient)"
                />
                <path
                  d="M 0,100 Q 100,75 200,45 T 400,10"
                  fill="none"
                  stroke="#A68B6D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {recoveryData.map((item, idx) => {
                  const points = [
                    { x: 20, y: 100 },
                    { x: 130, y: 70 },
                    { x: 260, y: 35 },
                    { x: 380, y: 10 },
                  ];
                  const isSelected = activeRecoveryStage === idx;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer"
                      onClick={() => setActiveRecoveryStage(idx)}
                    >
                      <circle
                        cx={points[idx].x}
                        cy={points[idx].y}
                        r={isSelected ? "8" : "5"}
                        fill={isSelected ? "#A68B6D" : "#ffffff"}
                        stroke="#A68B6D"
                        strokeWidth="3"
                        className="transition-all duration-300"
                      />
                      <text
                        x={points[idx].x}
                        y={points[idx].y - 12}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill={isSelected ? "#A68B6D" : "#737373"}
                      >
                        %{item.rate}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recoveryData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveRecoveryStage(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  activeRecoveryStage === idx
                    ? "bg-[#A68B6D] text-white border-[#A68B6D] shadow-md"
                    : "bg-[#FAF8F5] text-gray-700 border-gray-200/80 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`text-[10px] font-bold font-mono block mb-1 ${activeRecoveryStage === idx ? "text-white/80" : "text-[#A68B6D]"}`}
                >
                  {item.day}
                </span>
                <h4 className="text-xs font-semibold leading-tight">
                  {item.title}
                </h4>
              </button>
            ))}
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-xl border border-gray-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#A68B6D]" />
                <h4 className="text-sm font-bold text-gray-900">
                  {currentStage.day} - {currentStage.title}
                </h4>
              </div>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                {currentStage.desc}
              </p>
            </div>

            <div className="md:col-span-4 bg-white p-4 rounded-lg border border-gray-200/60 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 uppercase tracking-wider">
                <AlertCircle size={13} /> {t("recovery.criticalTipTitle")}
              </span>
              <p className="text-xs text-gray-700 font-light italic">
                {currentStage.tip}
              </p>
            </div>
          </div>
        </div>

        {/* AÇIKLAMA VE ADIMLAR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-light text-gray-950 border-b border-gray-200 pb-2">
              {t("diseaseDetail.aboutTreatment")}
            </h3>
            <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
              {data.content}
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="bg-neutral-900 p-6 md:p-8 border border-white/5 rounded-2xl shadow-xl space-y-4 text-white">
              <h4 className="text-xs uppercase tracking-widest text-[#A68B6D] font-bold border-b border-white/10 pb-3 flex items-center gap-2">
                <Activity size={16} /> {t("diseaseDetail.operationProcess")}
              </h4>
              <div className="space-y-3">
                {data.steps?.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-xs md:text-sm font-light text-neutral-200"
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#A68B6D] shrink-0"
                    />
                    <span className="tracking-wide leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BANNER */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 p-8 md:p-10 rounded-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[#A68B6D] text-[10px] uppercase font-bold tracking-[0.2em] flex items-center justify-center md:justify-start gap-1.5">
              <Camera size={14} /> {t("banner.badge")}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-light">
              {t("banner.title")}
            </h3>
            <p className="text-xs text-gray-400 font-light max-w-lg">
              {t("banner.desc")}
            </p>
          </div>
          <a
            href={`https://wa.me/905369242558?text=${encodeURIComponent(
              t("banner.whatsappMsg", { title: data.title }),
            )}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-8 py-4 bg-[#A68B6D] hover:bg-[#8F7559] text-white text-xs uppercase tracking-widest font-semibold rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle size={18} />
            <span>{t("banner.buttonText")}</span>
          </a>
        </div>

        {/* GEÇİŞ KARTLARI */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-serif text-xl font-light text-gray-950 flex items-center gap-2">
              <Layers size={18} className="text-[#A68B6D]" />{" "}
              {t("relatedTreatments.sectionTitle")}
            </h3>
            <button
              onClick={handleBackToDiseases}
              className="text-xs text-[#A68B6D] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              {t("relatedTreatments.viewAll")} <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allTreatmentKeys
              .filter((treatId) => treatId !== id)
              .slice(0, 3)
              .map((treatId) => (
                <div
                  key={treatId}
                  onClick={() => navigate(`/tedavi/${treatId}`)}
                  className="bg-white p-5 rounded-xl border border-gray-200/80 hover:border-[#A68B6D] transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#A68B6D] font-bold block">
                      {t("relatedTreatments.cardBadge")}
                    </span>
                    <h4 className="text-sm font-serif text-gray-900 group-hover:text-[#A68B6D] transition-colors uppercase">
                      {getTreatmentTitle(treatId)}{" "}
                    </h4>
                  </div>
                  <span className="text-gray-400 group-hover:translate-x-1 group-hover:text-[#A68B6D] transition-all">
                    &rarr;
                  </span>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
