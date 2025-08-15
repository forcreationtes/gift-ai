// ...existing imports
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>

        <footer className="mt-12 border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800">
          <p className="mb-2">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, we
            earn from qualifying purchases.
          </p>
          <p className="space-x-4">
            <Link className="underline hover:no-underline" href="/disclosure">
              Disclosure
            </Link>
            <span>•</span>
            <Link className="underline hover:no-underline" href="/privacy">
              Privacy Policy
            </Link>
            <span>•</span>
            <a className="underline hover:no-underline" href="mailto:hello@giftgenius.app">
              Contact
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
