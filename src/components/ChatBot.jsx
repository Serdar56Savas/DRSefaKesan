import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Send, MessageCircle, X, User } from "lucide-react";

export default function ChatBot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: "",
  });
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const quickActions = [
    { label: t("chatbot.q1_label"), value: t("chatbot.q1_val") },
    { label: t("chatbot.q2_label"), value: t("chatbot.q2_val") },
    { label: t("chatbot.q3_label"), value: t("chatbot.q3_val") },
  ];

  useEffect(() => {
    setMessages([{ role: "assistant", content: t("chatbot.welcome") }]);
  }, [i18n.language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang: i18n.language }),
      });
      const data = await response.json();
      const isRedirect = data.reply === "WHATSAPP_REDIRECT";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isRedirect ? t("chatbot.whatsapp_message") : data.reply,
          isWhatsApp: isRedirect,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chatbot.whatsapp_message"),
          isWhatsApp: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (error) setError("");
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.name.trim()) return setError(t("chatbot.error_name"));
    if (!formData.phone.trim()) return setError(t("chatbot.error_phone"));
    if (!formData.treatment) return setError(t("chatbot.error_treatment"));

    setError("");
    const klinikTelefon = "905XXXXXXXXXX";
    const mesaj = t("chatbot.wp_message", {
      name: formData.name,
      phone: formData.phone,
      treatment: formData.treatment,
    });
    window.open(
      `https://api.whatsapp.com/send?phone=${klinikTelefon}&text=${encodeURIComponent(mesaj)}`,
      "_blank",
    );
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-[100] font-sans"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 p-4 bg-[#1A1A1A] rounded-full shadow-[0_0_25px_rgba(166,139,109,0.4)] border border-[#A68B6D]/50 hover:scale-110 transition-all duration-500 z-[100] group"
        >
          {/* Parlama Efekti İçin Katman */}
          <div className="absolute inset-0 rounded-full animate-ping bg-[#A68B6D]/20"></div>

          <div className="relative flex items-center justify-center">
            <MessageCircle
              size={30}
              className="text-[#A68B6D] group-hover:rotate-12 transition-transform duration-300"
            />
          </div>
        </button>
      ) : (
        <div className="w-[380px] h-[600px] bg-white border border-[#A68B6D]/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-[#1A1A1A] p-6 text-white flex justify-between items-center border-b border-[#A68B6D]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#A68B6D] rounded-full flex items-center justify-center font-bold text-white uppercase">
                SK
              </div>
              <div>
                <h3 className="font-serif text-sm tracking-[0.2em] uppercase">
                  Medikal Asistan
                </h3>
                <p className="text-[10px] text-[#A68B6D] font-medium tracking-widest">
                  DR. SEFA KEŞAN
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:rotate-90 transition-transform opacity-60 hover:opacity-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#FAFAFA]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] text-sm px-5 py-3.5 rounded-2xl ${m.role === "user" ? "bg-[#1A1A1A] text-white rounded-tr-none shadow-lg" : "bg-white text-gray-900 border border-gray-100 rounded-tl-none shadow-sm"}`}
                >
                  {m.content}
                  {m.isWhatsApp && (
                    <div className="mt-5 p-5 bg-white rounded-2xl border border-[#A68B6D]/20 shadow-[0_10px_25px_rgba(166,139,109,0.1)] space-y-3">
                      <p className="text-[10px] font-bold text-center uppercase tracking-widest text-[#A68B6D]">
                        {t("chatbot.form_title")}
                      </p>
                      <input
                        placeholder={t("chatbot.name_placeholder")}
                        className="w-full text-xs p-3.5 bg-[#FAFAFA] border border-gray-200 rounded-xl outline-none focus:border-[#A68B6D] transition-all"
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                      <input
                        placeholder={t("chatbot.phone_placeholder")}
                        className="w-full text-xs p-3.5 bg-[#FAFAFA] border border-gray-200 rounded-xl outline-none focus:border-[#A68B6D] transition-all"
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                      <select
                        className="w-full text-xs p-3.5 bg-[#FAFAFA] border border-gray-200 rounded-xl outline-none focus:border-[#A68B6D] transition-all"
                        onChange={(e) =>
                          handleInputChange("treatment", e.target.value)
                        }
                      >
                        <option value="">
                          {t("chatbot.treatment_placeholder")}
                        </option>
                        <option value="Rinoplasti">Rinoplasti</option>
                        <option value="Otoplasti">Otoplasti</option>
                        <option value="Blefaroplasti">Blefaroplasti</option>
                        <option value="Diğer">Diğer / Farklı</option>
                      </select>
                      {error && (
                        <p className="text-[11px] text-[#A68B6D] font-bold text-center animate-pulse">
                          ⚠️ {error}
                        </p>
                      )}
                      <button
                        onClick={handleWhatsAppSubmit}
                        className="relative overflow-hidden w-full bg-[#1A1A1A] text-[#A68B6D] py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-white transition-all group mt-2"
                      >
                        <span className="absolute inset-0 bg-[#A68B6D] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                        <span className="relative z-10">
                          {t("chatbot.btn_send")}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-5 py-4 flex gap-2 overflow-x-auto border-t border-gray-100 bg-white">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => sendMessage(action.value)}
                className="whitespace-nowrap px-4 py-2 border border-[#A68B6D]/30 text-[#A68B6D] text-[10px] font-bold rounded-lg hover:bg-[#A68B6D] hover:text-white transition-all duration-300"
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="w-full text-sm border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#A68B6D] transition-all"
              placeholder={t("chatbot.placeholder")}
            />
            <button
              onClick={() => sendMessage()}
              className="bg-[#1A1A1A] p-3 rounded-xl text-[#A68B6D] hover:text-white hover:bg-black transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
