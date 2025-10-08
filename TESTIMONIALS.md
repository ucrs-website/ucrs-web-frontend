# Testimonials Guide

## Overview

The `TestimonialSection` component displays a carousel of customer testimonials with a two-column layout:
- **Left side**: Customer quote with navigation arrows
- **Right side**: Background image with overlay card showing company info and rating

## Adding/Editing Testimonials

### 1. Update the testimonials array in `app/page.tsx`

```tsx
const testimonials = [
  {
    quote: "Your customer's testimonial quote here...",
    author: {
      name: "Customer Name",
      role: "Job Title"
    },
    company: {
      name: "Company Name",
      location: "Country, City" // e.g., "USA, New York"
    },
    image: "/path-to-image.avif", // Background image path
    rating: 5 // Optional: 1-5 stars
  },
  // Add more testimonials here...
]
```

### 2. Replace Background Images

The current testimonial uses `/testimonial-factory.avif` for all slides. To add unique images:

1. Place your images in the `public/` folder
2. Convert to WebP/AVIF for optimization:
   ```bash
   node -e "
   const sharp = require('sharp');
   sharp('./public/your-image.jpg')
     .avif({ quality: 80 })
     .toFile('./public/your-image.avif');
   "
   ```
3. Update the `image` field in your testimonial object

### 3. Responsive Behavior

- **Desktop (lg and up)**: Two-column layout, quote on left, image on right
- **Mobile**: Stacked layout, quote on top, image below

### 4. Carousel Controls

- Navigation arrows appear on the left side below the author info
- Carousel automatically loops
- Both the quote and image sync together when navigating

### 5. TypeScript Interface

```tsx
export interface Testimonial {
  quote: string
  author: {
    name: string
    role: string
  }
  company: {
    name: string
    location: string
  }
  image: string
  rating?: number // Optional
}
```

## Component Location

- Component: `components/sections/TestimonialSection.tsx`
- Usage: `app/page.tsx`

## Dependencies

- `embla-carousel-react`: For carousel functionality
- `next/image`: For optimized image loading
- `lucide-react`: For icons (ChevronLeft, ChevronRight, Star)

## Example

```tsx
<TestimonialSection testimonials={testimonials} />
```
