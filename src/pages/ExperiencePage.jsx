import { useEffect, useRef } from 'react'
import Logo from '../components/Logo'
import { EndBand, Eyebrow, Lead, SectionTitle } from '../components/PageParts'
import { contact } from '../data/contact'
import { experience } from '../data/experience'
import { projects, projectUrl } from '../data/projects'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

// Small square bullet, in orange
const Bullet = () => <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 bg-accent" />

// Rounded label (education modules)
function Chip({ children }) {
  return (
    <li className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink/80 md:px-4 md:py-2 md:text-sm">
      {children}
    </li>
  )
}

// reveal: the whole section fades in as one block. Sections with cards set it to false: their
// header fades in on its own (data-reveal) and the cards arrive one after another (data-card).
const Section = ({ children, reveal = true }) => (
  <section data-reveal={reveal || undefined} className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
    {children}
  </section>
)

// Card look, shared by the experience and education cards (slight lift on hover)
const CARD =
  'flex flex-col rounded-[20px] bg-sand p-6 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(26,20,16,0.4)] md:rounded-[28px] md:p-8'

// Small gray title inside a section
const SubTitle = ({ children, as: Tag = 'h3' }) => (
  <Tag className="font-display text-sm font-bold uppercase tracking-[0.2em] text-ink/40">{children}</Tag>
)

