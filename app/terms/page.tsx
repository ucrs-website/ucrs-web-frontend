import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Terms of Service',
  description: 'Read UCRS terms of service to understand the rules and regulations for using our website and services.',
  url: '/terms',
  noIndex: true,
})

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p>
            Add your terms of service content here. This is a placeholder template that should be
            customized with your actual terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
          <p>
            Describe how users can and cannot use your service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            Explain your intellectual property rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at: info@ucrs.com
          </p>
        </section>
      </div>
    </div>
  )
}
