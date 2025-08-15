// src/app/api/gifts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buildGiftIdeas } from "@/lib/ai";
import { searchProducts } from "@/lib/amazon";

// Use Node runtime (good for external SDKs/signing)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Client payload: supports current and earlier field names */
type RequestBody = {
  age?: string;
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

// Optional health check: GET /api/gifts
export async function GET() {
  return NextResponse.json({ ok: true, message: "gifts api live" });
}

export async function POST(req: NextRequest) {
  try {
    const raw = (await req.json()) as Partial<RequestBody>;

    // Accept both naming styles
    const age = (raw.age ?? raw.ageGroup ?? "").toString();
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

    // Validation: require at least 1 like (keeps UX smooth)
    if (!age || likes.length < 1) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Build ideas with your AI helper
    const ideas = (await buildGiftIdeas({ age, gender, likes, budget })) as Idea[];

    // Enrich ideas with a product search (Amazon or your own)
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
          // keep the idea even if enrichment fails
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
