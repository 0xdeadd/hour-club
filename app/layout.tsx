import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Hour Club",
  description:
    "The Hour Club — a members-only recovery community hub in Carrollton, GA.",
  keywords: [
    "AA meetings Carrollton GA",
    "NA meetings Carrollton GA",
    "Al-Anon Carrollton GA",
    "CMA meetings Carrollton GA",
    "recovery clubhouse",
    "Alcoholics Anonymous",
    "Narcotics Anonymous",
    "The Hour Club",
    "Consolidated Group",
  ],
  openGraph: {
    title: "The Hour Club",
    description:
      "A members-only recovery community hub in Carrollton, GA.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
