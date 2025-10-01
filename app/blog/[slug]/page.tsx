import { notFound } from 'next/navigation'
import { generateSEO, generateArticleSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { BlogPost } from '@/lib/types/seo'

// This would come from your database/CMS
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // TODO: Replace with actual data fetching
  // Example:
  // const post = await db.blogPost.findUnique({ where: { slug } })
  // return post

  // Mock data for demonstration
  const posts: Record<string, BlogPost> = {
    'railway-maintenance-tips': {
      id: '1',
      title: 'Essential Railway Maintenance Tips',
      slug: 'railway-maintenance-tips',
      description: 'Learn the best practices for maintaining your railway systems and ensuring optimal performance.',
      content: 'Content goes here...',
      image: '/images/blog/maintenance-tips.jpg',
      publishedAt: new Date().toISOString(),
      author: {
        name: 'UCRS Team',
        image: '/images/authors/ucrs-team.jpg',
      },
      category: 'Maintenance',
      tags: ['maintenance', 'tips', 'railway'],
      readingTime: 5,
    },
  }

  return posts[slug] || null
}

// Generate static params for all blog posts (for static generation)
export async function generateStaticParams() {
  // TODO: Fetch all blog post slugs from your database
  // const posts = await db.blogPost.findMany({ select: { slug: true } })
  // return posts.map((post) => ({ slug: post.slug }))

  return [
    { slug: 'railway-maintenance-tips' },
  ]
}

// Generate metadata for each blog post page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return generateSEO({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      noIndex: true,
    })
  }

  return generateSEO({
    title: post.title,
    description: post.description,
    keywords: [
      ...(post.tags || []),
      'railway blog',
      'locomotive articles',
      post.category?.toLowerCase() || '',
    ],
    image: post.image,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author.name,
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    image: post.image,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author.name,
    url: `/blog/${post.slug}`,
  })

  const breadcrumbItems = [
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]

  return (
    <>
      <StructuredData data={articleSchema} />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.readingTime && <span>{post.readingTime} min read</span>}
            <span>By {post.author.name}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Add your Figma design implementation here */}
          <div className="bg-muted rounded-lg p-8 mb-8">
            <p className="text-muted-foreground">Blog post content based on Figma design</p>
          </div>
        </div>
      </article>
    </>
  )
}
