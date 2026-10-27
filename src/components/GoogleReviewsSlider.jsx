import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GoogleReviewsSlider() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // i18next JSON dosyasından dinamik olarak çekilen yorum dizisi
  const reviewsData = t("googleReviews.list", { returnObjects: true });
  const reviews = Array.isArray(reviewsData) ? reviewsData : [];

  // 10 Saniyede bir otomatik dönme mekanizması
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1,
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        {/* Üst Başlık & Google Puanlama Rozeti */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gray-100/80 rounded-full mb-3 shadow-2xs">
              {/* Google G Logosu */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs font-semibold text-gray-700">
                {t("googleReviews.badge")}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-gray-950">
              {t("googleReviews.title")}
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="font-serif text-4xl font-light text-gray-900">
              5.0
            </span>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="#F59E0B"
                    className="text-amber-400"
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                {t("googleReviews.reviewCount")}
              </span>
            </div>
          </div>
        </div>

        {/* Google Yorum Slider Kartı */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-[#FAF8F5] p-8 md:p-10 rounded-2xl border border-gray-200/70 shadow-sm relative transition-all duration-700 ease-in-out min-h-[260px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full ${currentReview.avatarBg} text-white font-semibold flex items-center justify-center text-sm shadow-sm`}
                  >
                    {currentReview.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {currentReview.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">
                        {currentReview.date}
                      </span>
                      <span className="text-[10px] bg-[#A68B6D]/10 text-[#A68B6D] font-semibold px-2.5 py-0.5 rounded-full">
                        {currentReview.treatment}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="#F59E0B"
                        className="text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-1">
                    ✓ {t("googleReviews.verifiedTag")}
                  </span>
                </div>
              </div>

              {/* Yorum Metni */}
              <p className="text-gray-700 text-sm md:text-base font-light italic leading-relaxed pl-3 border-l-2 border-[#A68B6D]">
                "{currentReview.comment}"
              </p>
            </div>

            {/* Alt Zaman Göstergesi ve Kontrol Noktaları */}
            <div className="mt-8 pt-4 border-t border-gray-200/50 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
                0{currentIndex + 1} / 0{reviews.length}
              </span>

              <div className="flex gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      idx === currentIndex
                        ? "w-8 bg-[#A68B6D]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    title={`Review ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
