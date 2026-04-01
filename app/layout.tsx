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
  title: "The Hour Club — 24-Hour Recovery Clubhouse in Carrollton, GA",
  description:
    "The Hour Club is a 24-hour recovery clubhouse in Carrollton, GA hosting AA, NA, Al-Anon, and CMA meetings. All are welcome.",
  keywords: [
    "AA meetings Carrollton GA",
    "NA meetings Carrollton GA",
    "Al-Anon Carrollton GA",
    "CMA meetings Carrollton GA",
    "recovery clubhouse",
    "24 hour meetings",
    "Alcoholics Anonymous",
    "Narcotics Anonymous",
    "The Hour Club",
    "Consolidated Group",
  ],
  openGraph: {
    title: "The Hour Club — 24-Hour Recovery Clubhouse",
    description:
      "A place of recovery, 24 hours a day. AA, NA, Al-Anon, and CMA meetings in Carrollton, GA.",
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
