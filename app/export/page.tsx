import { generateSEO } from "@/lib/seo";
import { ExportHero } from "@/components/sections/export/ExportHero";
import { GlobalMetrics } from "@/components/sections/export/GlobalMetrics";
import { GlobalTradeFeatures } from "@/components/sections/export/GlobalTradeFeatures";
import { TestimonialsCarousel } from "@/components/sections/export/TestimonialsCarousel";
import { SustainabilityMetrics } from "@/components/sections/export/SustainabilityMetrics";
import { WorldMapAbout } from "@/components/sections/WorldMapAbout";

export const metadata = generateSEO({
  title: "Export & Global Presence",
  description:
    "Powering rail networks across 57+ countries with reliable supply chains, certified quality, and localized support. 20,000+ parts shipped annually with 98% on-time delivery.",
  url: "/export",
  keywords: [
    "railway export",
    "global rail parts",
    "international shipping",
    "rail supply chain",
    "locomotive parts export",
    "railway compliance",
    "certified rail parts",
    "24/7 multilingual support",
  ],
});

export default function ExportPage() {
  return (
    <main>
      <ExportHero />
      <WorldMapAbout />
      <GlobalMetrics />
      <GlobalTradeFeatures />
      <TestimonialsCarousel />
      <SustainabilityMetrics />
    </main>
  );
}
