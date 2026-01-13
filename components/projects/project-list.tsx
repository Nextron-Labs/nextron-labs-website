"use client"

import { useState, useMemo } from "react"
import { ProjectCard, type Project } from "./project-card"
import { FilterPanel } from "./filter-panel"
import { ChevronDown } from "lucide-react"

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Extract unique tags and statuses
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [projects])

  const allStatuses = useMemo(() => {
    const statuses = new Set<string>()
    projects.forEach((p) => statuses.add(p.status))
    return Array.from(statuses)
  }, [projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesSearch =
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.tags.some((t) => t.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      // Status filter
      if (selectedStatus && project.status !== selectedStatus) {
        return false
      }

      // Tag filter (AND logic)
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((tag) => project.tags.includes(tag))
        if (!hasAllTags) return false
      }

      return true
    })
  }, [projects, search, selectedTags, selectedStatus])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          Filters
          {(selectedTags.length > 0 || selectedStatus || search) && (
            <span className="text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-1.5 py-0.5 rounded">
              {selectedTags.length + (selectedStatus ? 1 : 0) + (search ? 1 : 0)}
            </span>
          )}
        </button>

        {filtersOpen && (
          <div className="mt-4 p-4 bg-[var(--color-panel)] border border-[var(--color-border)] rounded">
            <FilterPanel
              search={search}
              onSearchChange={setSearch}
              tags={allTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              statuses={allStatuses}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>
        )}
      </div>

      {/* Desktop filter panel */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <FilterPanel
            search={search}
            onSearchChange={setSearch}
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            statuses={allStatuses}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>
      </div>

      {/* Project grid */}
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </p>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">No projects match your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
