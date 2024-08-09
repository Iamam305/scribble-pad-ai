
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/shared/navbar";
import { Suspense } from "react";
import Script from "next/script";
// import { Navbar } from "@/components/shared/navbar";
import Smartlook from 'smartlook-client'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HotjarSnippet from "@/components/hotjar";
import SmartlookSnippet from "@/components/smartlook";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScribblePad AI | Translate you thoughts into structured content",
  description: "ScribblePad AI is your ultimate tool for creative writing, content generation, and AI-assisted brainstorming. Unleash your creativity with cutting-edge AI technology designed to enhance your writing process.",
  keywords: "AI Writing, Content Generation, Creative Writing, Brainstorming Tool, AI technology, Writing Assistant, ScribblePad AI, Innovative Writing, Content Creation, Writing Tool",
  icons: {
    icon: "./favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== 'undefined') {

    Smartlook.init('75930a8e78deaf34f6e70b790f3af049c0e166f5')
  }
  return (
    <html lang="en" className="dark">
      <head>

       <HotjarSnippet/>
       <SmartlookSnippet/>
      </head>
      <body className={inter.className}>
        <main>

          <Navbar />

          {children}
        </main>
        <Toaster />
        <Suspense>
          <Button variant={"default"} className="fixed bottom-4 right-4">

            <Link href={"https://insigh.to/b/scribble-pad-ai"} target={"_blank"}>
              Give Feedback
            </Link>
          </Button>
        </Suspense>

        <Script src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "785d79991a9f4fe3b8a100cfe895643f"}' defer />


        {/* <Script type='text/javascript'>
          window.smartlook||(function(d) {
    const o=smartlook=function(){o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
          var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
          c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
    })(document);
          smartlook('init', '75930a8e78deaf34f6e70b790f3af049c0e166f5', {region: 'eu' });
        </Script> */}
      </body>
    </html>
  );
}
