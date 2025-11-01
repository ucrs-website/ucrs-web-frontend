import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact Us",
  description:
    "Get in touch with UCRS for railway parts inquiries, locomotive service requests, or any questions about our services.",
  keywords: [
    "contact ucrs",
    "railway parts inquiry",
    "locomotive services contact",
  ],
  url: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">Soon ...</p>
      {/* Add your Figma design implementation here */}
    </div>
  );
}
