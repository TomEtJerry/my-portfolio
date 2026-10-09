import { Fragment, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { setupMobileSteps } from '../lib/mobileSteps'
import { about, EXPERIENCE_URL } from '../data/about'

// Scroll distance (in screen heights) during which the section stays in place (desktop only).
// It pins once its bottom reaches the bottom of the screen. The content is centered in the
// space below the logo (top padding), so the gaps above and below stay balanced. On shorter
// screens (`short`, `tiny` variants) the content is compacted so it stays clear of the navbar.
const PIN_HOLD = 0.5

// "View my full experience" button — shown in the intro column on desktop,
// at the end of the section on mobile
function ExperienceLink({ className = '' }) {
  return (
    <a
      href={EXPERIENCE_URL}
      className={`about-reveal group mt-10 items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-medium text-paper transition-colors hover:bg-accent-dark md:px-7 md:py-4 md:short:mt-7 ${className}`}
    >
      View my full experience
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  )
}

function About() {
  const section = useRef(null)
  const pinned = useRef(null)

  // Content fades up as the section comes into view
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Large screens only (two-column layout): hold the section on screen for a moment once it's fully in view
      mm.add('(min-width: 64rem)', () => {
        ScrollTrigger.create({
          trigger: pinned.current,
          pin: pinned.current,
          start: 'bottom bottom',
          end: `+=${PIN_HOLD * 100}%`,
        })
      })

      // Mobile only: step-by-step scroll into the section (intro, then key facts + CTA)
      mm.add('(max-width: 47.999rem)', () =>
        setupMobileSteps({
          pin: pinned.current,
          first: section.current.querySelector('.about-intro'),
          second: section.current.querySelector('.about-facts'),
          // Longer hold on the key facts, so leaving for Contact takes a bit more scrolling
          distance: 1.7,
          swapStart: 0.25,
          swapEnd: 0.56,
        }),
      )

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about-reveal', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          // Triggered by the title (the top of the section is empty space), and only once:
          // later page re-measurements (pins, fonts, images) can't replay it
          scrollTrigger: { trigger: '#about h2', start: 'top 85%', once: true },
        })
      })
    },
    { scope: section },
  )

  return (
    // The id sits on this wrapper so it also covers the pinned scroll distance (for the navbar).
    // Desktop: negative top margin tightens the gap with Projects (the top of the section is empty space).
    <section id="about" ref={section} className="lg:-mt-12">
      <div
        ref={pinned}
        className="mx-auto flex max-w-page flex-col px-5 pb-12 pt-24 max-md:h-[100svh] max-md:pt-[clamp(6.5rem,calc(100svh-34rem),13.5rem)] md:px-12 md:pb-20 md:pt-28 lg:min-h-screen lg:justify-center lg:pb-16 lg:pt-[7.5rem]"
      >
        <h2 className="about-reveal font-display text-4xl font-bold tracking-tight md:text-6xl">
          About<span className="text-accent">.</span>
        </h2>

        <div className="mt-10 grid gap-12 md:mt-14 lg:mt-16 lg:grid-cols-12 lg:gap-16 md:short:mt-10 md:tiny:mt-8">
          {/* Intro + CTA. Phones: shares the same spot as the key facts, shown one after the other */}
          <div className="about-intro col-start-1 row-start-1 md:row-start-auto lg:col-span-7">
            <p className="about-reveal font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl md:leading-tight md:short:text-[2rem] md:tiny:text-[1.75rem]">
              {about.intro.text} <span className="text-accent">{about.intro.highlight}</span>
            </p>

            {about.body.map((paragraph) => (
              <p key={paragraph} className="about-reveal mt-6 max-w-xl text-base text-ink/70 md:text-lg md:short:mt-4 md:short:text-base">
                {paragraph}
              </p>
            ))}

            <ExperienceLink className="hidden lg:inline-flex" />
          </div>

          {/* Key facts + skills (+ CTA on phones and tablets) */}
          <div className="about-facts col-start-1 row-start-1 md:row-start-auto lg:col-span-5 lg:col-start-auto">
            <dl className="about-reveal border-t border-ink/10">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4 md:py-5 md:short:py-3.5 md:tiny:py-2.5"
                >
                  <dt className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
                    {fact.label}
                  </dt>
                  <dd className="space-y-3 text-right md:tiny:space-y-1.5">
                    {fact.entries.map((entry) => (
                      <div key={entry.value}>
                        <span className="block font-display text-base font-medium md:text-lg">
                          {entry.value}
                        </span>
                        {entry.detail && (
                          <span className="mt-0.5 block whitespace-nowrap text-[0.8125rem] text-ink/50 md:text-sm lg:whitespace-normal md:tiny:mt-0">
                          {entry.detail.split(' · ').map((part, i) => (
                            // The separator stays outside so the line can break there
                            <Fragment key={part}>
                              {i > 0 && ' · '}
                              <span className="whitespace-nowrap">{part}</span>
                            </Fragment>
                          ))}
                        </span>
                        )}
                      </div>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Expertise: desktop only */}
            <div className="about-reveal mt-8 hidden md:block md:short:mt-6 md:tiny:mt-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
                Expertise
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {about.expertise.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Phones and tablets: the CTA closes the section, after the key facts */}
            <ExperienceLink className="inline-flex lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
