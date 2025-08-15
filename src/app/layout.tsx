// src/app/layout.tsx
import "./globals.css"; // ✅ required for Tailwind styles
import type { Metadata, Viewport } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gift Genius",
  description:
    "Smart, trend-savvy, and AI-picked—your shortcut to thoughtful gifts.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 antialiased">
        <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>

        <footer className="mt-12 border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800">
          <p className="mb-2">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, we
            earn from qualifying purchases.
          </p>
          <p className="space-x-3">
            <Link className="underline hover:no-underline" href="/disclosure">
              Disclosure
            </Link>
            <span aria-hidden>•</span>
            <Link className="underline hover:no-underline" href="/privacy">
              Privacy Policy
            </Link>
            <span aria-hidden>•</span>
            <a
              className="underline hover:no-underline"
              href="mailto:hello@giftgenius.app"
            >
              Contact
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
