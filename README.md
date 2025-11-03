# UCRS Website - SEO-Optimized Next.js 15 Boilerplate

A modern, SEO-optimized website boilerplate for Upper Canada Railway Services built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

### ✅ SEO Optimized
- **Dynamic robots.txt** generation
- **XML sitemap** with automatic route discovery
- **PWA manifest** for installability
- **Structured data** (JSON-LD schemas) for rich snippets
- **Open Graph** and Twitter Card meta tags
- **Breadcrumbs** with schema markup
- Security headers configured
- Canonical URLs on all pages

### 🚀 Performance
- **Next.js 15** with App Router
- **React 19** with Server Components
- **Turbopack** for fast development and builds
- **Image optimization** (AVIF/WebP formats)
- **Code splitting** and lazy loading
- **React Compiler** enabled

### 🎨 Design System
- **Tailwind CSS** for styling
- **Radix UI** primitives
- **shadcn/ui** component patterns
- **UCRS design system** integrated
- Responsive breakpoints configured

### 📦 Project Structure

```
├── app/
│   ├── (routes)/
│   │   ├── about/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   ├── products/
│   │   │   └── [slug]/
│   │   ├── services/
│   │   │   └── [slug]/
│   │   ├── privacy/
│   │   └── terms/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── manifest.ts
├── components/
│   ├── seo/
│   │   ├── StructuredData.tsx
│   │   └── Breadcrumbs.tsx
│   ├── ui/ (shadcn components)
│   └── (other components)
├── lib/
│   ├── seo.ts (SEO utilities & schema generators)
│   ├── utils.ts
│   └── types/
│       └── seo.ts
└── public/
    └── images/
        ├── og/ (Open Graph images)
        ├── products/
        ├── services/
        └── blog/
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Copy environment variables
cp .env.local.example .env.local
```

### Development

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://ucrs.com
NEXT_PUBLIC_SITE_NAME="UCRS - Railway Parts & Locomotive Services"
```

## SEO Configuration

### Metadata Generation

Use the `generateSEO()` utility in your pages:

```tsx
import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Your Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  url: '/your-page',
  image: '/images/your-page-og.jpg',
})
```

### Structured Data

Add structured data to your pages:

```tsx
import { StructuredData } from '@/components/seo/StructuredData'
import { generateProductSchema } from '@/lib/seo'

const schema = generateProductSchema({
  name: 'Product Name',
  description: 'Product description',
  // ... other fields
})

return (
  <>
    <StructuredData data={schema} />
    {/* Your page content */}
  </>
)
```

### Breadcrumbs

Add breadcrumbs with automatic schema generation:

```tsx
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const breadcrumbItems = [
  { name: 'Products', url: '/products' },
  { name: 'Product Name', url: '/products/slug' },
]

<Breadcrumbs items={breadcrumbItems} />
```

## Dynamic Routes

### Products & Services

Dynamic routes are set up for products and services at:
- `/products/[slug]`
- `/services/[slug]`

Update the mock data in these files with your actual data fetching logic.

### Blog Posts

Blog posts use dynamic routes at `/blog/[slug]` with full article schema support.

## Image Assets

Place images in the appropriate directories under `/public/images/`:

### Required Images for SEO:
- `og-image.jpg` (1200x630px) - Main OG image
- `twitter-image.jpg` (1200x630px) - Twitter card
- `icon-192x192.png` - PWA icon
- `icon-512x512.png` - PWA icon
- `logo.png` - Main logo

See `/public/images/README.md` for detailed image guidelines.

## Implementing Figma Designs

Each page has placeholder content marked with:

```tsx
{/* Add your Figma design implementation here */}
```

Replace these sections with your actual Figma-designed components using:
- Tailwind CSS classes from the design system
- shadcn/ui components
- Custom components as needed

## Styling

### Design System

The UCRS design system is configured in:
- `tailwind.config.js` - Color palette, typography, spacing
- `app/globals.css` - CSS variables, component styles
- `public/DesignSystem.json` - Full design system reference

### Colors

```tsx
// Primary (Red)
className="bg-primary text-primary-foreground"

// Secondary (Blue)
className="bg-secondary text-secondary-foreground"

// Accent (Green)
className="bg-accent text-accent-foreground"
```

## Components

### shadcn/ui Components

Install additional components as needed:

```bash
npx shadcn@latest add [component-name]
```

Available components: button, navigation-menu, popover, skeleton, and more.

## TypeScript Types

SEO-related types are in `lib/types/seo.ts`:
- `Product`
- `Service`
- `BlogPost`
- `FAQ`
- `PageSEO`

## Best Practices

### SEO
1. Always use `generateSEO()` for page metadata
2. Add structured data to all content pages
3. Use descriptive alt text for images
4. Implement breadcrumbs on detail pages
5. Keep meta descriptions under 160 characters
6. Use proper heading hierarchy (H1 → H6)

### Performance
1. Use Next.js Image component for all images
2. Add `priority` prop to above-the-fold images
3. Implement loading states for dynamic content
4. Use dynamic imports for heavy components
5. Keep bundle size minimal

### Accessibility
1. Use semantic HTML
2. Add proper ARIA labels
3. Ensure keyboard navigation works
4. Maintain color contrast ratios
5. Test with screen readers

## Testing

### SEO Testing
- Google Rich Results Test: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- Facebook Sharing Debugger: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug)
- Twitter Card Validator: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

### Performance Testing
- Lighthouse (Chrome DevTools)
- PageSpeed Insights: [pagespeed.web.dev](https://pagespeed.web.dev)

## Tech Stack

- **Framework:** Next.js 15
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Radix UI, shadcn/ui
- **Icons:** Lucide React
- **Build Tool:** Turbopack
- **SEO:** next-sitemap

## Support

For questions or issues, contact: info@ucrs.com
