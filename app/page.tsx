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
        "The quality of products from Railroad Factory is unmatched. Their attention to detail and service is exceptional. We appreciate their dedication to our needs!",
      author: {
        name: "Sarah Mitchell",
        role: "Director",
      },
      company: {
        name: "Northern Rail Systems",
        location: "Canada, Toronto",
      },
      image: "/testimonial-factory.avif",
      rating: 5,
    },
    {
      quote:
        "UCRS has transformed our railway operations. Their precision solutions and expert support have been instrumental in our success across multiple regions.",
      author: {
        name: "Marcus Chen",
        role: "Chief Operations Officer",
      },
      company: {
        name: "Pacific Railway Group",
        location: "USA, San Francisco",
      },
      image: "/testimonial-factory.avif",
      rating: 5,
    },
    {
      quote:
        "Outstanding reliability and performance. UCRS delivers on their promises every single time. Our partnership has been nothing short of exceptional.",
      author: {
        name: "Elena Rodriguez",
        role: "VP of Engineering",
      },
      company: {
        name: "TransEuropa Rail",
        location: "Spain, Madrid",
      },
      image: "/testimonial-factory.avif",
      rating: 5,
    },
    {
      quote:
        "Working with UCRS has elevated our maintenance standards significantly. Their innovative solutions and responsive support team make them an invaluable partner.",
      author: {
        name: "James O'Connor",
        role: "Maintenance Director",
      },
      company: {
        name: "Celtic Rail Services",
        location: "Ireland, Dublin",
      },
      image: "/testimonial-factory.avif",
      rating: 5,
    },
    {
      quote:
        "The expertise and professionalism of the UCRS team is second to none. They understand our industry challenges and consistently provide solutions that exceed expectations.",
      author: {
        name: "Yuki Tanaka",
        role: "Technical Manager",
      },
      company: {
        name: "Asia Pacific Railways",
        location: "Japan, Tokyo",
      },
      image: "/testimonial-factory.avif",
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
