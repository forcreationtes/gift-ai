export const metadata = {
  title: "Privacy Policy | Gift Genius",
  description:
    "Privacy Policy explaining what data Gift Genius collects and how it is used.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 prose prose-neutral dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>Overview</h2>
      <p>
        Gift Genius (“we”, “our”, “us”) provides AI-assisted gift ideas. This
        policy explains what information we collect and how we use it.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Form inputs:</strong> age group, occasion, budget, and interests
          you enter to generate ideas.
        </li>
        <li>
          <strong>Technical data:</strong> basic analytics such as page views,
          device/browser type, and approximate location derived from your IP
          address. We use this to improve the product.
        </li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>To generate gift recommendations and improve our suggestions.</li>
        <li>To operate, maintain, and secure our service.</li>
        <li>
          To track outbound clicks to retailers (e.g., Amazon) for attribution of
          affiliate commissions.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We may use cookies or similar technologies for analytics and affiliate
        attribution. You can control cookies in your browser settings.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our site links to third-party retailers, including Amazon. Their sites
        have separate privacy practices; please review their policies.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email us at{" "}
        <a href="mailto:hello@giftgenius.app">hello@giftgenius.app</a>.
      </p>
    </main>
  );
}
