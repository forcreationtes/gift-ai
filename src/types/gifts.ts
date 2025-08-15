export type GiftIdea = {
  id: string;
  title: string;
  price: string;      // "$24.99"
  url: string;        // buy link
  image: string;      // image URL
  badges?: string[];  // e.g. ["Trending", "Tech"]
  reason?: string;    // short why-it-fits
};

export type GiftQuery = {
  occasion: string;
  interests: string[]; // 1–5
  ageGroup: string;
  identity: string;     // your "gender" select label
  budget: string;       // "$25–$50", "$200+", etc
};
