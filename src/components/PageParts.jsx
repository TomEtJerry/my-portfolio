// Building blocks shared by the inner pages (project pages, full experience page)

const YEAR = new Date().getFullYear()

// Small orange label with a dash, above each section title
export function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-3 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-accent md:text-sm">
      <span aria-hidden="true" className="h-[2px] w-8 bg-accent" />
      {children}
    </p>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`mt-4 max-w-3xl font-display lg:max-w-5xl text-3xl font-bold leading-tight tracking-tight md:mt-5 md:text-5xl ${className}`}
    >
      {children}
    </h2>
  )
}

export const Lead = ({ children }) => (
  <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/70 md:mt-6 md:text-lg lg:max-w-4xl">{children}</p>
)

// Dark band at the bottom of the page: a big link (next project, contact…) and the footer
export function EndBand({ href, label, title }) {
  return (
    <section className="mt-10 bg-ink text-paper">
      <a
        href={href}
        className="group mx-auto flex max-w-page items-center justify-between gap-8 px-5 py-14 md:px-12 md:py-24"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-light md:text-sm">{label}</p>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-accent-light md:text-6xl">
            {title}
          </p>
        </div>
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-2xl transition-transform duration-300 group-hover:translate-x-2 md:size-20 md:text-3xl">
          →
        </span>
      </a>
      <footer className="mx-auto flex max-w-page items-center justify-between gap-4 border-t border-paper/10 px-5 py-6 text-sm text-paper/50 md:px-12">
        <span>© {YEAR} Tom Santoni</span>
        <a href="#" className="transition-colors hover:text-accent-light">
          Back to top ↑
        </a>
      </footer>
    </section>
  )
}
