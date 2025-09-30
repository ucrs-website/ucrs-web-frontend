export const metadata = {
  title: "Railway Parts - UCRS | High-Quality Train Components & Parts",
  description: "Browse our extensive catalog of railway parts including locomotive components, track parts, and maintenance equipment. Quality assured railway parts for all systems.",
  keywords: ["railway parts", "train parts", "locomotive parts", "track components", "railway equipment", "train components"],
  openGraph: {
    title: "Railway Parts - UCRS",
    description: "High-quality railway parts and components for all locomotive systems.",
    url: "https://ucrs.com/products",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Railway Parts - UCRS",
    description: "High-quality railway parts and components.",
  },
  alternates: {
    canonical: "https://ucrs.com/products",
  },
};

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Railway Parts</h1>
        <p className="text-lg text-gray-600 mb-8">Discover our range of high-quality railway parts</p>
      </main>
    </div>
  );
}