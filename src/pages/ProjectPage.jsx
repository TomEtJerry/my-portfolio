import { useEffect, useRef } from 'react'
import Logo from '../components/Logo'
import ResponsiveImage from '../components/ResponsiveImage'
import Visual from '../components/Visual'
import { projects } from '../data/projects'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

const YEAR = new Date().getFullYear()

// Small orange label with a dash, above each section title
function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent md:text-sm">
      <span aria-hidden="true" className="h-[2px] w-8 bg-accent" />
      {children}
    </p>
  )
}

function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight md:mt-5 md:text-5xl ${className}`}
    >
      {children}
    </h2>
  )
}

const Lead = ({ children }) => (
  <p className="mt-5 max-w-2xl text-base text-ink/70 md:mt-6 md:text-lg">{children}</p>
)

function ProjectPage({ project }) {
  const page = useRef(null)
  const timeline = useRef(null)
  const study = project.caseStudy
  const meta = [...study.meta, { label: 'Year', value: project.year }]

  // Next project that has its own page (loops back to the first one)
  const withPage = projects.filter((p) => p.caseStudy && !p.caseStudy.draft)
  const next = withPage[(withPage.indexOf(project) + 1) % withPage.length]
  const hasNext = next && next !== project

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${project.title} — Tom Santoni`
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [project.title])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero: everything comes in together on load
        gsap.from('.hero-in', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
        gsap.from('.hero-visual', { scale: 0.94, opacity: 0, duration: 1.2, ease: 'power3.out' })

        // Each section rises and fades in with the scroll
        gsap.utils.toArray('[data-reveal]').forEach((section) => {
          gsap.fromTo(
            section,
            { autoAlpha: 0, y: 60 },
            {
              autoAlpha: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 55%', scrub: true },
            },
          )
        })
      })

      // Approach timeline: an orange line fills down with the scroll and lights each step's dot
      // as it reaches it
      const steps = gsap.utils.toArray('[data-step]', timeline.current)
      const dots = steps.map((step) => step.querySelector('[data-dot]'))
      const track = timeline.current.querySelector('[data-track]')
      const fill = timeline.current.querySelector('[data-fill]')
      // The track runs from the center of the first dot to the center of the last one
      const placeTrack = () => {
        const box = timeline.current.getBoundingClientRect()
        const center = (dot) => {
          const r = dot.getBoundingClientRect()
          return r.top + r.height / 2 - box.top
        }
        const top = center(dots[0])
        track.style.top = `${top}px`
        track.style.height = `${Math.max(center(dots[dots.length - 1]) - top, 1)}px`
      }
      placeTrack()
      ScrollTrigger.addEventListener('refreshInit', placeTrack)
      ScrollTrigger.create({
        trigger: timeline.current,
        start: 'top 65%',
        end: 'bottom 65%',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(fill, { scaleY: self.progress })
          steps.forEach((step, i) => {
            const reached = self.progress >= i / Math.max(steps.length - 1, 1) - 0.001
            step.classList.toggle('is-active', reached)
          })
        },
      })

      return () => ScrollTrigger.removeEventListener('refreshInit', placeTrack)
    },
    { scope: page },
  )

  return (
    // overflow-x-clip: the hero glow spreads past the screen edge; clip it so the page never
    // scrolls sideways (clip, unlike hidden, keeps the fixed logo and back link working)
    <div ref={page} className="overflow-x-clip font-sans">
      <Logo href="/" />

      {/* Back link (top right, where the navbar sits on the home page) */}
      <a
        href="/#projects"
        className="fixed right-[var(--page-offset)] top-[var(--safe-top)] z-50 m-5 rounded-full bg-paper/80 px-4 py-2 font-display text-base font-bold tracking-tight text-ink/60 backdrop-blur-md transition-colors hover:text-accent md:m-12 md:text-xl"
      >
        ← All projects
      </a>

      <main>
        {/* ===== HERO: visual + project info ===== */}
        <section className="mx-auto grid max-w-page items-center gap-10 px-5 pb-16 pt-[calc(7rem+var(--safe-top))] md:px-12 md:pb-24 md:pt-40 lg:min-h-screen lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-32">
          {/* Visual with a soft orange glow behind it */}
          <div className="relative lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_28%,transparent),transparent)] blur-2xl md:-inset-14"
            />
            <div className="hero-visual relative aspect-[4/3] overflow-hidden rounded-[24px] bg-sand shadow-[0_40px_80px_-40px_rgba(26,20,16,0.45)] ring-1 ring-ink/10 md:rounded-[32px]">
              <ResponsiveImage
                image={project.image}
                alt={project.title}
                priority
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="size-full object-cover object-left"
              />
            </div>
            {/* Floating chip */}
            <span className="hero-in absolute -bottom-4 left-5 rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-paper shadow-lg md:-bottom-5 md:left-8 md:text-sm">
              {project.company} · {project.year}
            </span>
          </div>

          {/* Info */}
          <div className="lg:order-1">
            <div className="hero-in">
              <Eyebrow>{project.category}</Eyebrow>
            </div>
            <h1 className="hero-in mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl xl:text-8xl">
              {project.title}
            </h1>
            <p className="hero-in mt-6 max-w-xl text-lg text-ink/70 md:mt-8 md:text-xl md:leading-relaxed">
              {study.intro}
            </p>
            <dl className="hero-in mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 sm:grid-cols-4 md:mt-12">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-medium md:text-xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ===== CONTEXT + GOALS ===== */}
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>The context</Eyebrow>
          <div className="mt-4 grid gap-10 md:mt-5 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionTitle className="!mt-0">{study.context.title}</SectionTitle>
              <p className="mt-6 text-base text-ink/70 md:text-lg md:leading-relaxed">
                {study.context.text}
              </p>
            </div>
            {/* Goals card */}
            <div className="self-start rounded-[24px] bg-ink p-7 text-paper shadow-[0_30px_60px_-30px_rgba(26,20,16,0.5)] md:rounded-[32px] md:p-10 lg:col-span-5">
              <p className="font-display text-xl font-bold text-accent md:text-2xl">
                {study.context.goalsTitle ?? 'Project goals'}
              </p>
              <ul className="mt-6 space-y-5">
                {study.context.goals.map((goal, i) => (
                  <li key={goal} className="flex gap-4">
                    <span className="mt-0.5 font-display text-sm tabular-nums text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base text-paper/85 md:text-lg">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== APPROACH: scroll-filled timeline ===== */}
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>The approach</Eyebrow>
          <SectionTitle>{study.approach.title}</SectionTitle>

          <ol ref={timeline} className="relative mt-12 md:mt-16">
            {/* Track (between the first and the last dot) and its orange fill */}
            <span
              aria-hidden="true"
              data-track
              className="absolute left-3 w-[2px] -translate-x-1/2 overflow-hidden rounded-full bg-ink/10 md:left-4"
            >
              <span data-fill className="absolute inset-0 origin-top scale-y-0 bg-accent" />
            </span>

            {study.approach.steps.map((step, i) => (
              <li
                key={step.title}
                data-step
                className="group relative grid grid-cols-[1.5rem_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-[2rem_1fr] md:gap-8 md:pb-16"
              >
                {/* Dot: outlined, filled orange once the line reaches it */}
                <span data-dot className="relative z-10 mt-0.5 size-6 rounded-full border-2 border-accent bg-paper transition-all duration-500 group-[.is-active]:bg-accent group-[.is-active]:shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] md:size-8" />
                <div>
                  <span className="font-display text-sm tabular-nums text-ink/40 transition-colors duration-500 group-[.is-active]:text-accent">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold tracking-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-ink/70 md:text-lg">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ===== MOBILE SHOWCASE: the main screen large in the middle, the two others around ===== */}
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>The mobile experience</Eyebrow>
          <SectionTitle>{study.mobile.title}</SectionTitle>
          <Lead>{study.mobile.text}</Lead>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 items-center gap-6 md:mt-16 md:grid-cols-3 md:gap-10 lg:gap-14">
            {study.mobile.visuals.map((visual, i) => (
              <div
                key={visual.file}
                className={
                  i === 0
                    ? 'col-span-2 mx-auto w-3/5 md:order-2 md:col-span-1 md:w-full md:scale-110'
                    : i === 1
                      ? 'md:order-1'
                      : 'md:order-3'
                }
              >
                <Visual
                  {...visual}
                  className="aspect-[9/19.5] !rounded-[28px] border-[6px] border-ink shadow-[0_30px_60px_-30px_rgba(26,20,16,0.45)] md:!rounded-[36px]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ===== DESKTOP SHOWCASE ===== */}
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>The desktop experience</Eyebrow>
          <SectionTitle>{study.desktop.title}</SectionTitle>
          <Lead>{study.desktop.text}</Lead>
          <div className="mx-auto mt-12 grid max-w-5xl gap-14 md:mt-16 md:gap-20">
            {study.desktop.visuals.map((visual) => (
              <Visual
                key={visual.file}
                {...visual}
                className="aspect-[16/9] shadow-[0_40px_80px_-40px_rgba(26,20,16,0.4)] ring-1 ring-ink/10"
              />
            ))}
          </div>
        </section>

        {/* ===== KEY FIGURES ===== */}
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>Key figures</Eyebrow>
          <div className="mt-8 border-t border-ink/10 md:mt-10">
            {study.results.map((result) => (
              <div
                key={result.text}
                className="grid items-center gap-2 border-b border-ink/10 py-6 md:grid-cols-[14rem_1fr] md:gap-10 md:py-8"
              >
                <span className="font-display text-5xl font-bold text-accent md:text-7xl">
                  {result.value}
                </span>
                <p className="text-base text-ink/70 md:text-xl">{result.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== NEXT PROJECT (or back to all projects) ===== */}
      <section className="mt-10 bg-ink text-paper">
        <a
          href={hasNext ? `/projects/${next.slug}` : '/#projects'}
          className="group mx-auto flex max-w-page items-center justify-between gap-8 px-5 py-14 md:px-12 md:py-24"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-light md:text-sm">
              {hasNext ? 'Next project' : 'Keep exploring'}
            </p>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-accent-light md:text-6xl">
              {hasNext ? next.title : 'All projects'}
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
    </div>
  )
}

export default ProjectPage
