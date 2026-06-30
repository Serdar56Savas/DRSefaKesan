import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const languages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "ar", label: "العربية" }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="relative">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest
        border border-gray-200 bg-white/70 backdrop-blur-md rounded-md
        hover:bg-white hover:shadow-md transition-all duration-300"
      >
        <Globe size={14} className="text-[#A68B6D]" />
        <span className="font-medium">{current.label}</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white/90 backdrop-blur-xl
        border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">

          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm
              hover:bg-[#F4F0EA] transition-all duration-200 ${
                i18n.language === lang.code
                  ? "bg-[#F4F0EA] font-semibold text-[#A68B6D]"
                  : "text-gray-700"
              }`}
            >
              <span>{lang.label}</span>

              {i18n.language === lang.code && (
                <span className="w-2 h-2 rounded-full bg-[#A68B6D]" />
              )}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}