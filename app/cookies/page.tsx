import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Cookie Policy',
  description: 'Learn about how UCRS uses cookies and similar technologies on our website.',
  url: '/cookies',
  noIndex: true,
})

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit our website.
            They help us provide you with a better experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p>
            We use cookies for various purposes including functionality, analytics, and marketing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have questions about our Cookie Policy, please contact us at: info@ucrs.com
          </p>
        </section>
      </div>
    </div>
  )
}
