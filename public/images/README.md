# Image Assets

This directory contains all image assets for the UCRS website.

## Required Images for SEO

### Open Graph & Social Media Images
- `og-image.jpg` - 1200x630px - Main OG image for homepage and default pages
- `twitter-image.jpg` - 1200x630px - Twitter card image
- `icon-192x192.png` - 192x192px - PWA icon (maskable)
- `icon-512x512.png` - 512x512px - PWA icon (maskable)
- `favicon.ico` - Standard favicon

### Logo Files
- `logo.png` - Main UCRS logo (transparent background)
- `logo-white.png` - White version for dark backgrounds (if needed)

### Product Images
Place product images in `/images/products/`
- Recommended size: 1200x800px (3:2 aspect ratio)
- Format: WebP or AVIF (Next.js will auto-convert)
- Naming: Use product slug (e.g., `locomotive-parts.jpg`)

### Service Images
Place service images in `/images/services/`
- Recommended size: 1200x800px (3:2 aspect ratio)
- Format: WebP or AVIF
- Naming: Use service slug (e.g., `maintenance.jpg`)

### Blog Images
Place blog post images in `/images/blog/`
- Recommended size: 1200x630px (OG ratio)
- Format: WebP or AVIF
- Naming: Use post slug (e.g., `railway-maintenance-tips.jpg`)

## Image Optimization Best Practices

1. Always provide descriptive alt text
2. Use Next.js Image component for automatic optimization
3. Specify proper width/height to avoid layout shift
4. Use priority prop for above-the-fold images
5. Implement lazy loading for below-the-fold images

## Aspect Ratios from Design System

- Hero: 16:9
- Card: 4:3
- Thumbnail: 1:1
- Banner: 21:9

## Example Usage

\`\`\`tsx
import Image from 'next/image'

<Image
  src="/images/products/locomotive-parts.jpg"
  alt="High-quality locomotive parts"
  width={1200}
  height={800}
  className="rounded-lg"
  priority // Only for above-the-fold images
/>
\`\`\`