function ExperiencePage() {
  const page = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Full experience — Tom Santoni'
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  // Same entrance as the project pages: the hero on load, each section once as it comes into view
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-in', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.06 })
        gsap.utils.toArray('[data-reveal]').forEach((section) => {
          gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 85%', once: true },
          })
        })

        // Cards: each one rises, straightens and grows as it comes into view. The cards that
        // appear together (a row of 3 on desktop) follow one another; on phones, one by one.
        // clearProps: once in place, the card's own hover effect works again.
        gsap.set('[data-card]', { y: 90, rotate: 2, scale: 0.94, opacity: 0, transformOrigin: '50% 100%' })
        ScrollTrigger.batch('[data-card]', {
          start: 'top 90%',
          once: true,
          onEnter: (cards) =>
            gsap.to(cards, {
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
              clearProps: 'transform,opacity',
            }),
        })
      })
    },
    { scope: page },
  )

  return (
    <div ref={page} className="overflow-x-clip font-sans">
      <Logo href="/" />

      {/* Back link (top right, where the navbar sits on the home page) */}
      <a
        href="/#about"
        className="fixed right-[var(--page-offset)] top-[var(--safe-top)] z-50 m-5 rounded-full bg-paper/80 px-4 py-2 font-display text-base font-bold tracking-tight text-ink/60 backdrop-blur-md transition-colors hover:text-accent md:m-12 md:text-xl"
      >
        ← Back home
      </a>

      <main>
        {/* ===== HERO ===== */}
        <section className="mx-auto max-w-page px-5 pb-8 pt-[calc(7.5rem+var(--safe-top))] md:px-12 md:pb-12 md:pt-48 lg:pt-56">
          <div className="hero-in">
            <Eyebrow>Resume</Eyebrow>
          </div>
          <h1 className="hero-in mt-4 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:mt-6 md:text-8xl xl:text-9xl">
            Full experience<span className="text-accent">.</span>
          </h1>
          <p className="hero-in mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/70 md:mt-10 md:text-xl">
            {experience.intro}
          </p>
          <div className="hero-in mt-8 flex flex-col gap-8 border-t border-ink/10 pt-5 md:mt-14 md:flex-row md:items-end md:justify-between md:pt-7">
            <dl className="grid grid-cols-3 gap-x-4 md:gap-x-12">
              {experience.meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.625rem] font-medium uppercase tracking-[0.15em] text-ink/50 md:text-xs md:tracking-[0.2em]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-sm font-medium leading-tight md:mt-2 md:text-xl">{item.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start rounded-full border border-ink/20 px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent md:self-auto md:px-6 md:py-3.5"
            >
              See my LinkedIn
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </section>

        {/* ===== EXPERIENCE: one row per role, most recent first ===== */}
        <Section reveal={false}>
          <div data-reveal>
            <Eyebrow>Experience</Eyebrow>
            <SectionTitle>Three years of design, in three companies</SectionTitle>
          </div>
          {/* One card per role, like the education cards: most recent first */}
          <ol className="mt-10 grid gap-4 md:mt-16 md:gap-6 lg:grid-cols-3">
            {experience.jobs.map((job) => {
              const related = projects.filter((p) => p.company === job.company && projectUrl(p))
              return (
                <li key={job.company} data-card className={CARD}>
                  {/* Period and contract type, company logo */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-display text-sm tabular-nums text-accent">
                      {job.period}
                      <span className="block text-ink/50">{job.type}</span>
                    </p>
                    <img src={job.logo} alt={job.company} className={`w-auto opacity-80 ${job.logoSize}`} />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight md:text-2xl">{job.role}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70 md:text-base">{job.summary}</p>

                  <ul className="mt-5 grid gap-2 text-[0.9375rem] leading-relaxed md:mt-6 md:text-base">
                    {job.tasks.map((task) => (
                      <li key={task} className="flex gap-3">
                        <Bullet />
                        {task}
                      </li>
                    ))}
                  </ul>

                  {/* Related case studies, at the bottom of the card */}
                  {related.length > 0 && (
                    <div className="mt-auto pt-7 md:pt-8">
                      <div className="border-t border-ink/10 pt-5 md:pt-6">
                      <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ink/40 md:text-xs">
                        Case studies
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {related.map((project) => (
                          <li key={project.slug}>
                            <a
                              href={projectUrl(project)}
                              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors hover:border-accent hover:bg-accent hover:text-paper md:px-4 md:py-2 md:text-sm"
                            >
                              {project.title}
                              <span aria-hidden="true">↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </Section>

        {/* ===== EDUCATION ===== */}
        <Section reveal={false}>
          <div data-reveal>
            <Eyebrow>Education</Eyebrow>
            <SectionTitle>A business background, turned toward design</SectionTitle>
            <Lead>
              A business school curriculum specialised in digital business, completed by a dedicated UI
              design program at GOBELINS Paris.
            </Lead>
          </div>
          <ol className="mt-10 grid gap-4 md:mt-16 md:gap-6 lg:grid-cols-3">
            {experience.education.map((school) => (
              <li key={school.degree} data-card className={CARD}>
                <p className="font-display text-sm tabular-nums text-accent">{school.period}</p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">{school.school}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink/70 md:text-base">{school.degree}</p>
                <ul className="mt-6 flex flex-wrap gap-2 pt-1 md:mt-8">
                  {school.modules.map((module) => (
                    <Chip key={module}>{module}</Chip>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        {/* ===== TOOLS & LANGUAGES: two short lines of text, no boxes or lists ===== */}
        <Section>
          <Eyebrow>Tools & languages</Eyebrow>
          <dl className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[2fr_1fr] md:gap-16">
            <div>
              <SubTitle as="dt">Tools</SubTitle>
              <dd className="mt-3 font-display text-xl font-medium leading-snug md:text-3xl">
                {experience.tools.map((tool, i) => (
                  <span key={tool}>
                    {i > 0 && <span className="text-accent"> / </span>}
                    {/* nowrap: a name like "After Effects" never breaks across two lines */}
                    <span className="whitespace-nowrap">{tool}</span>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <SubTitle as="dt">Languages</SubTitle>
              <dd className="mt-3 font-display text-xl font-medium leading-snug md:text-3xl">
                {experience.languages.map((language, i) => (
                  <span key={language.name} className="block">
                    {language.name} <span className="text-base text-ink/50 md:text-lg">{language.level}</span>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Section>

      </main>

      <EndBand href="/#contact" label="Let’s work together" title="Get in touch" />
    </div>
  )
}

export default ExperiencePage
