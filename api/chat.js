import OpenAI from "openai";

// OpenAI istemcisini yapılandırıyoruz
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const langMap = {
  tr: "Türkçe",
  en: "English",
  fr: "Français",
  ar: "العربية",
  it: "Italiano",
};

export default async function handler(req, res) {
  // Sadece POST isteklerine izin ver
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, lang } = req.body;
  const currentLang = langMap[lang] || "Türkçe";

  try {
    // 1. WhatsApp Yönlendirme Kontrolü
    const whatsappKeywords = [
      "randevu",
      "appointment",
      "rezervasyon",
      "muayene",
      "contact",
      "iletişim",
    ];
    const lowerMsg = message.toLowerCase();

    if (whatsappKeywords.some((k) => lowerMsg.includes(k))) {
      return res.status(200).json({ reply: "WHATSAPP_REDIRECT" });
    }

    // 2. OpenAI Thread Oluşturma
    const thread = await openai.beta.threads.create();

    // 3. Kullanıcı mesajını ekle
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `[Dil: ${currentLang}] Mesaj: ${message}`,
    });

    // 4. Asistanı çalıştır
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.ASSISTANT_ID,
    });

    // HATA ÖNLEME: Run oluşturulabildi mi kontrolü
    if (!run || !run.id) {
      throw new Error("Asistan başlatılamadı, geçerli bir Run ID alınamadı.");
    }

    // 5. Cevabın oluşmasını bekle (Polling)
    let status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    let attempts = 0;

    while (status.status !== "completed" && attempts < 15) {
      if (
        status.status === "failed" ||
        status.status === "cancelled" ||
        status.status === "expired"
      ) {
        throw new Error(`Asistan işlemi başarısız oldu: ${status.status}`);
      }

      await new Promise((r) => setTimeout(r, 1000));
      status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      attempts++;
    }

    if (status.status !== "completed") {
      throw new Error("Asistan yanıt süresi doldu.");
    }

    // 6. Asistanın mesajını al
    const msgs = await openai.beta.threads.messages.list(thread.id);
    const reply = msgs.data[0].content[0].text.value;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("AI İşlem Hatası:", error);
    // Hata durumunda kullanıcıyı WhatsApp'a yönlendir
    return res.status(200).json({ reply: "WHATSAPP_REDIRECT" });
  }
}
