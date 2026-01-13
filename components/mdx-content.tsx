import ReactMarkdown from "react-markdown"

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-10 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-8 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-medium text-[var(--color-text-primary)] mt-6 mb-2">{children}</h3>
        ),
        p: ({ children }) => <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-[var(--color-text-secondary)] mb-4 space-y-1 ml-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-[var(--color-text-secondary)] mb-4 space-y-1 ml-4">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-[var(--color-accent)] hover:underline"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[var(--color-accent)]/50 pl-4 my-4 text-[var(--color-text-muted)] italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-")
          if (isBlock) {
            return (
              <pre className="bg-[var(--color-background-deep)] border border-[var(--color-border)] rounded p-4 overflow-x-auto my-4">
                <code className="text-sm font-mono text-[var(--color-text-primary)]">{children}</code>
              </pre>
            )
          }
          return (
            <code className="bg-[var(--color-background-light)] text-[var(--color-accent)] px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          )
        },
        pre: ({ children }) => <>{children}</>,
        strong: ({ children }) => (
          <strong className="font-semibold text-[var(--color-text-primary)]">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="border-[var(--color-border)] my-8" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
