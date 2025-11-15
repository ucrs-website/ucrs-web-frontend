import { generateSEO } from "@/lib/seo";
import { ExportHero } from "@/components/sections/export/ExportHero";
import { GlobalMetrics } from "@/components/sections/export/GlobalMetrics";
import { GlobalTradeFeatures } from "@/components/sections/export/GlobalTradeFeatures";
import { TestimonialsCarousel } from "@/components/sections/export/TestimonialsCarousel";
import { SustainabilityMetrics } from "@/components/sections/export/SustainabilityMetrics";
import { WorldMapAbout } from "@/components/sections/WorldMapAbout";
import { TestimonialSection } from "@/components/sections/TestimonialSection";

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
    "24/7 support",
  ],
});

const testimonials = [
  {
    quote:
      "Upper Canada Railway Services Corp/Canada for the 16-645E and 16-645E3C diesel engines used in 22000 and 33000 series diesel locomotives, as per your request in the letter dated November 12, 2024. We confirm that these spare parts for the 16-645E and 16-645E3C diesel engines used in 22000 and 33000 series diesel locomotives have been used successfully and without issues within our company.",
    author: {
      name: "Dr. F. Şinasi Kazancıoğlu",
      role: "Deputy General Manager",
    },
    company: {
      name: "Turkish State Railways Transportation Inc.",
      location: "TCDD Taşımacılık A.Ş., Turkey",
    },
    image: "/images/testimonial/turkey.avif",
    rating: 5,
  },
  {
    quote:
      "It is the company we prefer the most in the locomotive parts market and the company we are pleased to work with.",
    author: {
      name: "Murat Saykan",
      role: "CEO",
    },
    company: {
      name: "BM International LLC",
      location: "UAE",
    },
    image: "/images/testimonial/etihad.avif",
    rating: 5,
  },
  {
    quote:
      "UCRS has supplied locomotive spare parts for our 22000 and 33000 series fleets for more than ten years. Their components for the 16-645E and 16-645E3C diesel engines have performed reliably with no issues, and the cooperation during this period has been productive and successful.",
    author: {
      name: "Khaled Mohamed Embabi",
      role: "Deputy Chairman of the Board",
    },
    company: {
      name: "Egyptian National Railways",
      location: "ENR, Egypt",
    },
    image: "/images/testimonial/enr.avif",
    rating: 5,
  },
  {
    quote:
      "Sam Hosseini – my main point of contact is one of the best people I know in the industry. Technical informations and time of response is perfect. Pleasure to deal with!!!",
    author: {
      name: "Hubert Baster",
      role: "Senior Sales Executive",
    },
    company: {
      name: "Associated Rewinds LTD",
      location: "Ireland",
    },
    image: "/images/testimonial/ireland.avif",
    rating: 5,
  },
  {
    quote:
      "UCRS has provided locomotive spare parts and related technical consultancy to our company for over a decade. We have consistently experienced high quality and efficient service without any recorded concerns, and our business relationship has delivered excellent results.",
    author: {
      name: "Director of Procurement",
      role: "Director of Procurement",
    },
    company: {
      name: "Egyptian Railways Maintenance and Services Co.",
      location: "ERMAS, Egypt",
    },
    image: "/images/testimonial/ermas.avif",
    rating: 5,
  },
];

export default function ExportPage() {
  return (
    <main>
      <ExportHero />
      <WorldMapAbout />
      <GlobalMetrics />
      <GlobalTradeFeatures />
      {/*<TestimonialsCarousel />*/}
      <SustainabilityMetrics />
      <TestimonialSection testimonials={testimonials} />
    </main>
  );
}
