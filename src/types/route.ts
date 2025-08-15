import { NextResponse } from "next/server";
import { createHash } from "crypto";

// Use Node runtime for widest compatibility on Next 15
export const runtime = "nodejs";
// Make sure this route isn't statically bundled
export const dynamic = "force-dynamic";

// ---------- Types (local to avoid path alias issues) ----------
type GiftIdea = {
  id: string;
  title: string;
  price: string;
  url: string;
  image: string;
  badges?: string[];
  reason?: string;
};

type GiftQuery = {
  occasion: string;
  interests: string[];
  ageGroup: string;
  identity: string;
  budget: string;
};

// ---------- Cache ----------
const TTL_MS = 30 * 60 * 1000; // 30 min
const cache = new Map<string, { ts: number; data: GiftIdea[] }>();

// Simple health check (visit /api/gifts in your browser)
export async function GET() {
  return NextResponse.json({ ok: true, message: "gifts api up" });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<GiftQuery>;

  const payload: GiftQuery = {
    occasion: (body.occasion || "").trim(),
    interests: Array.isArray(body.interests) ? body.interests.slice(0, 5) : [],
    ageGroup: body.ageGroup || "",
    identity: body.identity || "",
    budget: body.budget || "",
  };

  const key = hashPayload(payload);
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && now - cached.ts < TTL_MS) {
    return NextResponse.json({ fromCache: true, ideas: cached.data });
  }

  const ideas = generateMockIdeas(payload);
  cache.set(key, { ts: now, data: ideas });

  return NextResponse.json({ fromCache: false, ideas });
}

// ---------- Helpers ----------
function hashPayload(obj: unknown) {
  return createHash("sha256").update(JSON.stringify(obj)).digest("hex");
}

function generateMockIdeas(q: GiftQuery): GiftIdea[] {
  const [min, max] = parseBudget(q.budget);
  const seed = (q.interests[0] || "seed").length + q.occasion.length;
  const rand = mulberry32(seed || 1);

  const bases = ["Bundle", "Set", "Starter Kit", "Pro Kit", "Essentials", "Mini", "Deluxe", "Premium"];
  const vendors = ["Amazon", "Etsy", "Uncommon Goods", "BestBuy", "Target"];

  const themes = (q.interests.length ? q.interests : [q.occasion]).map(titleCase).slice(0, 3);

  return Array.from({ length: 8 }).map((_, i) => {
    const theme = themes[i % themes.length] || "Gift";
    const base = bases[Math.floor(rand() * bases.length)];
    const vendor = vendors[Math.floor(rand() * vendors.length)];

    const priceNum = clamp(
      Math.round((min + rand() * Math.max(1, max - min)) / 5) * 5,
      Math.max(5, min),
      Math.max(min + 5, max)
    );

    const id = `${theme.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`;
    return {
      id,
      title: `${theme} ${base}`,
      price: `$${priceNum.toFixed(0)}`,
      url: `https://example.com/gift/${id}?src=${encodeURIComponent(vendor)}`,
      image: `https://picsum.photos/seed/${encodeURIComponent(id)}/600/400`,
      badges: dedupe([vendor, theme.length > 10 ? "Thoughtful" : "Trending", priceNum <= 30 ? "Budget" : undefined]),
      reason: `Matches ${q.occasion || "the occasion"} and interest in ${theme.toLowerCase()}.`,
    };
  });
}

function parseBudget(b: string): [number, number] {
  if (!b) return [20, 60];
  if (/\+$/.test(b)) {
    const n = parseInt(b.replace(/[^0-9]/g, ""), 10) || 200;
    return [n, n + 200];
  }
  const parts = b.split("–").map((s) => parseInt(s.replace(/[^0-9]/g, ""), 10));
  const a = parts[0], c = parts[1];
  if (!isFinite(a as number) || !isFinite(c as number)) return [20, 60];
  return [Math.min(a!, c!), Math.max(a!, c!)];
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function dedupe<T>(arr: (T | undefined)[]) {
  return Array.from(new Set(arr.filter(Boolean) as T[]));
}
