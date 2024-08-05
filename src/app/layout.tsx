
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/shared/navbar";
import { Suspense } from "react";
import Script from "next/script";
// import { Navbar } from "@/components/shared/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScribblePad AI | Translate you thoughts into structured content",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main>

          <Navbar />

          {children}
        </main>
        <Toaster />
        <Script src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "785d79991a9f4fe3b8a100cfe895643f"}' defer />


      </body>
    </html>
  );
}
