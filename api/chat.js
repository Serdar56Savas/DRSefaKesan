import OpenAI from "openai";

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
    if (whatsappKeywords.some((k) => message.toLowerCase().includes(k))) {
      return res.status(200).json({ reply: "WHATSAPP_REDIRECT" });
    }

    // 2. OpenAI Thread Oluşturma
    const thread = await openai.beta.threads.create();

    // Güvenlik: thread.id boş mu diye kontrol et
    if (!thread || !thread.id) {
      console.error("Thread oluşturulamadı, dönen nesne:", thread);
      throw new Error("Thread oluşturulamadı.");
    }
    const threadId = thread.id;
    console.log("Thread başarıyla oluşturuldu, ID:", threadId);

    // 3. Kullanıcı mesajını ekle
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: `[Dil: ${currentLang}] Mesaj: ${message}`,
    });

    // 4. Asistanı çalıştır
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.ASSISTANT_ID,
    });

    // Güvenlik: run.id boş mu diye kontrol et
    if (!run || !run.id) {
      console.error("Run oluşturulamadı, dönen nesne:", run);
      throw new Error("Run oluşturulamadı.");
    }
    const runId = run.id;
    console.log("Run başarıyla başlatıldı, ID:", runId);

    // 5. Cevabın oluşmasını bekle (Polling)
    let status = await openai.beta.threads.runs.retrieve(threadId, runId);
    let attempts = 0;

    while (status.status !== "completed" && attempts < 15) {
      if (["failed", "cancelled", "expired"].includes(status.status)) {
        throw new Error(`Asistan işlemi başarısız oldu: ${status.status}`);
      }
      await new Promise((r) => setTimeout(r, 1000));
      status = await openai.beta.threads.runs.retrieve(threadId, runId);
      attempts++;
    }

    if (status.status !== "completed") {
      throw new Error("Asistan yanıt süresi doldu.");
    }

    // 6. Asistanın mesajını al
    const msgs = await openai.beta.threads.messages.list(threadId);
    const reply = msgs.data[0].content[0].text.value;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("AI İşlem Hatası:", error);
    // Hata durumunda WhatsApp butonuna yönlendir
    return res.status(200).json({ reply: "WHATSAPP_REDIRECT" });
  }
}
