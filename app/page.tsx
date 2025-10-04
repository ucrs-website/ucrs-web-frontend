import { HeroSection } from '@/components/sections/HeroSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import {
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Award
} from 'lucide-react'

export default function HomePage() {
  // Features data
  const features1 = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our railway solutions are optimized for speed and efficiency, ensuring rapid delivery and installation.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Industry-leading security standards and proven reliability across 57+ countries worldwide.',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description: 'Grow your operations with our flexible solutions that scale with your business needs.',
    },
  ]

  const features2 = [
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 customer support from our team of railway industry experts and specialists.',
    },
    {
      icon: Clock,
      title: 'Quick Deployment',
      description: 'Get up and running in no time with our streamlined installation and setup process.',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized globally for excellence in railway parts and locomotive services.',
    },
  ]

  // Testimonial data
  const testimonial = {
    quote: 'UCRS has transformed our railway operations. Their precision solutions and expert support have been instrumental in our success across multiple regions.',
    author: {
      name: 'John Smith',
      role: 'Operations Director',
      company: 'Global Railways Inc.',
      image: '/images/testimonials/avatar1.jpg',
    },
    rating: 5,
  }

  // FAQ data
  const faqs = [
    {
      question: 'What countries do you serve?',
      answer: 'We provide railway solutions and services to over 57 countries across North America, Europe, Asia, and other regions. Our global network ensures reliable support wherever you operate.',
    },
    {
      question: 'What types of railway parts do you offer?',
      answer: 'We offer a comprehensive range of railway parts including locomotive components, track systems, signaling equipment, and maintenance tools. All parts meet international quality standards.',
    },
    {
      question: 'Do you provide installation services?',
      answer: 'Yes, we provide complete installation and commissioning services. Our expert technicians ensure proper setup and integration with your existing systems.',
    },
    {
      question: 'What is your warranty policy?',
      answer: 'We offer comprehensive warranties on all our products, typically ranging from 1-5 years depending on the product type. Extended warranty options are also available.',
    },
    {
      question: 'How can I request a quote?',
      answer: 'You can request a quote by clicking the "Request a Quote" button in our header, filling out our contact form, or reaching out to our sales team directly via phone or email.',
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        heading="Precision Railroad Solutions for 57+ Countries"
        supportingText="Engage with like-minded creatives in a unique, interactive setting that turns your spontaneous performances into polished digital memories."
      />

      {/* Social Proof */}
      <SocialProofSection heading="Over +300 happy customers" />

      {/* Features Section 1 */}
      <FeaturesSection
        heading="Cutting-edge features"
        supportingText="Everything you need to manage your railway operations efficiently"
        features={features1}
        layout="grid"
      />

      {/* Features Section 2 */}
      <FeaturesSection
        heading="Why Choose UCRS"
        supportingText="Discover what makes us the preferred choice for railway solutions"
        features={features2}
        layout="grid"
      />

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
        heading="Frequently asked questions"
        supportingText="Everything you need to know about our products and services"
        faqs={faqs}
      />

      {/* Newsletter CTA */}
      <NewsletterSection
        heading="Sign up for our newsletter"
        supportingText="Be the first to know about new products, industry insights, and special offers."
        theme="brand"
      />
    </main>
  )
}
