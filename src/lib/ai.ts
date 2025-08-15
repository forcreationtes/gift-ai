// src/lib/ai.ts
import OpenAI from "openai";

export type BuildArgs = {
  age: number;            // route converts label -> number
  gender: string;
  likes: string[];
  budget: string;
};

export type Idea = {
  id: string;
  title: string;
  keywords: string[];
  [key: string]: unknown;
};

export async function buildGiftIdeas(
  { age, gender, likes, budget }: BuildArgs
): Promise<Idea[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  // No key? Return deterministic mock ideas so the app still works.
  if (!apiKey) {
    return mockIdeas({ age, gender, likes, budget });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const prompt = `
Return a JSON array of 6-8 gift ideas.
Each item: { "id": string, "title": string, "keywords": string[] }.
Use keywords that combine the user's likes with product-type words.

Context:
- age: ${age}
- gender/identity: ${gender || "unspecified"}
- likes: ${likes.join(", ") || "none"}
- budget: ${budget || "unspecified"}
`.trim();

    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: "You output compact JSON only. No prose." },
        { role: "user", content: prompt },
      ],
    });

    const text = resp.choices[0]?.message?.content?.trim() ?? "[]";
    const parsed = safeExtractJson(text);

    const rawArray: unknown[] = Array.isArray(parsed) ? parsed : [];
    const normalized: Idea[] = rawArray
      .map((raw, i) => normalizeIdea(raw, i, likes))
      .slice(0, 8);

    return normalized.length ? normalized : mockIdeas({ age, gender, likes, budget });
  } catch (err) {
    console.warn("OpenAI generation failed, using mocks:", err);
    return mockIdeas({ age, gender, likes, budget });
  }
}

/* ----------------- helpers ----------------- */

function normalizeIdea(raw: unknown, i: number, likes: string[]): Idea {
  const obj: Record<string, unknown> =
    typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

  const title = toStringOrDefault(obj["title"], defaultTitle(likes, i));
  const id = toStringOrDefault(obj["id"], `idea-${i + 1}`);
  const keywords = isStringArray(obj["keywords"])
    ? obj["keywords"]
    : buildKeywords(likes, title);

  return { id, title, keywords };
}

function safeExtractJson(text: string): unknown {
  const m = text.match(/\[[\s\S]*\]/);
  try {
    return m ? JSON.parse(m[0]) : [];
  } catch {
    return [];
  }
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === "string");
}

function toStringOrDefault(x: unknown, fallback: string): string {
  return typeof x === "string" && x.trim() ? x : fallback;
}

function defaultTitle(likes: string[], i: number) {
  const base = (likes[0] || "Gift").toString().trim();
  const suffixes = ["Set", "Bundle", "Kit", "Box", "Essentials", "Starter", "Deluxe", "Premium"];
  return `${capitalize(base)} ${suffixes[i % suffixes.length]}`;
}

function buildKeywords(likes: string[], title?: string) {
  const arr = [title, ...likes].filter(Boolean).map(String);
  return dedupe(arr.map((s) => s.toLowerCase()));
}

function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function mockIdeas({ likes }: BuildArgs): Idea[] {
  const seeds = likes.length ? likes : ["gift"];
  const kinds = ["Set", "Starter Kit", "Bundle", "Essentials", "Mini", "Deluxe", "Premium", "Box"];
  return Array.from({ length: 8 }).map((_, i) => {
    const topic = capitalize(seeds[i % seeds.length]);
    const title = `${topic} ${kinds[i % kinds.length]}`;
    return {
      id: `${topic.toLowerCase()}-${i + 1}`,
      title,
      keywords: buildKeywords(seeds, title),
    };
  });
}
