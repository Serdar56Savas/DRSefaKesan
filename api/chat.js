import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // 1. Frontend'den 'lang' bilgisini de alıyoruz
  const { message, lang } = req.body;
  const assistantId = process.env.ASSISTANT_ID;

  // Dilleri eşleştirme tablosu
  const langMap = {
    tr: "Türkçe",
    en: "English",
    fr: "Français",
    ar: "العربية",
    it: "Italiano",
  };

  const currentLang = langMap[lang] || "Türkçe";

  // 2. Thread başlat
  const thread = await openai.beta.threads.create();

  // 3. Mesajı gönder (Özel bir "sistem talimatı" gibi dili belirtiyoruz)
  // Kullanıcı mesajına dili hatırlatan bir not ekliyoruz
  const finalMessage = `[Dil: ${currentLang}] Lütfen sadece ${currentLang} dilinde yanıt ver. Mesaj: ${message}`;

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: finalMessage,
  });

  // 4. Çalıştır
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  });

  // 5. Cevabı bekle
  let status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while (status.status !== "completed") {
    await new Promise((r) => setTimeout(r, 500));
    status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  const msgs = await openai.beta.threads.messages.list(thread.id);

  // 6. Yanıtı döndür
  res.status(200).json({ reply: msgs.data[0].content[0].text.value });
}
