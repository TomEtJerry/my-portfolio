import { useEffect, useRef } from 'react'
import Logo from '../components/Logo'
import ResponsiveImage from '../components/ResponsiveImage'
import Visual from '../components/Visual'
import { projects } from '../data/projects'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

const YEAR = new Date().getFullYear()

// Small uppercase label shown above each section title
function Eyebrow({ children }) {
  return (
    <p className="reveal text-xs font-medium uppercase tracking-[0.2em] text-accent">{children}</p>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="reveal mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
      {children}
    </h2>
  )
}

function ProjectPage({ project }) {
  const page = useRef(null)
  const study = project.caseStudy

  // Next project that has its own page (loops back to the first one)
  const withPage = projects.filter((p) => p.caseStudy && !p.caseStudy.draft)
  const next = withPage[(withPage.indexOf(project) + 1) % withPage.length]
  const hasNext = next && next !== project

  useEffect(() => {
    document.title = `${project.title} — Tom Santoni`
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [project.title])

  // Each section's content fades up as a whole when the section comes into view
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-reveal]').forEach((section) => {
          gsap.from(section.querySelectorAll('.reveal'), {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', once: true },
          })
        })
      })
    },
    { scope: page },
  )

  return (
    <>
      <Logo href="/" />

      {/* Back link (top right, where the navbar sits on the home page) */}
      <a
        href="/#projects"
        className="fixed right-[var(--page-offset)] top-[var(--safe-top)] z-50 m-5 rounded-full bg-paper/80 px-4 py-2 font-display text-base font-bold tracking-tight text-ink/60 backdrop-blur-md transition-colors hover:text-accent md:m-12 md:text-xl"
      >
        ← All projects
      </a>

      <main ref={page} className="mx-auto max-w-page px-5 pb-10 font-sans md:px-12">
        {/* Header */}
        <header data-reveal className="pt-[calc(8rem+var(--safe-top))] md:pt-48">
          <p className="reveal text-xs font-medium uppercase tracking-[0.2em] text-accent md:text-sm">
            {project.category}
          </p>
          <h1 className="reveal mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl xl:text-8xl">
            {project.title}
          </h1>
          <p className="reveal mt-8 max-w-3xl text-lg text-ink/70 md:text-2xl md:leading-snug">
            {study.intro}
          </p>

          <dl className="reveal mt-12 grid grid-cols-2 gap-6 border-t border-ink/10 pt-6 md:mt-16 md:grid-cols-4">
            {study.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">{item.label}</dt>
                <dd className="mt-2 font-display text-lg font-medium md:text-xl">{item.value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">Year</dt>
              <dd className="mt-2 font-display text-lg font-medium md:text-xl">{project.year}</dd>
            </div>
          </dl>

          <div className="reveal mt-12 aspect-[4/3] overflow-hidden rounded-2xl bg-sand md:mt-16 md:aspect-[16/9] md:rounded-3xl">
            <ResponsiveImage image={project.image} alt={project.title} priority className="size-full object-cover object-left-top" />
          </div>
        </header>

        {/* Context + goals */}
        <section data-reveal className="mt-24 grid gap-10 md:mt-40 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>The context</Eyebrow>
            <SectionTitle>{study.context.title}</SectionTitle>
          </div>
          <div className="lg:col-span-6">
            <p className="reveal text-base text-ink/70 md:text-lg">{study.context.text}</p>
            <h3 className="reveal mt-10 text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
              Project goals
            </h3>
            <ol className="reveal mt-4 border-t border-ink/10">
              {study.context.goals.map((goal, i) => (
                <li key={goal} className="flex gap-5 border-b border-ink/10 py-4">
                  <span className="font-display text-sm tabular-nums text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display font-medium md:text-lg">{goal}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Approach */}
        <section data-reveal className="mt-24 md:mt-40">
          <Eyebrow>The approach</Eyebrow>
          <SectionTitle>{study.approach.title}</SectionTitle>
          <div className="reveal mt-10 grid gap-x-16 md:mt-16 md:grid-cols-2">
            {study.approach.steps.map((step, i) => (
              <div key={step.title} className="border-t border-ink/10 py-8">
                <span className="font-display text-sm tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-ink/70 md:text-lg">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Desktop visuals */}
        <section data-reveal className="mt-24 md:mt-40">
          <Eyebrow>The desktop experience</Eyebrow>
          <SectionTitle>{study.desktop.title}</SectionTitle>
          <p className="reveal mt-6 max-w-2xl text-ink/70 md:text-lg">{study.desktop.text}</p>
          <div className="reveal mt-10 grid gap-12 md:mt-16 md:gap-20">
            {study.desktop.visuals.map((visual) => (
              <Visual key={visual.file} {...visual} className="aspect-[16/10]" />
            ))}
          </div>
        </section>

        {/* Mobile visuals */}
        <section data-reveal className="mt-24 md:mt-40">
          <Eyebrow>The mobile experience</Eyebrow>
          <SectionTitle>{study.mobile.title}</SectionTitle>
          <p className="reveal mt-6 max-w-2xl text-ink/70 md:text-lg">{study.mobile.text}</p>
          <div className="reveal mx-auto mt-10 grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-3 sm:gap-6 md:mt-16 lg:gap-10">
            {study.mobile.visuals.map((visual) => (
              <Visual key={visual.file} {...visual} className="aspect-[9/19.5]" />
            ))}
          </div>
        </section>

        {/* Key figures */}
        <section data-reveal className="mt-24 md:mt-40">
          <div className="reveal grid gap-10 rounded-3xl bg-ink p-8 text-paper md:grid-cols-3 md:gap-12 md:p-14">
            {study.results.map((result) => (
              <div key={result.text}>
                <span className="font-display text-6xl font-bold text-accent md:text-7xl">{result.value}</span>
                <p className="mt-3 text-paper/70 md:text-lg">{result.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next project / back */}
        <section data-reveal className="mt-24 md:mt-40">
          <a
            href={hasNext ? `/projects/${next.slug}` : '/#projects'}
            className="reveal group flex items-end justify-between gap-6 border-t border-ink/10 pt-8"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
                {hasNext ? 'Next project' : 'Keep exploring'}
              </p>
              <p className="mt-3 font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-6xl">
                {hasNext ? next.title : 'All projects'}
              </p>
            </div>
            <span className="font-display text-3xl transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">→</span>
          </a>
        </section>

        <footer className="mt-20 flex items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink/50">
          <span>© {YEAR} Tom Santoni</span>
          <a href="#" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </footer>
      </main>
    </>
  )
}

export default ProjectPage
