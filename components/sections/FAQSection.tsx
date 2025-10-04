"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { generateFAQSchema } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  faqs: FAQItem[];
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  categories?: FAQCategory[];
}

const defaultCategories: FAQCategory[] = [
  {
    name: "General",
    faqs: [
      {
        question: "What is UCRS and what do you specialize in?",
        answer:
          "UCRS is an Ontario-based corporation specializing in railway equipment. We manufacture and supply assembly components and spare parts for locomotives, freight cars, and passenger coaches. Our mission is to provide the highest quality products that meet or exceed OEM designs and specifications.",
      },
      {
        question: "Which countries do you serve?",
        answer:
          "We provide railway solutions and services to over 57 countries worldwide, ensuring reliable support wherever you operate.",
      },
      {
        question: "How can I request a quote?",
        answer:
          'You can request a quote by clicking the "Request a Quote" button in our header, filling out our contact form, or reaching out to our sales team directly via phone or email.',
      },
    ],
  },
  {
    name: "Products & Parts",
    faqs: [
      {
        question: "What types of railway parts do you offer?",
        answer:
          "We offer a comprehensive range of railway parts including locomotive components, traction motor pinion tooth contour gauges, assembly components for freight cars and passenger coaches, and spare parts. All parts are manufactured to meet or exceed OEM specifications.",
      },
      {
        question:
          "Are your parts compatible with major locomotive manufacturers?",
        answer:
          "Yes, our parts are designed to be compatible with major manufacturers including EMD® and GE® locomotives. We ensure all products meet OEM designs and specifications.",
      },
      {
        question: "Do you offer custom manufacturing?",
        answer:
          "Yes, we provide custom manufacturing services for railway components. Our team works closely with global manufacturers to deliver solutions tailored to your specific requirements.",
      },
    ],
  },
  {
    name: "Quality & Certification",
    faqs: [
      {
        question: "What quality standards do you follow?",
        answer:
          "All our products are manufactured in compliance with the AAR-M1003 quality assurance program, ensuring the highest standards of quality and reliability in the railway industry.",
      },
      {
        question: "Do you provide warranty on your products?",
        answer:
          "Yes, we offer comprehensive warranties on all our products. The warranty terms vary depending on the product type. Contact our team for specific warranty information.",
      },
      {
        question: "Are your products AAR-M1003 certified?",
        answer:
          "Yes, all our products are manufactured in compliance with AAR-M1003 quality assurance program standards.",
      },
    ],
  },
  {
    name: "Services & Support",
    faqs: [
      {
        question: "What services do you provide?",
        answer:
          "We offer equipment repairs and supply, technical support and training, overhaul project management and consulting, and re-manufacturing of main alternators for EMD® and GE® locomotives.",
      },
      {
        question: "Do you provide installation and technical support?",
        answer:
          "Yes, we provide comprehensive technical support and training services. Our expert team ensures proper installation and integration with your existing systems.",
      },
      {
        question: "Do you offer re-manufacturing services?",
        answer:
          "Yes, we specialize in re-manufacturing main alternators for EMD® and GE® locomotives, providing cost-effective solutions while maintaining the highest quality standards.",
      },
    ],
  },
  {
    name: "Ordering & Shipping",
    faqs: [
      {
        question: "How do I place an order?",
        answer:
          "You can place an order by contacting our sales team directly, submitting a request through our website, or working with your designated account manager.",
      },
      {
        question: "What are your delivery times?",
        answer:
          "Delivery times vary depending on the product and your location. Our team will provide specific delivery estimates when you place your order.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to over 57 countries worldwide. Our global network ensures reliable delivery wherever you operate.",
      },
    ],
  },
];

