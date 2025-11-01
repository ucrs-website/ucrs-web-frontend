import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FactoryTourSection } from "@/components/sections/FactoryTourSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { WorldMapSection } from "@/components/sections/WorldMapSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { WarrantySection } from "@/components/sections/WarrantySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { Zap, Shield, TrendingUp, Users, Clock, Award } from "lucide-react";

export default function HomePage() {
  // Features data
  const features1 = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Our railway solutions are optimized for speed and efficiency, ensuring rapid delivery and installation.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Industry-leading security standards and proven reliability across 57+ countries worldwide.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description:
        "Grow your operations with our flexible solutions that scale with your business needs.",
    },
  ];

  const features2 = [
    {
      icon: Users,
      title: "Expert Support",
      description:
        "24/7 customer support from our team of railway industry experts and specialists.",
    },
    {
      icon: Clock,
      title: "Quick Deployment",
      description:
        "Get up and running in no time with our streamlined installation and setup process.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized globally for excellence in railway parts and locomotive services.",
    },
  ];

  // Testimonials data - carousel with multiple testimonials
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

  return (
    <main
      className="relative bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url('/images/home-page-bg.png')" }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof */}
      <SocialProofSection heading="Well engaged in railway community" />

      {/* Factory Tour Section */}
      <FactoryTourSection />

      {/* World Map Section */}
      <WorldMapSection />

      {/* Testimonials Carousel */}
      <TestimonialSection testimonials={testimonials} />

      {/* Warranty Section */}
      <WarrantySection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter CTA */}
      <NewsletterSection
        heading="Sign up for our newsletter"
        supportingText="Be the first to know about new products, industry insights, and special offers."
        theme="brand"
      />
    </main>
  );
}
