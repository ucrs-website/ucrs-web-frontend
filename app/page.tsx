export const metadata = {
  title: "UCRS - Railway Parts & Locomotive Services | Home",
  description: "Welcome to UCRS, your trusted partner for high-quality railway parts and professional locomotive services. Discover our comprehensive range of products and expert maintenance solutions.",
  keywords: ["railway parts", "locomotive services", "railway maintenance", "train parts", "railway components"],
  openGraph: {
    title: "UCRS - Railway Parts & Locomotive Services",
    description: "Leading provider of railway parts and locomotive services.",
    url: "https://ucrs.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UCRS - Railway Parts & Locomotive Services",
    description: "Leading provider of railway parts and locomotive services.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Next.js 15</h1>
        <p className="text-lg text-gray-600 mb-8">Get started by editing app/page.tsx</p>
        <div className="space-x-4">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Read Docs
          </a>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Learn Next.js
          </a>
        </div>
      </main>
    </div>
  );
}
