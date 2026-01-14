import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import Image from "next/image"

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
              <article className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded overflow-hidden hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_24px_var(--color-accent-glow)] transition-all duration-300">
                {post.titleImage && (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--color-border)]">
                    <Image
                      src={post.titleImage}
                      alt={post.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)] to-transparent opacity-40" />
                  </div>
                )}
                <div className="p-6">
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
