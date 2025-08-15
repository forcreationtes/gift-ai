import { NextRequest, NextResponse } from "next/server";
import { buildGiftIdeas } from "@/lib/ai";
import { searchProducts } from "@/lib/amazon";

export async function POST(req: NextRequest) {
  try {
    const { age, gender, likes, budget } = await req.json();
    if (!age || !likes || likes.length < 3) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const ideas = await buildGiftIdeas({ age, gender, likes, budget });

    const enriched = await Promise.all(
      ideas.map(async (idea) => {
        const kw = idea.keywords.join(" ");
        const product = await searchProducts({ query: kw, budget });
        return { ...idea, product };
      })
    );

    return NextResponse.json({ ideas: enriched });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
