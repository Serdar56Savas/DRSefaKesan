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
    const threadId = thread.id;

    // 2. Mesaj ekle
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    // 3. Run başlat
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: "asst_Jh6dxhPo0ALkV9gDIQdawRrw",
    });

    // 4. Sabit bir döngü ile status kontrolü
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    let attempts = 0;

    while (runStatus.status !== "completed" && attempts < 15) {
      if (["failed", "cancelled", "expired"].includes(runStatus.status)) break;
      await new Promise((r) => setTimeout(r, 1000));
      // BURASI ÇOK ÖNEMLİ: Fonksiyonu her seferinde güncel değişkenlerle çağırıyoruz
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      attempts++;
    }

    // 5. Yanıtı al
    const msgs = await openai.beta.threads.messages.list(threadId);
    const reply = msgs.data[0].content[0].text.value;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("KRİTİK HATA:", error);
    return res.status(200).json({ reply: "WHATSAPP_REDIRECT" });
  }
}
