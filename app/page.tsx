import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FactoryTourSection } from "@/components/sections/FactoryTourSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
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

  // Testimonial data
  const testimonial = {
    quote:
      "UCRS has transformed our railway operations. Their precision solutions and expert support have been instrumental in our success across multiple regions.",
    author: {
      name: "John Smith",
      role: "Operations Director",
      company: "Global Railways Inc.",
      image: "/images/testimonials/avatar1.jpg",
    },
    rating: 5,
  };


  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        heading="Precision Railroad Solutions for 57+ Countries"
        supportingText="Engage with like-minded creatives in a unique, interactive setting that turns your spontaneous performances into polished digital memories."
      />

      {/* Social Proof */}
      <SocialProofSection heading="Over +300 happy customers" />

      {/* Factory Tour Section */}
      <FactoryTourSection />

      {/* Testimonial */}
      <TestimonialSection testimonial={testimonial} />

      {/* Features Section 3 - could be different variant */}
      <FeaturesSection
        heading="Complete Railway Solutions"
        supportingText="From parts to maintenance, we've got you covered"
        features={features1}
        layout="list"
      />

      {/* FAQ Section */}
      <FAQSection
        title="Support"
        subtitle="FAQs"
        description="Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team."
      />

      {/* Newsletter CTA */}
      <NewsletterSection
        heading="Sign up for our newsletter"
        supportingText="Be the first to know about new products, industry insights, and special offers."
        theme="brand"
      />
    </main>
  );
}