export function FAQSection({
  title = "Support",
  subtitle = "FAQs",
  description = "Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.",
  categories = defaultCategories,
}: FAQSectionProps) {
  // Generate FAQ schema for all FAQs
  const allFaqs = categories.flatMap((cat) => cat.faqs);
  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <>
      <StructuredData data={faqSchema} />
      <section className="bg-white py-24">
        <div className="container mx-auto px-8">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-wrap gap-16 items-start">
              {/* Left column - Heading */}
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
                  {description
                    .split("chat to our friendly team")
                    .map((part, i) =>
                      i === 0 ? (
                        <React.Fragment key={i}>
                          {part}
                          <a
                            href="/contact"
                            className="underline decoration-solid"
                          >
                            chat to our friendly team
                          </a>
                          .
                        </React.Fragment>
                      ) : null
                    )}
                </p>
              </div>
              {/* Responsive Tabs - Vertical on desktop, Horizontal on mobile */}
              <div className="w-full">
                {/* Mobile: Horizontal scrollable tabs */}
                <div className="md:hidden w-full">
                  <Tabs defaultValue="0">
                    <ScrollArea className="w-full">
                      <TabsList className="mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full inline-flex">
                        {categories.map((category, index) => (
                          <TabsTrigger
                            key={index}
                            value={index.toString()}
                            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-[#e4342d] data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm font-semibold whitespace-nowrap"
                          >
                            {category.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                    {categories.map((category, categoryIndex) => (
                      <TabsContent
                        key={categoryIndex}
                        value={categoryIndex.toString()}
                        className="w-full mt-4"
                      >
                        <Accordion
                          type="single"
                          collapsible
                          className="w-full space-y-2"
                        >
                          {category.faqs.map((faq, faqIndex) => (
                            <AccordionItem
                              key={faqIndex}
                              value={faqIndex.toString()}
                              className="data-[state=open]:bg-neutral-50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-2xl px-8 py-1 border-none outline-none has-focus-visible:ring-[3px]"
                            >
                              <AccordionPrimitive.Header className="flex">
                                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between rounded-md py-4 text-left text-lg font-medium leading-7 text-[#181d27] transition-all outline-none focus-visible:ring-0 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                                  {faq.question}
                                  <Plus
                                    size={24}
                                    className="pointer-events-none shrink-0 text-[#a4a7ae] transition-transform duration-200"
                                    aria-hidden="true"
                                  />
                                </AccordionPrimitive.Trigger>
                              </AccordionPrimitive.Header>
                              <AccordionContent className="text-base leading-6 text-[#535862] pb-4">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                {/* Desktop: Vertical tabs */}
                <Tabs
                  defaultValue="0"
                  orientation="vertical"
                  className="hidden md:flex w-full flex-row gap-8"
                >
                  <TabsList className="flex-col justify-start items-start gap-1 bg-transparent py-0 w-1/2">
                    {categories.map((category, index) => (
                      <TabsTrigger
                        key={index}
                        value={index.toString()}
                        className="data-[state=active]:bg-[#fcf1f0] data-[state=active]:text-[#e4342d] w-fit justify-start data-[state=active]:shadow-none text-[#717680] h-9 px-3 py-2 rounded-md text-sm font-semibold"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Right column - FAQ Accordion in Tab Content */}
                  {categories.map((category, categoryIndex) => (
                    <TabsContent
                      key={categoryIndex}
                      value={categoryIndex.toString()}
                      className="flex-1 min-w-[480px] mt-0"
                    >
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-2"
                      >
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={faqIndex.toString()}
                            className="data-[state=open]:bg-neutral-50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-2xl px-8 py-1 border-none outline-none has-focus-visible:ring-[3px]"
                          >
                            <AccordionPrimitive.Header className="flex">
                              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between rounded-md py-4 text-left text-lg font-medium leading-7 text-[#181d27] transition-all outline-none focus-visible:ring-0 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                                {faq.question}
                                <Plus
                                  size={24}
                                  className="pointer-events-none shrink-0 text-[#a4a7ae] transition-transform duration-200"
                                  aria-hidden="true"
                                />
                              </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionContent className="text-base leading-6 text-[#535862] pb-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
