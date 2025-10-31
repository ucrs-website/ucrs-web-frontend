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
        "We hereby certify that Upper Canada CompanyHas been providing for more than 10 years Supplying Locomotives Spare Parts and Consultancies with efficiency and high quality without any notes and Business relation through this period was fruitful with success.",
      author: {
        name: "Sarah Mitchell",
        role: "Director",
      },
      company: {
        name: "ERMAS",
        location: "Egyptian Railways",
      },
      image: "/images/testimonial/ermas.avif",
      rating: 5,
    },
  ];

  return (
    <main>
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
