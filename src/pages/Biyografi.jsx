import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  ShieldCheck,
  Sparkles,
  Play,
  Video,
  Activity,
  MessageCircle,
  Mail,
  ChevronDown,
  Sliders,
  Star,
  Zap,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Camera,
} from "lucide-react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import ClinicTechnologies from "../components/ClinicTechnologies";
import FaqSection from "../components/FaqSection";

// ----------------------------------------------------------------------
// 3. ANA SAYFA BİLEŞENİ: BİYOGRAFİ
// ----------------------------------------------------------------------
export default function Biyografi() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const memberships = t("biographyPage.memberships", { returnObjects: true });
  const timeline = t("biographyPage.timelineCards", { returnObjects: true });
  const achievements = t("biographyPage.achievements", { returnObjects: true });

  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappNumber = "905369242558";
  const whatsappMessage = encodeURIComponent(t("whatsappExamMessage"));

  // Kapsamlı SSS Verileri
  const faqs = [
    {
      cat: "rinoplasti",
      q: "Ameliyat öncesi 3D simülasyon ve planlama nasıl yapılıyor?",
      a: "İlk muayenede 3D yüz analiz teknolojisi ile yüz hatlarınız dijital ortama aktarılır. Altın oran prensiplerine uygun olarak, yüzünüzün doğal anatomisini bozmayacak kişiye özel burun tasarımı birlikte planlanır.",
    },
    {
      cat: "rinoplasti",
      q: "Ultrasonik (Piezo) Rinoplasti tekniğinin avantajları nelerdir?",
      a: "Piezo teknolojisi, geleneksel kırma yöntemlerinin aksine ses dalgaları ile kemik dokuyu hassasça şekillendirir. Yumuşak doku ve damarlar zarar görmediği için ameliyat sonrası morluk ve şişlik minimum düzeydedir.",
    },
    {
      cat: "rinoplasti",
      q: "Ameliyatta silikon tampon mu yoksa bez tampon mu kullanılıyor?",
      a: "Kliniğimizde hastalarımızın nefes konforunu sağlamak amacıyla ortası oluklu, nefes almayı engellemeyen silikon oluklu splintler kullanılır. Çıkarılması son derece ağrısız ve saniyeler süren bir işlemdir.",
    },
    {
      cat: "iyilesme",
      q: "Ameliyat sonrası iyileşme süreci nasıl ilerler?",
      a: "İlk 2-3 gün hafif ödem görülebilir. 7. günde burun üzerindeki koruyucu atel ve silikonlar çıkarılır. Hastalarımız 1. haftanın sonunda rahatlıkla sosyal ve iş hayatlarına dönebilirler.",
    },
    {
      cat: "iyilesme",
      q: "Burun tam şeklini ne zaman alır?",
      a: "Ödemlerin %80'i ilk 1-2 ay içinde dağılır. İnce ödemlerin tamamen çözülmesi ve burnun nihai şeklini alması kalın derili hastalarda 1-1.5 yıl, ince derili hastalarda ise yaklaşık 6-12 ay sürer.",
    },
    {
      cat: "iyilesme",
      q: "Ameliyat sonrası gözlük kullanımı ve spor ne zaman mümkündür?",
      a: "Hafif yürüyüşlere 2. haftadan itibaren başlanabilir. Ağır sporlar ve yüzme için 1. ayın dolması beklenmelidir. Güneş gözlüğü kullanımı için ise kemik dokunun tam kaynaması adına 2-3 ay beklenmesi önerilir.",
    },
    {
      cat: "revizyon",
      q: "Revizyon (ikincil) rinoplasti nedir ve ne zaman yapılmalıdır?",
      a: "Daha önce başka bir merkezde ameliyat olmuş ancak estetik veya nefes problemi yaşayan hastalara uygulanan düzeltme cerrahisidir. Dokuların iyileşmesi ve esneklik kazanması için ilk ameliyatın üzerinden en az 1 yıl geçmelidir.",
    },
    {
      cat: "revizyon",
      q: "Revizyon ameliyatında kaburga kıkırdağı kullanılması şart mıdır?",
      a: "Eğer burun içinde yeterli kıkırdak rezervi kalmamışsa, burna yeniden form ve destek vermek amacıyla hastanın kendi kaburgasından veya kulak kıkırdağından mikro greftler alınarak reconstructive işlem gerçekleştirilir.",
    },
    {
      cat: "kombine",
      q: "Rinoplasti ile birlikte Otoplasti veya Bişektomi yapılabilir mi?",
      a: "Evet, tek anestezi altında hem burun hem de yüz simetrisini tamamlayan Otoplasti (Kepçe Kulak) veya Bişektomi (Yanak İnceltme) gibi kombine operasyonlar sıklıkla tercih edilmektedir.",
    },
    {
      cat: "kombine",
      q: "Deviasyon (kemik eğriliği) ve et büyümesi de estetikle aynı anda çözülür mü?",
      a: "Kesinlikle. Fonksiyonel rinoplasti yaklaşımımızla, nefes almanızı engelleyen konka büyümesi (burun eti) ve septum deviasyonu estetik operasyonla eş zamanlı olarak tedavi edilir.",
    },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((item) => item.cat === activeCategory);

  return (
    <div className="bg-[#FAF8F5] text-gray-800 min-h-screen font-sans antialiased overflow-x-hidden">
      {/* 1. HERO BÖLÜMÜ */}
      <header className="relative py-20 lg:py-28 bg-[#F4F0EA] border-b border-gray-200/80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#E3ECF5] rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FAF8F5] rounded-full blur-[100px] opacity-80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200 relative group cursor-pointer">
              {/* 1. VARSAYILAN RESİM */}
              <img
                src="/images/sefa-kesan.jpg"
                alt="Op. Dr. Sefa Keşan"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 absolute inset-0"
              />

              {/* 2. HOVER ANINDA GÖRÜNECEK İKİNCİ RESİM (Farklı Poz / Renkli) */}
              <img
                src="/images/sefa-kesan-ameliyat.jpg"
                alt="Op. Dr. Sefa Keşan"
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 absolute inset-0 z-10"
              />

              {/* Gradyan Karartma Katmanı */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none"></div>
            </div>

            {/* SOSYAL MEDYA KISAYOLLARI */}
            <div className="flex items-center justify-center gap-3 mt-6 w-full">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border border-gray-200 text-gray-700 hover:text-[#A68B6D] hover:border-[#A68B6D] rounded-full shadow-sm transition-all cursor-pointer"
                title="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-500 rounded-full shadow-sm transition-all cursor-pointer"
                title="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9 10 15" />
                </svg>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border border-gray-200 text-gray-700 hover:text-green-600 hover:border-green-500 rounded-full shadow-sm transition-all cursor-pointer"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>

              <a
                href="mailto:info@drsefakesan.com"
                className="p-3 bg-white border border-gray-200 text-gray-700 hover:text-[#A68B6D] hover:border-[#A68B6D] rounded-full shadow-sm transition-all cursor-pointer"
                title="E-Posta"
              >
                <Mail size={18} />
              </a>
            </div>
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
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-white px-3 py-1.5 rounded-md border border-gray-200/60 shadow-sm">
                <GraduationCap size={16} className="text-[#A68B6D]" />
                {t("biographyPage.education")}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium bg-white px-3 py-1.5 rounded-md border border-gray-200/60 shadow-sm">
                <ShieldCheck size={16} className="text-[#A68B6D]" />
                {t("biographyPage.certification")}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. ÖZGEÇMİŞ & AKADEMİK KARİYER */}
      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
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

            <div className="pt-6 space-y-4">
              <h3 className="font-serif text-lg font-normal text-gray-900 flex items-center gap-2">
                <BookOpen size={18} className="text-[#A68B6D]" />
                {t("biographyPage.membershipsTitle")}
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-500 font-light list-disc list-inside pl-1">
                {memberships?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[#A68B6D] text-xs tracking-widest uppercase font-semibold block border-b border-gray-200 pb-2 w-max">
                {t("biographyPage.timelineTitle")}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-950">
                {t("biographyPage.timeline")}
              </h2>
            </div>

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

            <div className="bg-[#F4F0EA] p-6 border border-gray-200/50 rounded-xl space-y-4 shadow-sm">
              <h3 className="font-serif text-sm uppercase tracking-wider font-semibold text-gray-900 flex items-center gap-2">
                <Award size={16} className="text-[#A68B6D]" />
                {t("biographyPage.achievementsTitle")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 border border-gray-100 rounded-lg shadow-2xs"
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
      {/* 4. KLİNİK TEKNOLOJİLERİ */}
      <ClinicTechnologies />
      {/* 6. GELİŞTİRİLMİŞ & KATEGORİLİ SIKÇA SORULAN SORULAR (SSS) */}
      <FaqSection />

      {/* 7. İLETİŞİM BANNERI */}
      <section className="py-20 border-t border-gray-100 text-center bg-[#FAF8F5]">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <Heart size={28} className="text-[#A68B6D] mx-auto animate-pulse" />
          <h3 className="font-serif text-3xl font-light text-gray-950">
            {t("biographyPage.appointment")}
          </h3>
          <p className="text-gray-500 font-light text-sm leading-relaxed">
            {t("biographyPage.appointmentText")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate("/#iletisim")}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#A68B6D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#93795C] transition-all rounded-sm shadow-md cursor-pointer"
            >
              {t("biographyPage.appointmentBtn")}
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-green-600 text-white text-xs uppercase tracking-widest font-semibold hover:bg-green-700 transition-all rounded-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>{t("biographyPage.whatsappBtn")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
