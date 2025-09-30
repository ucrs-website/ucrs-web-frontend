export const metadata = {
  title: "Locomotive Services - UCRS | Professional Railway Maintenance & Repair",
  description: "Expert locomotive services including maintenance, repair, and inspection. Professional railway service solutions for optimal performance and safety.",
  keywords: ["locomotive services", "railway maintenance", "train repair", "locomotive inspection", "railway services", "train maintenance"],
  openGraph: {
    title: "Locomotive Services - UCRS",
    description: "Professional locomotive maintenance and repair services.",
    url: "https://ucrs.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locomotive Services - UCRS",
    description: "Professional locomotive maintenance and repair services.",
  },
  alternates: {
    canonical: "https://ucrs.com/services",
  },
};

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Locomotive Services</h1>
        <p className="text-lg text-gray-600 mb-8">Professional railway maintenance and repair services</p>
      </main>
    </div>
  );
}