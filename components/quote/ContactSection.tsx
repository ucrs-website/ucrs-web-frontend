/**
 * Contact Section Component
 * Contact cards for Sales, Customer Support, Technical Support, and Phone
 */

import { MessageCircle, Headset, Phone } from "lucide-react";

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  contactValue: string;
  href: string;
}

const CONTACT_CARDS: ContactCard[] = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Sales",
    description: "Questions or queries? Get in touch!",
    contactValue: "sales@ucrs.com",
    href: "mailto:sales@ucrs.com",
  },
  {
    icon: <Headset className="w-6 h-6" />,
    title: "Customer Support",
    description: "Track your order in real time",
    contactValue: "commercial@ucrs.com",
    href: "mailto:commercial@ucrs.com",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Technical Support",
    description: "Our friendly team is here to help.",
    contactValue: "support@ucrs.com",
    href: "mailto:support@ucrs.com",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    description: "We're ready to service you",
    contactValue: "289-597-UCRS (8277)",
    href: "tel:+12895978277",
  },
];

export function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="contact-us">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-16">
            <div className="text-primary text-sm md:text-base font-semibold mb-2">
              We'd love to hear from you
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Our friendly team is always here to chat.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_CARDS.map((card, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl mb-4">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>

                {/* Contact Link */}
                <a
                  href={card.href}
                  className="text-primary font-medium text-sm hover:underline inline-block"
                >
                  {card.contactValue}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
