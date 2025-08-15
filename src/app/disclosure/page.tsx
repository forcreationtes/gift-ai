export const metadata = {
  title: "Affiliate Disclosure | Gift Genius",
  description:
    "Affiliate disclosure for Gift Genius. We may earn commissions from qualifying purchases.",
  robots: { index: true, follow: true },
};

export default function DisclosurePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 prose dark:prose-invert">
      <h1>Affiliate Disclosure</h1>

      <p>
        <strong>As an Amazon Associate, we earn from qualifying purchases.</strong>
        Some links on this site are affiliate links. If you click a link and buy
        something, we may earn a commission at no extra cost to you.
      </p>

      <h2>How recommendations are generated</h2>
      <p>
        Gift ideas are suggested by our AI based on the occasion, budget, and
        interests you provide. We do not accept payment to include specific products
        in results. Product availability and pricing can change at any time—please
        verify details on the retailer’s site.
      </p>

      <h2>Other retailers</h2>
      <p>
        We may also link to other retailers. Those sites have their own terms and
        privacy policies.
      </p>

      <h2>Accuracy & updates</h2>
      <p>
        We strive to keep results useful and current, but we cannot guarantee that
        prices, availability, or promotions shown in our suggestions remain accurate
        after you visit a retailer.
      </p>

      <h2>Questions</h2>
      <p>
        For questions about this disclosure, contact us at{" "}
        <a href="mailto:hello@example.com">hello@example.com</a>. You can also read our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </main>
  );
}
