import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Privacy Policy',
  description: 'Read UCRS privacy policy to understand how we collect, use, and protect your personal information.',
  url: '/privacy',
  noIndex: true,
})

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Add your privacy policy content here. This is a placeholder template that should be
            customized with your actual privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>
            Describe what information you collect from users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>
            Explain how you use the collected information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at: info@ucrs.com
          </p>
        </section>
      </div>
    </div>
  )
}
