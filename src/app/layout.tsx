// src/app/layout.tsx
import "./globals.css"; // ✅ required for Tailwind styles
import type { Metadata, Viewport } from "next";

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
        <div className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
