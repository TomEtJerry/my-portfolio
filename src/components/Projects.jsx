import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { projects } from '../data/projects'
import ResponsiveImage from './ResponsiveImage'

// Card colors, in turn
const THEMES = [
  'bg-sand text-ink',
  'bg-ink text-paper',
  'bg-accent text-paper',
]

// Extra scroll (in screen heights) before the 2nd card arrives and after the last one lands.
// Only applies when scrolling down — scrolling up skips them.
const HOLD_START = 0.6
const HOLD_END = 0.35

function Projects() {
  const section = useRef(null)
  const pinned = useRef(null)
  const cards = useRef([])

  // Pin the section and stack the cards one on top of the other while scrolling
  useGSAP(
    () => {
      const items = cards.current
      gsap.set(items, { transformOrigin: '50% 0%' })

      // Anchor links (navbar) scroll smoothly through the section: don't interfere with them
      let navigating = false
      let navTimer
      const onAnchorClick = (event) => {
        if (!event.target.closest('a[href^="#"]')) return
        navigating = true
        clearTimeout(navTimer)
        navTimer = setTimeout(() => (navigating = false), 1500)
      }
      document.addEventListener('click', onAnchorClick)
      gsap.set(items.slice(1), { yPercent: 115 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pinned.current,
          pin: pinned.current,
          start: 'top top',
          // 1 screen height of scroll per card, plus the holds
          end: () => `+=${(items.length - 1 + HOLD_START + HOLD_END) * window.innerHeight}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          // Scrolling up: jump over the holds. Nothing moves during a hold,
          // so the jump is invisible — it just removes the extra scroll.
          onUpdate: (self) => {
            if (self.direction !== -1 || navigating) return
            const vh = window.innerHeight
            const startHoldEnd = self.start + HOLD_START * vh
            const endHoldStart = self.end - HOLD_END * vh
            const y = self.scroll()
            // 'instant' bypasses the page's CSS smooth scrolling
            const jump = (top) => window.scrollTo({ top, behavior: 'instant' })
            if (y > endHoldStart && y < self.end) jump(endHoldStart)
            // Wait until card 2 has visually finished sliding back down (the scrub lags
            // behind the scroll), otherwise the section would unpin mid-animation
            else if (
              y > self.start &&
              y < startHoldEnd &&
              self.animation.time() <= HOLD_START + 0.01
            )
              jump(self.start)
          },
        },
      })

      items.slice(1).forEach((card, k) => {
        const i = k + 1
        const at = HOLD_START + k
        tl.to(card, { yPercent: 0 }, at)
        // Cards already in the pile shrink slightly and darken
        items.slice(0, i).forEach((prev, j) => {
          const depth = i - j
          tl.to(prev, { scale: 1 - 0.04 * depth }, at)
          tl.to(prev.querySelector('.card-shade'), { opacity: Math.min(0.5, 0.2 * depth) }, at)
        })
      })

      // Empty tweens so the timeline also spans the holds at the start and the end
      tl.to({}, { duration: HOLD_START }, 0)
      tl.to({}, { duration: HOLD_END }, HOLD_START + items.length - 1)

      return () => {
        document.removeEventListener('click', onAnchorClick)
        clearTimeout(navTimer)
      }
    },
    { scope: section },
  )

  return (
    // The id sits on this wrapper so it also covers the pinned scroll distance (for the navbar).
    // Negative top margin: the section's empty top padding slides under the banner, bringing it closer.
    <section id="projects" ref={section} className="-mt-6 md:-mt-12">
      <div
        ref={pinned}
        className="h-screen overflow-hidden supports-[height:100dvh]:h-dvh"
      >
        <div className="mx-auto flex h-full max-w-page flex-col px-4 pb-4 pt-[6rem] md:px-12 md:pb-10 md:pt-44">
          <header className="px-1 md:px-0">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              Projects<span className="text-accent">.</span>
            </h2>
          </header>

          {/* --card-step: each card lands a bit lower than the previous one so the pile stays visible.
              The title is pushed down so the cards start below the navbar (top right) and never run under it. */}
          <div className="relative mx-7 mb-12 mt-10 flex-1 [--card-step:10px] md:mx-[10%] md:mb-8 md:mt-12 md:[--card-step:14px] wide:mx-[4%] xl:wide:mx-[10%]">
            {projects.map((project, i) => (
              <article
                key={project.title}
                ref={(el) => {
                  cards.current[i] = el
                }}
                style={{ top: `calc(${i} * var(--card-step))` }}
                className={`absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-[20px] will-change-transform md:rounded-[28px] wide:flex-row ${THEMES[i % THEMES.length]}`}
              >
                {/* Text */}
                <div className="flex min-h-0 flex-1 flex-col justify-between gap-3 p-4 md:p-8 wide:w-[45%] wide:flex-none wide:p-10 xl:wide:w-[42%] xl:wide:p-14">
                  <div className="flex items-baseline justify-between gap-4 text-[0.625rem] font-medium uppercase tracking-[0.2em] opacity-70 md:text-xs xl:text-sm">
                    <span className="shrink-0 whitespace-nowrap font-display tabular-nums">
                      {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                    <span className="text-right">{project.category}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight md:text-3xl xl:text-[2.125rem] min-[90rem]:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-md text-[0.8125rem] leading-snug opacity-75 md:mt-4 md:text-base md:leading-normal xl:mt-5 xl:text-lg">
                      {project.description}
                    </p>
                    <p className="mt-5 text-[0.625rem] uppercase tracking-[0.15em] opacity-60 md:mt-5 md:text-sm">
                      {project.company ?? project.role} · {project.year}
                    </p>
                    <a
                      href={project.caseStudy && !project.caseStudy.draft ? `/projects/${project.slug}` : '#'}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-current/25 px-4 py-2 text-xs font-medium transition-colors hover:bg-current/10 md:mt-6 md:px-5 md:py-2.5 md:text-sm xl:mt-8"
                    >
                      View case study
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Image */}
                {/* Smaller image on short phones so the text keeps enough room */}
                <div className="relative order-first h-[44%] bg-sand shrink-0 md:h-[40%] wide:order-none wide:h-auto wide:flex-1 [@media(max-height:720px)]:h-[34%] wide:[@media(max-height:720px)]:h-auto">
                  {/* Fills the whole area; anchored left, any extra height is cropped evenly top and bottom */}
                  <ResponsiveImage image={project.image} sizes="(min-width: 64rem) 50vw, 100vw" className="absolute inset-0 size-full object-cover object-left" />
                </div>

                {/* Darkens the card once others are stacked on top of it */}
                <div className="card-shade pointer-events-none absolute inset-0 bg-ink opacity-0" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
