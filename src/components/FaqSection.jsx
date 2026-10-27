import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FaqSection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFaq, setActiveFaq] = useState(null);

  // i18next JSON dosyasından dinamik soru-cevap listesini çekiyoruz
  const faqsData = t("faq.items", { returnObjects: true });
  const faqs = Array.isArray(faqsData) ? faqsData : [];

  // Seçili kategoriye göre filtreleme yapıyoruz
  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((item) => item.cat === activeCategory);

  return (
    <section className="py-24 bg-[#F4F0EA] border-t border-gray-200/80">
      <div className="max-w-4xl mx-auto px-6">
        {/* Üst Başlık & Açıklama */}
        <div className="text-center mb-10">
          <span className="text-[#A68B6D] text-xs tracking-[0.2em] uppercase font-bold block mb-2 flex items-center justify-center gap-2">
            <HelpCircle size={16} />
            {t("faq.sectionBadge")}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-gray-950 mb-3">
            {t("faq.sectionTitle")}
          </h2>
          <p className="text-gray-500 text-xs md:text-sm font-light max-w-lg mx-auto">
            {t("faq.sectionSubtitle")}
          </p>
        </div>

        {/* SSS KATEGORİ FİLTRE BUTONLARI */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveFaq(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-[#A68B6D] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t("faq.categories.all")} ({faqs.length})
          </button>

          <button
            onClick={() => {
              setActiveCategory("rinoplasti");
              setActiveFaq(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === "rinoplasti"
                ? "bg-[#A68B6D] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t("faq.categories.rinoplasti")}
          </button>

          <button
            onClick={() => {
              setActiveCategory("iyilesme");
              setActiveFaq(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === "iyilesme"
                ? "bg-[#A68B6D] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t("faq.categories.iyilesme")}
          </button>

          <button
            onClick={() => {
              setActiveCategory("revizyon");
              setActiveFaq(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === "revizyon"
                ? "bg-[#A68B6D] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t("faq.categories.revizyon")}
          </button>

          <button
            onClick={() => {
              setActiveCategory("kombine");
              setActiveFaq(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === "kombine"
                ? "bg-[#A68B6D] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t("faq.categories.kombine")}
          </button>
        </div>

        {/* SSS ACCORDION LİSTESİ */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-2xs transition-all duration-300 hover:border-[#A68B6D]/50"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left text-sm md:text-base font-medium text-gray-900 hover:text-[#A68B6D] transition-colors cursor-pointer gap-4"
              >
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#A68B6D]"></span>
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 text-[#A68B6D] shrink-0 ${
                    activeFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeFaq === index && (
                <div className="px-6 pb-6 text-xs md:text-sm font-light text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-[#FAF8F5]/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
