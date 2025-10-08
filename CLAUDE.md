# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build with Turbopack
pnpm build

# Start production server
pnpm start

# Install dependencies
pnpm install
```

## Architecture Overview

This is a **Next.js 15 App Router** website for Upper Canada Railway Services (UCRS) with **SEO optimization** as a core feature. The project uses **React 19**, **TypeScript**, **Tailwind CSS**, and **Turbopack** for fast builds.

### Key Architectural Patterns

#### 1. SEO-First Architecture
The entire codebase is structured around SEO optimization:

- **Centralized SEO utilities** in `lib/seo.ts`:
  - `generateSEO()` function creates consistent metadata across all pages
  - Schema generators for Organization, Product, Service, Article, FAQ, and Breadcrumbs
  - `siteConfig` object contains all site-wide SEO configuration

- **SEO components** in `components/seo/`:
  - `StructuredData.tsx` - Renders JSON-LD schema markup
  - `Breadcrumbs.tsx` - Generates breadcrumbs with automatic schema

- **Metadata generation pattern**: Every page uses `generateSEO()`:
  ```tsx
  export const metadata = generateSEO({
    title: 'Page Title',
    description: 'Description',
    url: '/page-url',
    keywords: ['keyword1', 'keyword2'],
  })
  ```

#### 2. App Router Structure
The app uses Next.js 15 App Router with grouped routes:

```
app/
├── (routes)/          # Route groups for pages
│   ├── about/
│   ├── blog/[slug]/   # Dynamic blog posts
│   ├── products/[slug]/  # Dynamic product pages
│   ├── services/[slug]/  # Dynamic service pages
│   ├── contact/
│   ├── privacy/
│   └── terms/
├── layout.tsx         # Root layout with JSON-LD schemas
├── page.tsx           # Home page
├── robots.ts          # Dynamic robots.txt generation
├── sitemap.ts         # Dynamic sitemap generation
└── manifest.ts        # PWA manifest
```

**Important**: Dynamic routes (`[slug]`) currently use mock data. When implementing real data fetching, update:
- The page components in `app/products/[slug]/page.tsx` and `app/services/[slug]/page.tsx`
- The sitemap generator in `app/sitemap.ts` (see TODO comments)
- The `next-sitemap.config.js` file for additional paths

#### 3. Component Organization

- **`components/sections/`**: Page sections (Hero, Features, FAQ, Newsletter, etc.)
- **`components/ui/`**: shadcn/ui components (Button, Accordion, Tabs, etc.)
- **`components/navbar-components/`**: Header/navigation components
- **`components/seo/`**: SEO-specific components
- **Root components**: Header, Navigation, Footer

#### 4. Design System Integration

The UCRS design system is configured via CSS variables in `app/globals.css` and extended in `tailwind.config.js`:

- **Colors**: Primary (Red), Secondary (Blue), Accent (Green/Orange)
  - Use HSL-based CSS variables: `hsl(var(--primary))`
  - Full color scales (50-900) available for each

- **Typography**: Uses Manrope font (loaded in layout.tsx)
  - Font families: `font-primary`, `font-heading`, `font-mono`
  - Configured font sizes, weights, and line heights via CSS variables

- **Spacing**: Custom spacing scale via CSS variables
- **Reference**: Full design system spec in `public/DesignSystem.json`

#### 5. Styling Patterns

Use the `cn()` utility from `lib/utils.ts` for conditional className merging:
```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes"
)} />
```

#### 6. Image Optimization

Next.js Image component is configured in `next.config.ts`:
- Formats: AVIF → WebP fallback
- Custom device sizes and image sizes for responsive images
- Use `priority` prop for above-the-fold images

#### 7. Security Headers

Configured in `next.config.ts`:
- Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options
- X-XSS-Protection, Referrer-Policy, Permissions-Policy
- `poweredByHeader: false` to hide Next.js signature

### Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://ucrs.com
NEXT_PUBLIC_SITE_NAME="UCRS - Railway Parts & Locomotive Services"
```

These are used throughout `lib/seo.ts` for canonical URLs and metadata.

## Important Patterns & Conventions

### Adding New Pages

1. Create page in appropriate route group under `app/(routes)/`
2. Generate metadata using `generateSEO()` from `lib/seo.ts`
3. Add structured data using schema generators and `<StructuredData />` component
4. Add breadcrumbs if it's a detail/nested page using `<Breadcrumbs />`
5. Update `app/sitemap.ts` to include the new route
6. Update navigation in `components/Navigation.tsx` if needed

### Adding Dynamic Routes

When adding data fetching for products/services/blog:

1. Replace mock data in `app/[route]/[slug]/page.tsx`
2. Implement `generateStaticParams()` for static generation
3. Update `app/sitemap.ts` to include dynamic routes (see TODO comments)
4. Update `next-sitemap.config.js` if using next-sitemap package

### Adding shadcn/ui Components

```bash
pnpx shadcn@latest add [component-name]
```

Components are added to `components/ui/` and use the design system tokens from `tailwind.config.js`.

#### Component Libraries (Priority Order)

When creating new sections and components, use these shadcn-based libraries in the following priority order:

1. **OriginUI** (Highest Priority) - https://originui.com/
   - Primary source for section components and UI patterns

2. **Kibo UI** - https://www.kibo-ui.com/components
   - Secondary option for components not found in OriginUI

3. **ReUI** - https://reui.io/
   - Tertiary option for specialized components

4. **Skiper UI** (Lowest Priority) - https://skiper-ui.com/components
   - Fallback option for unique component requirements

**Usage Pattern**: Always check libraries in order (1→2→3→4) when building new sections. If a suitable component exists in a higher-priority library, use that instead of lower-priority options.

### Working with Structured Data

Always add appropriate schema markup to content pages:

- **Organization**: Already in `app/layout.tsx`
- **Products**: Use `generateProductSchema()` from `lib/seo.ts`
- **Services**: Use `generateServiceSchema()`
- **Blog posts**: Use `generateArticleSchema()`
- **FAQ**: Use `generateFAQSchema()`
- **Breadcrumbs**: Use `generateBreadcrumbSchema()` or `<Breadcrumbs />` component

Render schemas using:
```tsx
<StructuredData data={schema} />
```

## Build Configuration

- **React Compiler**: Enabled in `next.config.ts` for automatic optimizations
- **Turbopack**: Used in both dev and build for faster compilation
- **Compression**: Enabled for production builds
- **Source maps**: Disabled in production (`productionBrowserSourceMaps: false`)
- **Trailing slashes**: Disabled

## TypeScript Types

SEO-related types are in `lib/types/seo.ts`:
- `Product`, `Service`, `BlogPost`, `FAQ`, `PageSEO`

Use these types when implementing real data fetching.
