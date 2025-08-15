"use client";

import type { GiftIdea } from "@/types/gifts";

type Props = {
  items: GiftIdea[];
  onReset?: () => void;
};

export default function ResultsGrid({ items, onReset }: Props) {
  if (!items?.length) return null;

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gift ideas ({items.length})</h3>
        {onReset && (
          <button
            className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            onClick={onReset}
            type="button"
          >
            Start over
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <article
            key={it.id}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <img
              src={it.image}
              alt={it.title}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
            <div className="space-y-2 p-3">
              <div className="flex items-start justify-between gap-3">
                <h4 className="line-clamp-2 font-medium">{it.title}</h4>
                <span className="shrink-0 rounded bg-neutral-100 px-2 py-0.5 text-sm dark:bg-neutral-800">
                  {it.price}
                </span>
              </div>

              {it.reason && (
                <p className="text-xs text-neutral-500">{it.reason}</p>
              )}

              {it.badges?.length ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {it.badges.map((b, i) => (
                    <span
                      key={`${it.id}-b-${i}`}
                      className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-700"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="pt-1">
                <a
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:brightness-110"
                >
                  Buy
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
