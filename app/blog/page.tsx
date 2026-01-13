import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"

export const metadata = {
  title: "Blog | Nextron Labs",
  description: "Security research, tool updates, and threat intelligence",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Blog</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">Research, updates, and insights from the lab.</p>
      </header>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="p-6 bg-[var(--color-panel)] border border-[var(--color-border)] rounded hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_24px_var(--color-accent-glow)] transition-all duration-300">
                <time className="text-xs text-[var(--color-text-muted)]">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-[var(--color-text-secondary)] text-sm leading-relaxed">{post.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-[var(--color-background-light)] text-[var(--color-text-muted)] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p className="text-[var(--color-text-muted)] text-center py-12">No posts yet.</p>
        )}
      </div>
    </div>
  )
}
