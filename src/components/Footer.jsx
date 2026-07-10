import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#F4F0EA] text-gray-700 pt-16 pb-8 border-t border-gray-200/60 relative">
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#E3ECF5]/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-300/40">
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-xl tracking-[0.2em] font-light text-gray-900 block uppercase">
                Op. Dr. Sefa Keşan
              </span>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#A68B6D] font-semibold block mt-1">
                {t("footer.subtitle")}
              </span>
            </div>

            <div className="border-l-2 border-[#A68B6D] pl-4 py-1 italic text-gray-600 font-serif text-sm leading-relaxed">
              "{t("footer.quote")}"
            </div>

            <p className="text-gray-500 text-xs font-light leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="text-[11px] uppercase tracking-widest text-gray-900 font-bold">
              {t("footer.navigationTitle")}
            </h3>

            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a
                  href="#hero"
                  className="hover:text-[#A68B6D] transition-colors text-gray-600"
                >
                  {t("footer.home")}
                </a>
              </li>

              <li>
                <a
                  href="#biyografi"
                  className="hover:text-[#A68B6D] transition-colors text-gray-600"
                >
                  {t("footer.story")}
                </a>
              </li>

              <li>
                <a
                  href="#uzmanlik"
                  className="hover:text-[#A68B6D] transition-colors text-gray-600"
                >
                  {t("footer.services")}
                </a>
              </li>

              <li>
                <a
                  href="#galeri"
                  className="hover:text-[#A68B6D] transition-colors text-gray-600"
                >
                  {t("footer.gallery")}
                </a>
              </li>

              <li>
                <a
                  href="#iletisim"
                  className="hover:text-[#A68B6D] transition-colors text-gray-600"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-5">
            <h3 className="text-[11px] uppercase tracking-widest text-gray-900 font-bold">
              {t("footer.socialTitle")}
            </h3>

            <p className="text-gray-500 text-xs font-light leading-relaxed">
              {t("footer.socialText")}
            </p>

            <div className="flex items-center gap-4 text-gray-500">
              <a
                href="https://www.instagram.com/op.dr.sefa_kesan/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 bg-[#FAF8F5] border border-gray-200 hover:border-[#8FA9C4]/40 hover:text-[#A68B6D] transition-all rounded-sm shadow-sm flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2.5 bg-[#FAF8F5] border border-gray-200 hover:border-[#8FA9C4]/40 hover:text-[#A68B6D] transition-all rounded-sm shadow-sm flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="p-2.5 bg-[#FAF8F5] border border-gray-200 hover:border-[#8FA9C4]/40 hover:text-[#A68B6D] transition-all rounded-sm shadow-sm flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>

            <p className="text-[9px] text-gray-400 font-light italic leading-normal">
              * {t("footer.legal")}
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400 tracking-wider font-light gap-4">
          <div>
            &copy; {new Date().getFullYear()} Op. Dr. Sefa Keşan.{" "}
            {t("footer.copyright")}
          </div>

          <div className="flex gap-4">
            <a href="" className="hover:text-gray-600 transition-colors">
              {t("footer.kvkk")}
            </a>

            <span>|</span>

            <a href="" className="hover:text-gray-600 transition-colors">
              {t("footer.cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
