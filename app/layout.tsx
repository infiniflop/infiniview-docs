import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Infiniview Docs",
    template: "%s | Infiniview Docs",
  },
  description:
    "Current product documentation for launching scans, configuring GitHub automation, reviewing findings, and exporting proof from Infiniview.",
  metadataBase: new URL("https://docs.infiniview.dev"),
  openGraph: {
    type: "website",
    siteName: "Infiniview Docs",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(interTight.variable, jetbrains.variable)}>
      <body>{children}</body>
    </html>
  );
}
