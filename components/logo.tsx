import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Image
          src="/images/nextron-logo.png"
          alt="Nextron Labs"
          width={26}
          height={26}
          className="drop-shadow-[0_0_12px_var(--color-accent-glow)]"
        />
        {/* Glow effect behind the logo */}
        <div className="absolute inset-0 blur-lg bg-[var(--color-accent)] opacity-30 rounded" />
      </div>
      <span className="text-lg font-semibold text-[var(--color-text-primary)] tracking-tight">Nextron Labs</span>
    </div>
  )
}
