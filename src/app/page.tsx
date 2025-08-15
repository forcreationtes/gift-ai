// src/app/page.tsx
import Link from "next/link";
import GiftForm from "@/components/GiftForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf9ff] to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h1 className="mb-2 text-center text-xl font-semibold text-neutral-800 dark:text-neutral-100">
          Smart, trend-savvy, and AI-picked—your shortcut to thoughtful gifts 🎁✨
        </h1>

        {/* Amazon Associates disclosure */}
        <p className="mb-6 text-center text-[11px] text-neutral-500">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <GiftForm />
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Made with <span className="text-pink-500">❤️</span> for Secret Santa, birthdays, anniversaries, and more.
        </p>

        {/* Optional: legal links */}
        <p className="mt-2 text-center text-xs text-neutral-400">
          <Link href="/privacy" className="underline hover:text-neutral-600">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/disclosure" className="underline hover:text-neutral-600">
            Disclosure
          </Link>
        </p>
      </div>
    </main>
  );
}
