import Image from "next/image";

export type GiftIdea = {
  title: string;
  reason: string;
  keywords: string[];
  product?: { title: string; image: string; price: string; url: string; rating?: number } | null;
};

export default function GiftGrid({ ideas }: { ideas: GiftIdea[] }) {
  if (!ideas?.length) return null;
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {ideas.map((g, i) => (
        <article key={i} className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow">
          <div className="relative h-44 w-full overflow-hidden rounded-xl bg-neutral-100">
            {g.product?.image ? (
              <Image src={g.product.image} alt={g.product.title} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-400">No image</div>
            )}
          </div>
          <h3 className="line-clamp-2 text-lg font-semibold">{g.product?.title ?? g.title}</h3>
          <p className="line-clamp-3 text-sm text-neutral-600">{g.reason}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">{g.product?.price ?? "—"}</span>
            {g.product?.url ? (
              <a
                href={g.product.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-neutral-200 px-3 py-2 hover:bg-neutral-100"
              >
                Buy on Amazon
              </a>
            ) : (
              <span className="text-neutral-400">Link coming</span>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
