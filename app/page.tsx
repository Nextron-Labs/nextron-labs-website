import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-6 relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src="/images/cyb3rops-logo-rule-generator-illustration-ai-support-grey-and-g-f0c00206-996e-42b8-afc2-c32a9d944dcc.png"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/70 to-[var(--color-bg)]/50" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-text-primary)] tracking-tight">
              Nextron Labs
            </h1>
            <p className="text-[var(--color-text-secondary)] text-xl leading-relaxed max-w-md mx-auto">
              Open source security tools and research.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            <Link
              href="/projects"
              className="px-6 py-2.5 bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded hover:border-[var(--color-accent)] hover:shadow-[0_0_16px_var(--color-accent-glow)] transition-all duration-200 text-sm font-medium"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 text-sm font-medium"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </div>

      <section className="relative z-10 bg-[var(--color-bg)] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">About</h2>
              <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
                <p>
                  <span className="text-[var(--color-accent)] font-medium">Nextron Labs</span> is the workspace of the
                  Nextron Research team.
                </p>
                <p>
                  This is where we share tools, scripts, helpers, prototypes, and ideas that grow out of our day-to-day
                  work with Nextron products. Some of these projects are small, some are rough around the edges, most
                  are open source, and all of them are meant to be useful.
                </p>
                <p>
                  You'll find things that help with deploying our tools, processing and visualizing their output,
                  merging reports, handling logs, or supporting forensic and incident response workflows. Sometimes it's
                  a standalone tool, sometimes just a script or a guide that solves a very specific problem we ran into
                  ourselves.
                </p>
                <p>
                  These are not commercial products and they don't go through the same release and QA process as our
                  main offerings. The goal here is speed, practicality, and sharing: publish early, get feedback,
                  improve things together, and make defensive work a bit easier.
                </p>
              </div>
            </div>

            {/* Artwork */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[var(--color-border)] shadow-[0_0_32px_var(--color-accent-glow)]">
                <Image src="/images/guardian-robot.png" alt="Nextron Labs Guardian" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
