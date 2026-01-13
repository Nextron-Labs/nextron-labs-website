import type React from "react"
import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm",
})

export const metadata: Metadata = {
  title: "Nextron Labs",
  description: "Open source security tools and research",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0c1212",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ibmPlexMono.variable} font-mono antialiased`}>
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage:
              "url('/images/cyb3rops-logo-rule-generator-illustration-ai-support-grey-and-g-f0c00206-996e-42b8-afc2-c32a9d944dcc.png')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 min-h-screen flex flex-col bg-[var(--color-background-deep)]/90">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
