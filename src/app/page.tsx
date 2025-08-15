// src/app/page.tsx
import GiftForm from "@/components/GiftForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf9ff] to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h1 className="mb-6 text-center text-xl font-semibold text-neutral-800 dark:text-neutral-100">
          Smart, trend-savvy, and AI-picked—your shortcut to thoughtful gifts 🎁✨
        </h1>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <GiftForm />
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Made with <span className="text-pink-500">❤️</span> for Secret Santa, birthdays, anniversaries, and more.
        </p>
      </div>
    </main>
  );
}
