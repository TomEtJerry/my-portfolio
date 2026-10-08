import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ProjectSlider({ projects, interval = 5000 }) {
  const root = useRef(null)
  const current = useRef(0)
  const busy = useRef(false)
  const [active, setActive] = useState(0)

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('[data-slide]', { autoAlpha: 0, zIndex: 0 })
      gsap.set('[data-slide="0"]', { autoAlpha: 1, zIndex: 1 })
    },
    { scope: root },
  )

  // Caption fades in on each project change
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.caption-line', {
        y: 12,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.4,
      })
    },
    { scope: root, dependencies: [active] },
  )

  const goTo = contextSafe((next) => {
    if (busy.current || next === current.current) return
    busy.current = true
    setActive(next)

    const reduce = prefersReducedMotion()
    const prevSlide = `[data-slide="${current.current}"]`
    const nextSlide = `[data-slide="${next}"]`

    gsap.set(nextSlide, { zIndex: 2 })

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(prevSlide, { autoAlpha: 0, zIndex: 0 })
          gsap.set(nextSlide, { zIndex: 1 })
          current.current = next
          busy.current = false
        },
      })
      .fromTo(
        nextSlide,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: reduce ? 0 : 1.4, ease: 'power1.inOut' },
      )
      .fromTo(
        `${nextSlide} img`,
        { scale: 1.04 },
        { scale: 1, duration: reduce ? 0 : 2.4, ease: 'power2.out' },
        0,
      )
  })

  // Autoplay
  useEffect(() => {
    const id = setTimeout(() => goTo((active + 1) % projects.length), interval)
    return () => clearTimeout(id)
  }, [active, interval, projects.length, goTo])

  const project = projects[active]

  return (
    <div ref={root} className="relative h-full w-full overflow-hidden bg-ink">
      {projects.map((p, i) => (
        <div
          key={p.title}
          data-slide={i}
          className="invisible absolute inset-0"
          aria-hidden={i !== active}
        >
          <img src={p.image} alt={p.title} className="size-full object-cover object-left-top" />
        </div>
      ))}

      {/* Bottom gradient + caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />
      <div className="absolute bottom-0 right-0 z-20 flex flex-col items-end gap-3 p-5 text-right text-paper md:gap-5 md:p-12">
        <span className="font-display text-sm tabular-nums text-paper/70">
          {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <div key={active}>
          <p className="caption-line text-base font-medium uppercase tracking-widest xl:text-lg text-accent-light">
            {project.company ?? project.category}
          </p>
          <h3 className="caption-line font-display text-2xl font-bold md:text-5xl">
            {project.title}
          </h3>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${p.title}`}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                i === active ? 'w-10 bg-accent' : 'w-4 bg-paper/40 hover:bg-paper/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectSlider
