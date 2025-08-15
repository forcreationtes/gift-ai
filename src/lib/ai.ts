import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function buildGiftIdeas(input: {
  age: number; gender: string; likes: string[]; budget?: string;
}) {
  const { age, gender, likes, budget } = input;

  // If no key, return safe mock so the app still works
  if (!process.env.OPENAI_API_KEY) {
    return [
      { title: "Cozy Mug Warmer", reason: "Perfect for coffee lovers at their desk.", keywords: ["coffee warmer", "USB mug", "desk gift"] },
      { title: "Hiking Daypack", reason: "Lightweight pack for weekend trails.", keywords: ["hiking backpack", "lightweight", "outdoor"] },
      { title: "Bluetooth Beanie", reason: "Warm + music for winter walks.", keywords: ["bluetooth beanie", "winter hat", "gifts"] },
      { title: "AeroPress Go", reason: "Travel coffee maker with great reviews.", keywords: ["aeropress", "coffee", "portable"] },
      { title: "Succulent Planter Set", reason: "Easy care, fits cozy aesthetic.", keywords: ["succulent planter", "ceramic", "home decor"] },
    ];
  }

  const prompt = `You are an expert gift concierge. Create 5 creative gift ideas based on:
Age: ${age}
Gender: ${gender}
Likes: ${likes.join(", ")}
Budget: ${budget ?? "any"}.

Return JSON:
{ "ideas": [ { "title": "...", "reason": "...", "keywords": ["k1","k2","k3"] } ] }`;

  const rsp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Return JSON only with an array named ideas." },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
  });

  const text = rsp.choices[0]?.message?.content ?? "{}";
  try {
    const parsed = JSON.parse(text);
    return parsed.ideas?.slice(0, 5) ?? [];
  } catch {
    return [
      { title: "Cozy Mug", reason: "Fallback idea.", keywords: ["mug", "ceramic", "tea"] },
    ];
  }
}
