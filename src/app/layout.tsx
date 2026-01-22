import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigitaLab TN | IPTV, Netflix & Spotify Tunisie",
  description: "Achetez vos abonnements IPTV, Netflix, Spotify et cartes cadeaux en Tunisie. Livraison immédiate, support 24/7 et meilleurs prix chez DigitaLab TN.",
  keywords: ["iptv Tunisie","IPTV Tunisie", "Netflix Tunisie", "Spotify Tunisie", "Abonnement IPTV", "Gaming Tunisie", "DigitaLab TN"],
};

import { getCategories } from "@/lib/db";

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header categories={categories} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
