"use client";
import { About } from "@/components/home/About";
import { Cta } from "@/components/home/Cta";
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";

import { Newsletter } from "@/components/home/Newsletter";
import { Pricing } from "@/components/home/Pricing";
import { ScrollToTop } from "@/components/home/ScrollToTop";
import { Services } from "@/components/home/Services";
import { Sponsors } from "@/components/home/Sponsors";
import { Team } from "@/components/home/Team";
import { Testimonials } from "@/components/home/Testimonials";
import { Metadata } from "next";
import Image from "next/image";

export default function Home() {
  return (
    <>

      <Hero />
      <HowItWorks />
      <Services />
      <Sponsors />
      <Features />
      {/* <About /> */}
      {/* <Newsletter /> */}
      <Cta />
      {/* <Testimonials /> */}
      {/* <Team /> */}
      <Pricing />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}
