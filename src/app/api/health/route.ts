import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    amazonConfigured: Boolean(
      process.env.AMAZON_ACCESS_KEY_ID &&
      process.env.AMAZON_SECRET_ACCESS_KEY &&
      process.env.AMAZON_PARTNER_TAG
    ),
  });
}
