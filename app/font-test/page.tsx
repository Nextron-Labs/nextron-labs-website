import Link from "next/link"

export default function FontTestPage() {
  const options = [
    {
      id: "a",
      name: "JetBrains Mono",
      description: "Popular programming font with excellent readability and ligatures",
    },
    {
      id: "b",
      name: "IBM Plex Mono",
      description: "Clean, technical aesthetic from IBM's open-source type family",
    },
    {
      id: "c",
      name: "Space Mono",
      description: "Fixed-width typeface with a retro-futuristic, geometric feel",
    },
    {
      id: "d",
      name: "Fira Code",
      description: "Monospaced font with programming ligatures, based on Fira Mono",
    },
  ]

  return (
    <main className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">Font Comparison</h1>
        <p className="text-muted-foreground mb-12">
          Click each option to see how the site looks with that font applied.
        </p>

        <div className="grid gap-6">
          {options.map((option) => (
            <Link
              key={option.id}
              href={`/font-test/${option.id}`}
              className="block p-6 border border-border rounded-lg bg-card hover:border-accent transition-colors group"
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-sm font-mono text-accent">Option {option.id.toUpperCase()}</span>
                <h2 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  {option.name}
                </h2>
              </div>
              <p className="text-muted-foreground">{option.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
