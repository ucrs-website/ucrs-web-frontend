'use client'

import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { generateFAQSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  name: string
  faqs: FAQItem[]
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  description?: string
  categories?: FAQCategory[]
}

const defaultCategories: FAQCategory[] = [
  {
    name: 'General',
    faqs: [
      {
        question: 'Is there a free trial available?',
        answer:
          "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
      },
      {
        question: 'Can I change my plan later?',
        answer: 'Yes, you can change your plan at any time from your account settings.',
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'You can cancel your subscription at any time with no penalties or fees.',
      },
      {
        question: 'Can other info be added to an invoice?',
        answer: 'Yes, you can add custom information to your invoices from the billing settings.',
      },
      {
        question: 'How does billing work?',
        answer: 'We bill monthly or annually depending on your subscription plan.',
      },
      {
        question: 'How do I change my account email?',
        answer: 'You can change your account email from your profile settings.',
      },
    ],
  },
]

export function FAQSection({
  title = 'Support',
  subtitle = 'FAQs',
  description = "Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.",
  categories = defaultCategories,
}: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0)

  // Generate FAQ schema for all FAQs
  const allFaqs = categories.flatMap((cat) => cat.faqs)
  const faqSchema = generateFAQSchema(allFaqs)

  return (
    <>
      <StructuredData data={faqSchema} />
      <section className="bg-white py-24">
        <div className="container mx-auto px-8">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-wrap gap-16 items-start">
              {/* Left column - Heading and categories */}
              <div className="flex flex-col gap-5 max-w-[768px] min-w-[480px] w-[480px]">
                {/* Heading and subheading */}
                <div className="flex flex-col gap-3">
                  <p className="text-base font-semibold leading-6 text-[#e4342d]">
                    {title}
                  </p>
                  <h2 className="text-4xl font-semibold leading-[44px] tracking-[-0.72px] text-[#181d27]">
                    {subtitle}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-lg leading-7 text-[#535862]">
                  {description.split('chat to our friendly team').map((part, i) =>
                    i === 0 ? (
                      <React.Fragment key={i}>
                        {part}
                        <a href="/contact" className="underline decoration-solid">
                          chat to our friendly team
                        </a>
                        .
                      </React.Fragment>
                    ) : null
                  )}
                </p>

                {/* Category tabs */}
                <div className="flex flex-col gap-1 w-[248px]">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCategory(index)}
                      className={`h-9 px-3 py-2 rounded-md text-sm font-semibold leading-5 text-left transition-colors ${
                        activeCategory === index
                          ? 'bg-[#fcf1f0] text-[#e4342d]'
                          : 'text-[#717680] hover:bg-gray-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right column - FAQ Accordion */}
              <div className="flex-1 min-w-[480px] flex flex-col gap-4">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {categories[activeCategory].faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-none bg-neutral-50 rounded-2xl p-8 data-[state=open]:bg-neutral-50"
                    >
                      <AccordionTrigger className="text-left text-lg font-medium leading-7 text-[#181d27] hover:no-underline gap-6 [&[data-state=open]>svg]:rotate-0">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-6 text-[#535862] pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
