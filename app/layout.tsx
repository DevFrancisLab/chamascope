import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Nav from "./_components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChamaScope — A Trust Layer for Digital Chama Platforms",
  description:
    "Surfaces silent API failures, reconciles dashboard totals, audits configuration, and reports on production hygiene for the ChamaConnect platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex min-h-screen flex-col md:flex-row">
          <aside className="border-b border-[var(--border)] bg-[var(--surface)] md:w-64 md:border-b-0 md:border-r">
            <div className="flex items-center gap-2 px-5 pt-6 pb-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[var(--accent)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2 4 -4" />
                </svg>
              </span>
              <Link
                href="/"
                className="text-base font-semibold tracking-tight text-[var(--foreground)]"
              >
                ChamaScope
              </Link>
            </div>
            <p className="px-5 text-xs text-[var(--muted)]">
              A trust layer for digital chamas
            </p>
            <Nav />
          </aside>
          <main className="flex-1">
            <div className="mx-auto w-full max-w-5xl px-6 py-8">{children}</div>
            <footer className="border-t border-[var(--border)] px-6 py-4 text-xs text-[var(--muted)]">
              ChamaScope · Built for the ChamaConnect Virtual Hackathon ·{" "}
              {new Date().getFullYear()}
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
