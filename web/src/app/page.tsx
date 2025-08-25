"use client"

import {
  Header,
  HeroSection,
  Footer
} from "@/components/landing"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}