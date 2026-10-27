import React from "react";
import { Sliders, Zap, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ClinicTechnologies() {
  const { t } = useTranslation();

  // İkonları ID'lerine göre eşleştiriyoruz
  const iconMap = {
    sliders: <Sliders size={22} />,
    zap: <Zap size={22} />,
    shield: <ShieldCheck size={22} />,
  };

  // i18next JSON dosyasından kartları dinamik çekiyoruz
  const cardsData = t("clinicTech.cards", { returnObjects: true });
  const cards = Array.isArray(cardsData) ? cardsData : [];

  return (
    <section className="py-20 bg-[#F4F0EA] border-y border-gray-200/80">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#A68B6D] text-xs tracking-[0.2em] uppercase font-bold block mb-2">
            {t("clinicTech.sectionBadge")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-950">
            {t("clinicTech.sectionTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm space-y-3"
            >
              <div className="p-3 bg-[#FAF8F5] text-[#A68B6D] rounded-lg w-max">
                {iconMap[item.icon] || <ShieldCheck size={22} />}
              </div>
              <h3 className="font-serif text-lg font-normal text-gray-900">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
