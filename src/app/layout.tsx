import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { getCategories } from "@/lib/db";

import "./globals.css";

export const metadata: Metadata = {
  title: "DigitalFun TN | IPTV, Netflix & Spotify Tunisie",
  description:
    "Achetez vos abonnements IPTV, Netflix, Spotify et cartes cadeaux en Tunisie. Livraison immediate, support 24/7 et meilleurs prix chez DigitalFun TN.",
  keywords: [
    "iptv Tunisie",
    "IPTV Tunisie",
    "Netflix Tunisie",
    "Spotify Tunisie",
    "Abonnement IPTV",
    "Gaming Tunisie",
    "DigitalFun TN",
  ],
  verification: {
    google: "uPGhsckn3tT9mHbLucIbm1gagir8X0H5C92NJLqZqwM",
  },
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <AppShell categories={categories}>{children}</AppShell>
        <MicrosoftClarity />
      </body>
    </html>
  );
}
