import { notFound } from "next/navigation"
import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { MDXContent } from "@/components/mdx-content"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
    <article className="max-w-3xl mx-auto px-6 py-12">
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

      {/* Content */}
      <div className="prose-custom">
        <MDXContent content={post.content} />
      </div>
    </article>
  )
}
