import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        summary: data.summary || "",
        content,
      }
    })

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    summary: data.summary || "",
    content,
  }
}
