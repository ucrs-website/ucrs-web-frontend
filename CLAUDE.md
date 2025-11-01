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

### Build & Testing Rules

**IMPORTANT**: When working on bug fixes or refining sections/components:
- **DO NOT** run `pnpm build` or `pnpm dev` automatically after making changes
- Only run builds when:
  1. Explicitly prompted by the user
  2. Preparing to push changes to the remote repository
  3. Installing new packages that require verification
- This saves time and resources during iterative development
- Trust TypeScript and the Next.js compiler to catch errors at build time when needed

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

### Using Video Players

When implementing video players in any section or page:

- **Always use `VideoPlayerBlock`** from `components/ui/video-player-block.tsx`
- This is a reusable component built on Kibo UI VideoPlayer with consistent controls
- Accepts `videoUrl`, `videoPoster`, and `className` props
- Includes play/pause, timeline, volume, and mute controls
- Example usage:
  ```tsx
  import { VideoPlayerBlock } from '@/components/ui/video-player-block'

  <VideoPlayerBlock
    videoUrl="/videos/your-video.mp4"
    videoPoster="/images/your-poster.png"
    className="w-full max-w-[800px]"
  />
  ```

### Using Before/After Image Comparison

When implementing before/after image comparisons:

- **Use Kibo UI Comparison component** - A slider-based component for comparing two items in an overlay
- Installation: `npx kibo-ui add comparison`
- Features:
  - Draggable slider for side-by-side comparison
  - Dual interaction modes (hover and drag)
  - Smooth animations powered by motion.dev
  - Touch and mouse support
  - Responsive design
- Example usage:
  ```tsx
  import { Comparison, ComparisonImage } from '@/components/ui/comparison'

  <Comparison>
    <ComparisonImage src="/before.jpg" alt="Before" />
    <ComparisonImage src="/after.jpg" alt="After" />
  </Comparison>
  ```

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

## Task Planning System

### The `.tasks/` Folder

For complex page or feature development, use the `.tasks/` folder to organize planning documents:

- **Purpose**: Store detailed implementation plans, component breakdowns, and task lists for large features
- **Location**: `.tasks/` folder in the project root (gitignored)
- **Format**: Markdown files with clear naming convention (e.g., `services-page-plan.md`, `checkout-flow-plan.md`)
- **Usage**:
  - Create a plan document before starting complex page development
  - Break down the page into sections and components
  - List all required assets (images, icons, content)
  - Define component hierarchy and data structures
  - Track implementation progress and notes
- **Benefits**: Provides context continuity across sessions, helps organize large tasks, serves as documentation

**Example plan structure**:
```markdown
# Services Page Implementation Plan

## Overview
[Page description and purpose]

## Sections Breakdown
1. Hero Section
   - Component: ServicesHero.tsx
   - Assets: hero-bg.avif
   - Features: [list]

2. Services Grid
   - Component: ServicesGrid.tsx
   - Data: services array
   - Features: [list]

[... more sections]

## Implementation Checklist
- [ ] Create page route
- [ ] Build Hero section
- [ ] Build Services Grid
- [ ] Add SEO metadata
- [ ] Test responsive design
```

## Design-to-Code Workflow

### Creating New Sections - Design-First Approach

**IMPORTANT**: When asked to create a new section or page component for the first time, ALWAYS follow this workflow:

1. **Request Design Assets First** - Before writing any code, ask the user for:
   - Desktop design (screenshot or Figma link)
   - Mobile/responsive design (screenshot or Figma link)
   - Any additional breakpoint designs if needed

2. **Store Design References** - Save all design files to `.tasks/designs/` folder:
   ```
   .tasks/
   ├── designs/
   │   ├── [section-name]-desktop.png      # Desktop design reference
   │   ├── [section-name]-mobile.png       # Mobile design reference
   │   └── [section-name]-tablet.png       # Optional tablet breakpoint
   ├── [feature-name]-plan.md              # Implementation plan
   └── [section-name]-analysis.md          # Design analysis document
   ```

   **Design File Management**:
   - If user provides **screenshot paths**: Copy the screenshots to `.tasks/designs/` with proper naming
   - If user provides **Figma links**: Take screenshots from Figma and save to `.tasks/designs/`
   - Naming convention: `[section-name]-[breakpoint].png` (e.g., `hero-section-desktop.png`)
   - Always store designs in `.tasks/designs/` folder for future reference across sessions

3. **Link in Plan/Analysis Document** - Reference the design files in the corresponding `.md` file:
   ```markdown
   ## Design References
   - Desktop: `.tasks/designs/hero-section-desktop.png`
   - Mobile: `.tasks/designs/hero-section-mobile.png`
   - Figma: [link if provided]
   ```

4. **Analyze Design** - Based on the screenshots/Figma links:
   - Identify layout structure and components
   - Note typography, spacing, colors
   - List required assets (images, icons)
   - Determine responsive behavior
   - Plan component hierarchy
   - Create a design analysis document in `.tasks/[section-name]-analysis.md`

5. **Begin Implementation** - Only after design analysis, start coding the section

**Example Interaction**:
```
User: "Create a new Features section for the home page"

Claude: "I'd be happy to help create the Features section! Before I start, could you please provide:
1. Desktop design (screenshot or Figma link)
2. Mobile/responsive design (screenshot or Figma link)

This will ensure I build the section exactly to your specifications."

User: [provides screenshots or Figma links]

Claude: [Saves screenshots to .tasks/, analyzes design, creates implementation plan, then builds component]
```

**Why This Matters**:
- Ensures pixel-perfect implementation matching design specs
- Prevents rework and unnecessary iterations
- Creates proper documentation for future reference
- Establishes clear requirements before coding begins

---

### Refining Existing Sections - Figma Integration Pattern

When refining or refactoring existing sections based on Figma designs, use this shorthand workflow:

**Input Format:**
```
<localhost_url>
<figma_design_url_desktop> (optional)
<figma_design_url_mobile> (optional)
```

**Example:**
```
http://localhost:3000/about
https://www.figma.com/design/2yCCBG4VgUhlw1WsmYsQom/UCRS---Website-Design?node-id=2260-99552&t=LuQ7brd7AtgIcf2W-4
https://www.figma.com/design/2yCCBG4VgUhlw1WsmYsQom/UCRS---Website-Design?node-id=2260-100762&t=LuQ7brd7AtgIcf2W-4
```

**Behavior:**
- **With 1 Figma link**: Identify if it's desktop or mobile design and refine the section accordingly
- **With 2 Figma links**: First link is desktop design, second is mobile design - refine for both responsive breakpoints
- **Process**:
  1. Extract node-id from Figma URL
  2. Use Figma MCP tools to fetch design specs
  3. Compare with current implementation at localhost route
  4. Identify discrepancies in:
     - Layout and spacing
     - Typography and colors
     - Responsive behavior
     - Interactive states
  5. Refactor component to match design
  6. Verify build success
  7. Commit changes with descriptive message

**Usage Notes:**
- This pattern is for refinement of existing sections, not creating new ones
- Always maintain existing component architecture and patterns
- Preserve accessibility features and SEO optimization
- Test responsive behavior on both breakpoints
- Update only the visual presentation, not the data structure
