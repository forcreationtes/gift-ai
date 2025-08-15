import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gift Genius | AI-Powered Gift Ideas",
  description: "Instant, personalized gift ideas with affiliate buy links.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-50 text-neutral-900`}>
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </body>
    </html>
  );
}
