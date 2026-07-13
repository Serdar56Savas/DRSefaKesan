import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { message } = req.body;

  try {
    // 1. Thread oluştur
    const thread = await openai.beta.threads.create();

    // Güvenlik: ID boşsa hata fırlat
    if (!thread?.id) {
      throw new Error("Thread oluşturulamadı.");
    }
    const tId = thread.id;

    // 2. Mesaj ekle
    await openai.beta.threads.messages.create(tId, {
      role: "user",
      content: message,
    });

    // 3. Run başlat (Assistant ID doğrudan kod içinde)
    const run = await openai.beta.threads.runs.create(tId, {
      assistant_id: "asst_Jh6dxhPo0ALkV9gDIQdawRrw",
    });

    // Güvenlik: Run ID boşsa hata fırlat
    if (!run?.id) {
      throw new Error("Run oluşturulamadı.");
    }
    const rId = run.id;

    // 4. Polling (Status kontrolü) - DÜZELTİLMİŞ KISIM
    let status = await openai.beta.threads.runs.retrieve(tId, rId);
    let attempts = 0;

    while (status.status !== "completed" && attempts < 15) {
      if (["failed", "cancelled", "expired"].includes(status.status)) {
        throw new Error("Asistan işlemi tamamlanamadı.");
      }
      await new Promise((r) => setTimeout(r, 1000));

      // HATA GİDERİCİ: Retrieve metodunu nesne olarak çağıralım
      status = await openai.beta.threads.runs.retrieve(tId, rId);
      attempts++;
    }

    // 5. Yanıtı al
    const msgs = await openai.beta.threads.messages.list(tId);
    const reply = msgs.data[0].content[0].text.value;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("KRİTİK HATA:", error);
    // Hata durumunda frontend'i WhatsApp'a yönlendir
    return res.status(200).json({ reply: "WHATSAPP_REDIRECT" });
  }
}
