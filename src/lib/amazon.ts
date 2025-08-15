const USE_MOCK = true; // flip to false when you add real Amazon PA API
const TAG = process.env.AMAZON_ASSOCIATE_TAG ?? "";

export async function searchProducts({ query, budget }: { query: string; budget?: string }) {
  if (USE_MOCK) {
    const slug = query.toLowerCase().split(" ").slice(0, 3).join("-").replace(/[^a-z0-9-]/g, "");
    return {
      title: `${capitalize(query)} – Top Pick`,
      image: `https://picsum.photos/seed/${encodeURIComponent(slug)}/600/400`,
      price: priceFor(budget),
      url: withAffiliate(`https://www.amazon.com/s?k=${encodeURIComponent(query)}`),
      rating: Math.round(40 + Math.random() * 10) / 10,
    };
  }

  // TODO: Implement Amazon Product Advertising API (SearchItems) here
  return null;
}

function withAffiliate(base: string) {
  if (!TAG) return base;
  const url = new URL(base);
  url.searchParams.set("tag", TAG);
  return url.toString();
}

function priceFor(budget?: string) {
  switch (budget) {
    case "10-25":  return "$14.99";
    case "25-50":  return "$34.95";
    case "50-100": return "$74.00";
    default:       return "$119.00";
  }
}

function capitalize(str: string) {
  return str.replace(/\b\w/g, (m) => m.toUpperCase());
}
