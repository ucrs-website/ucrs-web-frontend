import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'UCRS - Railway Parts & Locomotive Services',
    short_name: 'UCRS',
    description: 'Leading provider of railway parts, locomotive maintenance, and railway services. Quality parts for all railway systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#E53E3E',
    icons: [],
    categories: ['business', 'industrial', 'railway', 'transportation'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}
