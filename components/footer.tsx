import Link from "next/link"

const footerLinks = [
  { href: "/imprint", label: "Imprint" },
  { href: "/privacy", label: "Privacy" },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background-deep)]">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <p className="text-[var(--color-text-muted)] text-sm">© {new Date().getFullYear()} Nextron Labs</p>
        <ul className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
