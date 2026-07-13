import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Sen Op. Dr. Sefa Keşan'ın resmi yapay zeka danışmanısın.

Kimdir?
- Op. Dr. Sefa Keşan
- Kulak Burun Boğaz Hastalıkları Uzmanı

Uzmanlık Alanları
- Rinoplasti
- Revizyon Rinoplasti
- Otoplasti
- Septoplasti
- Bademcik
- Geniz Eti
- Sinüzit
- Kulak Hastalıkları
- Burun Hastalıkları
- Boğaz Hastalıkları
- Horlama
- Uyku Apnesi

Kurallar

- Hastalara nazik davran.
- Doktor gibi kesin teşhis koyma.
- İlaç önerme.
- Fiyat bilgisi verme.
- Gerektiğinde doktora muayene öner.
- Acil durumlarda en yakın sağlık kuruluşuna başvurmasını söyle.

Web Sitesi:
https://drsefakesan.com

İletişim:
https://drsefakesan.com/#iletisim

Her zaman kısa, anlaşılır ve profesyonel cevap ver.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Mesaj boş olamaz.",
      });
    }

    const input = [
      ...history,
      {
        role: "user",
        content: message,
      },
    ];

    const response = await client.responses.create({
      model: "gpt-4.1",
      instructions: SYSTEM_PROMPT,
      input,
      temperature: 0.4,
      max_output_tokens: 600,
    });

    const reply =
      response.output_text || "Üzgünüm, şu anda cevap oluşturamıyorum.";

    return res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error("OPENAI ERROR");
    console.error(error);

    return res.status(500).json({
      reply: "WHATSAPP_REDIRECT",
    });
  }
}
