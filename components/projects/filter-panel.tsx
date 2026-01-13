"use client"

import { Search, X } from "lucide-react"

interface FilterPanelProps {
  search: string
  onSearchChange: (value: string) => void
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  statuses: string[]
  selectedStatus: string | null
  onStatusChange: (status: string | null) => void
}

export function FilterPanel({
  search,
  onSearchChange,
  tags,
  selectedTags,
  onTagToggle,
  statuses,
  selectedStatus,
  onStatusChange,
}: FilterPanelProps) {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[var(--color-background-light)] border border-[var(--color-border)] rounded pl-9 pr-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Status filter */}
      <div className="space-y-2">
        <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Status</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onStatusChange(null)}
            className={`text-xs px-2.5 py-1 rounded border transition-colors ${
              selectedStatus === null
                ? "bg-[var(--color-accent)]/20 border-[var(--color-accent)]/50 text-[var(--color-accent)]"
                : "bg-[var(--color-background-light)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/30"
            }`}
          >
            All
          </button>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(selectedStatus === status ? null : status)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors capitalize ${
                selectedStatus === status
                  ? "bg-[var(--color-accent)]/20 border-[var(--color-accent)]/50 text-[var(--color-accent)]"
                  : "bg-[var(--color-background-light)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/30"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tag filter */}
      <div className="space-y-2">
        <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Tags</label>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-[var(--color-accent)]/20 border-[var(--color-accent)]/50 text-[var(--color-accent)]"
                  : "bg-[var(--color-background-light)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {(selectedTags.length > 0 || selectedStatus || search) && (
        <button
          onClick={() => {
            onSearchChange("")
            onStatusChange(null)
            selectedTags.forEach((tag) => onTagToggle(tag))
          }}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          Clear all filters
        </button>
      )}
    </aside>
  )
}
