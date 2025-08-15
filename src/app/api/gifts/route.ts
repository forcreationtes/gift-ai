// src/app/api/gifts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buildGiftIdeas } from "@/lib/ai";
import { searchProducts } from "@/lib/amazon";

// Use Node runtime (better for external SDKs/signing)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Request body we expect from the client */
type RequestBody = {
  age: string;
  gender: string;   // if you renamed to "identity" on the client, update here too
  likes: string[];
  budget: string;
};

/** Minimal shape of what buildGiftIdeas returns that we rely on here */
type Idea = {
  keywords: string[];       // required for building an Amazon query
  // any other fields your AI returns (id/title/etc.) are preserved by the spread
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<RequestBody>;
    const age = body.age ?? "";
    const gender = body.gender ?? "";
    const likes = Array.isArray(body.likes) ? body.likes : [];
    const budget = body.budget ?? "";

    // basic validation (you can relax the "3 likes" rule if you want)
    if (!age || likes.length < 3) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // If buildGiftIdeas is untyped, cast to our minimal Idea shape
    const ideas = (await buildGiftIdeas({ age, gender, likes, budget })) as Idea[];

    // Guard against missing keywords arrays
    const enriched = await Promise.all(
      ideas.map(async (idea: Idea) => {
        const kw = Array.isArray(idea.keywords) ? idea.keywords.join(" ") : "";
        const product = await searchProducts({ query: kw, budget });
        return { ...idea, product };
      })
    );

    return NextResponse.json({ ideas: enriched }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
