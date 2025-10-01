import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UCRS - Railway Parts & Locomotive Services",
  description: "Leading provider of railway parts, locomotive maintenance, and railway services. Quality parts for all railway systems.",
  keywords: ["railway parts", "locomotive services", "railway maintenance", "train parts", "railway components", "locomotive repair"],
  authors: [{ name: "UCRS" }],
  robots: "index, follow",
  openGraph: {
    title: "UCRS - Railway Parts & Locomotive Services",
    description: "Leading provider of railway parts, locomotive maintenance, and railway services. Quality parts for all railway systems.",
    url: "https://ucrs.com",
    siteName: "UCRS",
    images: [
      {
        url: "https://ucrs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UCRS Railway Parts & Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UCRS - Railway Parts & Locomotive Services",
    description: "Leading provider of railway parts, locomotive maintenance, and railway services.",
    images: ["https://ucrs.com/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://ucrs.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UCRS",
  url: "https://ucrs.com",
  logo: "https://ucrs.com/logo.png",
  description: "Leading provider of railway parts and locomotive services",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Railway Street",
    addressLocality: "Rail City",
    addressRegion: "RC",
    postalCode: "12345",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-123-4567",
    contactType: "customer service",
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Railway Parts",
  description: "High-quality railway parts and components",
  brand: {
    "@type": "Brand",
    name: "UCRS",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Locomotive Services",
  description: "Professional locomotive maintenance and repair services",
  provider: {
    "@type": "Organization",
    name: "UCRS",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What railway parts do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a wide range of railway parts including locomotive components, track parts, and maintenance equipment.",
      },
    },
  ],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  author: {
    "@type": "Person",
    name: "Railway Customer",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
  },
  reviewBody: "Excellent service and quality parts.",
  itemReviewed: {
    "@type": "Organization",
    name: "UCRS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema),
          }}
        />
      </head>
      <body className={`${manrope.variable} min-h-screen flex flex-col`}>
        <Header>
          <div className="container mx-auto flex items-center justify-between h-full">
            <div className="font-bold text-xl text-primary-red">UCRS</div>
            <Navigation
              links={[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Products' },
                { href: '/services', label: 'Services' },
                { href: '/contact', label: 'Contact' },
              ]}
            />
          </div>
        </Header>
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
