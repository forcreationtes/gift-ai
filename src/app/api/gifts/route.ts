// src/app/api/gifts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buildGiftIdeas } from "@/lib/ai";
import { searchProducts } from "@/lib/amazon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Client payload: supports current and earlier field names */
type RequestBody = {
  age?: string;         // e.g., "Adult (25–34)" from the UI
  gender?: string;
  likes?: string[];
  budget?: string;

  // older / alternate names used by the client
  ageGroup?: string;
  identity?: string;
  interests?: string[];
};

/** Minimal idea shape this route relies on */
type Idea = {
  id?: string;
  title?: string;
  keywords?: string[];
  [key: string]: unknown;
};

// Health check
export async function GET() {
  return NextResponse.json({ ok: true, message: "gifts api live" });
}

export async function POST(req: NextRequest) {
  try {
    const raw = (await req.json()) as Partial<RequestBody>;

    // Accept both naming styles
    const ageLabel = (raw.age ?? raw.ageGroup ?? "").toString();
    const gender = (raw.gender ?? raw.identity ?? "").toString();
    const likes = (
      Array.isArray(raw.likes)
        ? raw.likes
        : Array.isArray(raw.interests)
        ? raw.interests
        : []
    )
      .map(String)
      .filter(Boolean);
    const budget = (raw.budget ?? "").toString();

    // Validation
    if (!ageLabel || likes.length < 1) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Convert the UI label to a numeric age for the model
    const ageNumber = toAgeNumber(ageLabel);

    // Build ideas (buildGiftIdeas expects age:number)
    const ideas = (await buildGiftIdeas({
      age: ageNumber,
      gender,
      likes,
      budget,
    })) as Idea[];

    // Enrich ideas with products
    const enriched = await Promise.all(
      ideas.map(async (idea: Idea) => {
        const kw =
          (Array.isArray(idea.keywords) && idea.keywords.join(" ")) ||
          [typeof idea.title === "string" ? idea.title : "", ...likes]
            .filter(Boolean)
            .join(" ");

        try {
          const product = await searchProducts({ query: kw, budget });
          return { ...idea, product };
        } catch (err) {
          console.error("searchProducts failed:", { kw, err });
          return { ...idea, product: null };
        }
      })
    );

    return NextResponse.json({ ideas: enriched }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/** Converts labels like "Adult (25–34)" / "Senior (65+)" to a representative number */
function toAgeNumber(label: string): number {
  // First number in the string (works for 13–17, 65+, etc.)
  const m = label.match(/\d+/);
  if (m) return clamp(parseInt(m[0], 10), 5, 100);

  const s = label.toLowerCase();
  if (s.includes("teen")) return 16;
  if (s.includes("young")) return 21;
  if (s.includes("senior")) return 70;
  if (s.includes("adult")) return 30;
  return 30; // sensible default
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
