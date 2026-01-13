import Link from "next/link"
import { Logo } from "./logo"

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
]

export function Navbar() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background-deep)]/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <Logo />
        </Link>

        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
