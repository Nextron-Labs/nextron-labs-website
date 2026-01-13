import { Github, Download, FileText } from "lucide-react"
import Image from "next/image"

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  status: "active" | "maintenance" | "development" | "archived"
  github?: string
  docs?: string
  download?: string
  screenshot?: string // Added optional screenshot field
}

interface ProjectCardProps {
  project: Project
}

const statusColors = {
  active: "bg-[var(--color-accent)]/20 text-[var(--color-accent)]",
  maintenance: "bg-amber-500/20 text-amber-400",
  development: "bg-blue-500/20 text-blue-400",
  archived: "bg-[var(--color-text-muted)]/20 text-[var(--color-text-muted)]",
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-[var(--color-panel)] border border-[var(--color-border)] rounded overflow-hidden hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_24px_var(--color-accent-glow)] transition-all duration-300">
      {project.screenshot && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--color-border)]">
          <Image
            src={project.screenshot || "/placeholder.svg"}
            alt={`${project.name} screenshot`}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)] to-transparent opacity-40" />
        </div>
      )}

      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[var(--color-text-primary)] font-medium">{project.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded ${statusColors[project.status]}`}>{project.status}</span>
        </div>

        {/* Description */}
        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-[var(--color-background-light)] text-[var(--color-text-muted)] rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
          {project.docs && (
            <a
              href={project.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Docs
            </a>
          )}
          {project.download && (
            <a
              href={project.download}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
