import { JetBrains_Mono, IBM_Plex_Mono, Space_Mono, Fira_Code } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-test" })
const ibmPlexMono = IBM_Plex_Mono({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-test" })
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-test" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-test" })

const fontOptions: Record<string, { font: { variable: string }; name: string }> = {
  a: { font: jetbrainsMono, name: "JetBrains Mono" },
  b: { font: ibmPlexMono, name: "IBM Plex Mono" },
  c: { font: spaceMono, name: "Space Mono" },
  d: { font: firaCode, name: "Fira Code" },
}

export default async function FontTestOptionPage({ params }: { params: Promise<{ option: string }> }) {
  const { option } = await params
  const selected = fontOptions[option]

  if (!selected) {
    notFound()
  }

  return (
    <div className={`${selected.font.variable} min-h-screen bg-background`} style={{ fontFamily: "var(--font-test)" }}>
      {/* Sticky font selector bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Viewing:</span>
            <span className="text-accent font-semibold">{selected.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {Object.entries(fontOptions).map(([key, { name }]) => (
              <Link
                key={key}
                href={`/font-test/${key}`}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  key === option
                    ? "bg-accent text-background font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                {key.toUpperCase()}
              </Link>
            ))}
            <Link
              href="/"
              className="ml-4 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* Sample content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cyb3rops-logo-rule-generator-illustration-ai-support-grey-and-g-f0c00206-996e-42b8-afc2-c32a9d944dcc.png"
              alt="Background"
              fill
              className="object-cover object-center opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </div>

          <div className="relative z-10 text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tight">Nextron Labs</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Tools, scripts, and research from the Nextron security team
            </p>
          </div>
        </section>

        {/* About Section Sample */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">About</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <span className="text-accent font-medium">Nextron Labs</span> is the workspace of the Nextron
                    Research team.
                  </p>
                  <p>
                    This is where we share tools, scripts, helpers, prototypes, and ideas that grow out of our
                    day-to-day work with Nextron products. Some of these projects are small, some are rough around the
                    edges, most are open source, and all of them are meant to be useful.
                  </p>
                  <p>
                    {
                      "You'll find things that help with deploying our tools, processing and visualizing their output, merging reports, handling logs, or supporting forensic and incident response workflows."
                    }
                  </p>
                </div>
              </div>
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <div className="absolute inset-0 bg-accent/10 rounded-lg blur-2xl" />
                <Image src="/images/guardian-robot.png" alt="Guardian" fill className="object-contain relative z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Typography Samples */}
        <section className="py-24 px-6 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12">Typography Samples</h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-sm text-accent mb-4 uppercase tracking-wider">Headings</h3>
                <div className="space-y-4">
                  <p className="text-5xl font-bold text-foreground">Heading 1 - Security Research</p>
                  <p className="text-4xl font-bold text-foreground">Heading 2 - Threat Detection</p>
                  <p className="text-3xl font-semibold text-foreground">Heading 3 - YARA Rules</p>
                  <p className="text-2xl font-semibold text-foreground">Heading 4 - Sigma Patterns</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-accent mb-4 uppercase tracking-wider">Body Text</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  THOR is a portable scanner that can be deployed to endpoints for compromise assessment. It uses YARA
                  and Sigma rules to detect indicators of compromise, anomalies, and suspicious behavior patterns across
                  filesystems, processes, and logs.
                </p>
              </div>

              <div>
                <h3 className="text-sm text-accent mb-4 uppercase tracking-wider">Code Sample</h3>
                <pre className="bg-background p-6 rounded-lg border border-border overflow-x-auto">
                  <code className="text-sm text-foreground">{`rule APT_Malware_Generic {
    meta:
        description = "Detects generic APT malware patterns"
        author = "Nextron Labs"
        date = "2025-01-13"
    strings:
        $s1 = "CreateRemoteThread" ascii
        $s2 = "VirtualAllocEx" ascii
    condition:
        uint16(0) == 0x5A4D and all of them
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm text-accent mb-4 uppercase tracking-wider">UI Elements</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-2.5 bg-accent text-background font-medium rounded hover:bg-accent/90 transition-colors">
                    Primary Button
                  </button>
                  <button className="px-6 py-2.5 border border-border text-foreground font-medium rounded hover:border-accent hover:text-accent transition-colors">
                    Secondary Button
                  </button>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20">
                    Tag Label
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
