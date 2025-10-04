import React from 'react'
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

interface FAQSectionProps {
  heading?: string
  supportingText?: string
  faqs: FAQItem[]
}

export function FAQSection({
  heading = 'Frequently asked questions',
  supportingText = 'Everything you need to know about the product and billing.',
  faqs,
}: FAQSectionProps) {
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <StructuredData data={faqSchema} />
      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto">
            {/* Section header */}
            <div className="text-center max-w-[768px] mx-auto mb-16">
              <h2 className="text-4xl font-semibold text-foreground mb-4">
                {heading}
              </h2>
              <p className="text-xl text-muted-foreground">
                {supportingText}
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-[768px] mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
