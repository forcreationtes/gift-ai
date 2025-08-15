// src/lib/amazon.ts
export type Product = {
  title: string;
  url: string;
  price?: string;
  image?: string;
  asin?: string;
};

type SearchOpts = { query: string; budget?: string };

export async function searchProducts({ query }: SearchOpts): Promise<Product | null> {
  // If PA-API keys are not present, return a plain Amazon search URL (no affiliate credit)
  const hasPAAPI =
    !!process.env.AWS_ACCESS_KEY_ID &&
    !!process.env.AWS_SECRET_ACCESS_KEY &&
    !!process.env.AMAZON_HOST &&
    !!process.env.AMAZON_REGION &&
    !!process.env.AMAZON_PARTNER_TAG;

  if (!hasPAAPI) {
    return {
      title: `Search Amazon for “${query}”`,
      url: `https://www.amazon.com/s?k=${encodeURIComponent(query)}`,
    };
  }

  // TODO: When you get keys, implement PA-API lookup here and return a real product.
  return null;
}
