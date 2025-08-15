export const metadata = {
  title: "Affiliate Disclosure | Gift Genius",
  description:
    "Affiliate disclosure for Gift Genius describing our participation in the Amazon Services LLC Associates Program.",
};

export default function DisclosurePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 prose prose-neutral dark:prose-invert">
      <h1>Affiliate Disclosure</h1>
      <p>
        Gift Genius participates in the Amazon Services LLC Associates Program,
        an affiliate advertising program designed to provide a means for sites to
        earn advertising fees by advertising and linking to Amazon properties,
        including <a href="https://www.amazon.com/">amazon.com</a>.
      </p>
      <p>
        As an Amazon Associate, we earn from qualifying purchases. Product prices
        and availability are accurate as of the date/time indicated and are subject
        to change. Any price and availability information displayed on Amazon at
        the time of purchase will apply to the purchase of the product.
      </p>
      <p>
        Some links on this site are affiliate links. If you click on an affiliate
        link and make a purchase, we may receive a small commission—at no
        additional cost to you. This helps us keep the site running and improve
        our gift recommendations.
      </p>
      <p>
        If you have questions about our affiliate relationships, please contact us
        at <a href="mailto:hello@giftgenius.app">hello@giftgenius.app</a>.
      </p>
    </main>
  );
}
