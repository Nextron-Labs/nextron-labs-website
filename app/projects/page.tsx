import { ProjectList } from "@/components/projects/project-list"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import projectsData from "@/data/projects.json"

export const metadata = {
  title: "Projects | Nextron Labs",
  description: "Open source security tools and research projects",
}

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Projects</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Open source tools for threat detection and security research.
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-8">
        <ProjectList projects={projectsData} />

        {/* Blog sidebar - desktop only */}
        <div className="hidden lg:block">
          <BlogSidebar />
        </div>
      </div>
    </div>
  )
}
