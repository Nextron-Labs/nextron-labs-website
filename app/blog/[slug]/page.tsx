import { notFound } from "next/navigation"
import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { MDXContent } from "@/components/mdx-content"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  return {
    title: `${post.title} | Nextron Labs`,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      {/* Title Image Header */}
      {post.titleImage ? (
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
          <Image
            src={post.titleImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay with alpha for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          
          {/* Content over image */}
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="max-w-3xl mx-auto px-6 pb-12 w-full">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to blog
              </Link>

              {/* Header */}
              <header>
                <time className="text-sm text-white/80">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-white leading-tight">{post.title}</h1>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white rounded border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-6 pt-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <time className="text-sm text-[var(--color-text-muted)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)] leading-tight">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-[var(--color-background-light)] text-[var(--color-text-muted)] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </div>
      )}

      {/* Content */}
      <div className={`prose-custom ${post.titleImage ? 'max-w-3xl mx-auto px-6 py-12' : ''}`}>
        <MDXContent content={post.content} />
      </div>
    </article>
  )
}
