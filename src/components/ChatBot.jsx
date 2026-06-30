import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Send, MessageCircle, X, Sparkles, User, Calendar } from "lucide-react";

export default function ChatBot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Dil değiştiğinde mesajları güncelle
  useEffect(() => {
    setMessages([{ role: "assistant", content: t("chatbot.welcome") }]);
  }, [i18n.language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          lang: i18n.language, // Backend'e dil bilgisini gönderiyoruz
        }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("İletişim hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: t("chatbot.q1_label"), value: t("chatbot.q1_val") },
    { label: t("chatbot.q2_label"), value: t("chatbot.q2_val") },
    { label: t("chatbot.q3_label"), value: t("chatbot.q3_val") },
  ];

  return (
    // Arapça için sağdan sola (rtl) desteği eklendi
    <div
      className="fixed bottom-8 right-8 z-[100] font-sans"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-5 bg-[#A68B6D] text-white rounded-full shadow-[0_10px_30px_rgba(166,139,109,0.4)] hover:scale-110 transition-all duration-300 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-[#A68B6D] opacity-20"></div>
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-[380px] h-[600px] bg-white border border-[#A68B6D]/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-[#1A1A1A] p-5 text-white flex justify-between items-center border-b border-[#A68B6D]/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#A68B6D] rounded-full flex items-center justify-center border border-white/20">
                  <User size={20} className="text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1A1A1A] animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-serif text-sm tracking-widest font-medium uppercase">
                  Concierge
                </h3>
                <p className="text-[10px] text-[#A68B6D] font-medium tracking-tighter">
                  DR. SEFA KEŞAN
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:rotate-90 transition-transform p-1 opacity-60 hover:opacity-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FAFAFA]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] text-sm px-4 py-3 leading-relaxed font-medium ${
                    m.role === "user"
                      ? "bg-[#1A1A1A] text-white rounded-2xl rounded-tr-none shadow-md"
                      : "bg-white text-gray-900 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-200 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#A68B6D] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#A68B6D] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#A68B6D] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-5 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-gray-100 bg-white">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => setInput(action.value)}
                className="whitespace-nowrap px-3 py-1.5 border border-[#A68B6D]/30 text-[#A68B6D] text-[11px] font-bold rounded-full hover:bg-[#A68B6D] hover:text-white transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-white flex items-center gap-3 border-t border-gray-100">
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#A68B6D] outline-none transition-all placeholder:text-gray-400"
                placeholder={t("chatbot.placeholder")}
              />
              <Sparkles
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              />
            </div>
            <button
              onClick={sendMessage}
              className="bg-[#1A1A1A] p-3 rounded-xl text-white hover:bg-black transition-all disabled:opacity-50"
              disabled={!input.trim() || loading}
            >
              <Send size={18} />
            </button>
          </div>

          <div className="bg-gray-50 py-2 text-center text-[9px] text-gray-400 font-bold tracking-widest">
            <Calendar size={10} className="inline mr-1" />{" "}
            {t("chatbot.online_status")}
          </div>
        </div>
      )}
    </div>
  );
}
