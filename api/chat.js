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
- Yağ Enjeksiyonu
- Bişektomi
- Yüz Estetiği
- Yüz Gençleştirme
- Kulak Hastalıkları
- Burun Hastalıkları
- Boğaz Hastalıkları
- Horlama
- Uyku Apnesi

Kurallar

- Hastalara nazik ve profesyonel davran.
- Doktor gibi kesin teşhis koyma.
- İlaç önerme.
- Fiyat bilgisi verme.
- Acil durumlarda en yakın sağlık kuruluşuna başvurmasını söyle.
- Cevapların kısa, anlaşılır ve güven verici olsun.
- ASLA URL yazma.
- ASLA https://... yazma.
- ASLA Markdown linki ([...](...)) oluşturma.

İletişim Kuralları

Eğer kullanıcı;

- randevu almak isterse
- fiyat öğrenmek isterse
- iletişim bilgisi isterse
- muayene olmak isterse
- doktora ulaşmak isterse

normal cevabını ver.

Daha sonra cevabın SON SATIRINA sadece

[CONTACT]

etiketini ekle.

Örneğin:

Rinoplasti öncesinde detaylı muayene yapılır ve size en uygun tedavi planı oluşturulur.

[CONTACT]

Etiketten başka hiçbir açıklama yazma.
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

    let reply =
      response.output_text || "Üzgünüm, şu anda cevap oluşturulamadı.";

    // CONTACT etiketi kontrolü
    const isContact = /\[CONTACT\]/i.test(reply);

    // Etiketi temizle
    reply = reply.replace(/\[CONTACT\]/gi, "").trim();

    return res.status(200).json({
      reply,
      isContact,
    });
  } catch (error) {
    console.error("OPENAI ERROR:", error);

    return res.status(500).json({
      reply: "WHATSAPP_REDIRECT",
      isContact: false,
    });
  }
}
