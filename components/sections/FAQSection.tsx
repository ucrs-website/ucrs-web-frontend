"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { generateFAQSchema } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs?: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  {
    question: "What is your warranty term?",
    answer:
      "All parts supplies is backed up with 12 months in service and 18 months from the date of shipment EXW, whichever comes first. This warranty is exclusive of items that are considered as wear and tear parts.",
  },
  {
    question: "Are you shipping Worldwide?",
    answer:
      "Yes. Over 80% of our business is export related and we ship orders to international customer on daily basis.",
  },
  {
    question: "Is there a minimum order policy?",
    answer:
      "Yes. We have a policy of the minimum order of USD 500 for domestic orders and USD 1000 for international orders. Admin fees of USD 200 will be applied for any international order below USD 1000 or domestic order below USD 500.",
  },
  {
    question: "What is your payment term?",
    answer:
      "Payment should be made via wire transfer, ACH, or EFT. We accept Letters of Credit (LC) for orders with a minimum value of USD 10,000. For LC payments below USD 10,000, a non-refundable fee of USD 500 will apply to cover LC documentation and bank negotiation charges.",
  },
  {
    question: "What is the shipping terms offered by UCRS?",
    answer:
      "We ship on EXW, FOB, C&F and CIF based on Incoterms® 2020.",
  },
];

export function FAQSection({
  title = "Support",
  subtitle = "FAQs",
  description = "Everything you need to know about the product and billing. Can't find the answer you're looking for? Please contact to our team.",
  faqs = defaultFaqs,
}: FAQSectionProps) {
  // Generate FAQ schema
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <StructuredData data={faqSchema} />
      <section className="bg-white py-24">
        <div className="container mx-auto px-8">
          <div className="max-w-[1280px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col gap-5 max-w-[768px] mb-16">
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
                {description
                  .split("contact to our team")
                  .map((part, i) =>
                    i === 0 ? (
                      <React.Fragment key={i}>
                        {part}
                        <a
                          href="/contact"
                          className="underline decoration-solid"
                        >
                          contact to our team
                        </a>
                        .
                      </React.Fragment>
                    ) : null
                  )}
              </p>
            </div>

            {/* FAQ Accordion - Single column, full width */}
            <div className="w-full">
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-8"
                defaultValue="0"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={index.toString()}
                    className="data-[state=open]:bg-[#f9fafb] data-[state=open]:px-6 data-[state=open]:py-6 data-[state=open]:-mx-6 data-[state=open]:mb-2 rounded-lg border-0"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="flex flex-1 items-start justify-between text-left gap-6 outline-none focus-visible:ring-0 group">
                        <span className="text-lg font-medium leading-7 text-[#181d27] flex-1">
                          {faq.question}
                        </span>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#eaecf0] flex items-center justify-center transition-all relative">
                          <Plus
                            size={16}
                            className="text-[#667085] absolute group-data-[state=open]:hidden"
                            aria-hidden="true"
                          />
                          <Minus
                            size={16}
                            className="text-[#667085] absolute hidden group-data-[state=open]:block"
                            aria-hidden="true"
                          />
                        </div>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionContent className="text-base leading-6 text-[#535862] pt-2 pr-10">
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
  );
}
