import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"

export async function BlogSidebar() {
  const posts = await getBlogPosts()
  const latestPosts = posts.slice(0, 4)

  return (
    <aside className="sticky top-24">
      <h3 className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Latest Posts</h3>
      <div className="space-y-3">
        {latestPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article className="p-3 bg-[var(--color-panel)] border border-[var(--color-border)] rounded hover:border-[var(--color-accent)]/30 transition-colors">
              <h4 className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                {post.title}
              </h4>
              <time className="text-xs text-[var(--color-text-muted)] mt-1 block">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </article>
          </Link>
        ))}
      </div>
      <Link
        href="/blog"
        className="block mt-4 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        View all posts →
      </Link>
    </aside>
  )
}
