import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import ProjectSlider from './ProjectSlider'
import { projects } from '../data/projects'
import { companies } from '../data/companies'
import { notchedPath } from '../lib/notchedPath'

// Only the featured projects are shown in the hero slider
const featuredProjects = projects.filter((project) => project.featured)

// [mobile, desktop] values
const RADIUS = [20, 28] // outer corners of the projects block
const NOTCH_RADIUS = [16, 24] // corners around the notch
const NOTCH_GAP = [16, 24] // space between the navbar and the notch edges

const profile = {
  firstName: 'Tom',
  lastName: 'Santoni',
  // One entry per line — the last line is highlighted in orange
  role: ['Product', 'Designer'],
  pitch:
    'I design user-centred digital products, from user research to interactive prototypes, backed by a Master’s in Digital Business.',
}

function Hero() {
  const container = useRef(null)
  const media = useRef(null)
  const [clipPath, setClipPath] = useState()

  // Cut a notch in the top-right corner of the projects block, sized to the navbar
  useLayoutEffect(() => {
    const nav = document.querySelector('[data-nav-links]')
    if (!media.current || !nav) return

    const update = () => {
      const block = media.current.getBoundingClientRect()
      const links = nav.getBoundingClientRect() // navbar is fixed: viewport coords at scroll 0
      const blockTop = block.top + window.scrollY
      const size = window.matchMedia('(min-width: 48rem)').matches ? 1 : 0
      const gap = NOTCH_GAP[size]
      const notchW = block.right - links.left + gap
      const notchH = links.bottom - blockTop + gap
      setClipPath(
        `path('${notchedPath(block.width, block.height, RADIUS[size], notchW, notchH, NOTCH_RADIUS[size])}')`,
      )
    }

    update()
    document.fonts?.ready.then(update) // labels change size once the web font loads
    const observer = new ResizeObserver(update)
    observer.observe(media.current)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power4.out', duration: 1 } })
          // Animate the content, not the block itself, so the notch measurement isn't skewed
          .from('.hero-media > *', { opacity: 0, scale: 1.05, duration: 1.6, ease: 'power3.out' })
          .from('.hero-line', { yPercent: 110 }, 0)
          .from('.hero-fade', { y: 20, opacity: 0 }, 0)
      })
    },
    { scope: container },
  )

  return (
    <section
      id="home"
      ref={container}
      // Fills the screen, but stops growing on very tall screens (> 1024px)
      className="relative h-screen max-h-[64rem] overflow-hidden supports-[height:100dvh]:h-dvh"
    >
      {/* Content is capped at the page width and centered */}
      <div className="relative mx-auto flex h-full max-w-page flex-col md:flex-row">
        {/* Projects — rounded block on the right, notched top-right for the navbar.
            It takes all the width left by the introduction, growing to the left. */}
        <div
          ref={media}
          style={{ clipPath }}
          className="hero-media relative mx-4 mb-5 mt-[4.25rem] h-[42%] shrink-0 md:order-2 md:h-auto md:flex-1 md:shrink md:my-6 md:ml-0 md:mr-6"
        >
          <ProjectSlider projects={featuredProjects} />
        </div>

        {/* Introduction — left */}
        <div className="relative z-40 flex flex-1 flex-col px-5 pb-6 md:order-1 md:flex-none md:h-full md:w-[clamp(20rem,45%,40rem)] xl:w-[clamp(20rem,40%,40rem)] md:shrink-0 md:px-12 md:pb-32 md:pt-16">
          {/* my-auto: vertically centered in the space left above the company logos */}
          <div className="my-auto max-w-xl">
            <p className="hero-fade font-display text-base font-medium text-ink/70 md:text-2xl">
              {profile.firstName} {profile.lastName}
            </p>

            <h1 className="mt-2 font-display md:mt-6 text-5xl font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              {profile.role.map((line, i) => (
                // Extra bottom padding so descenders (g, p, y) aren't clipped by the reveal mask
                <span key={line} className="-mb-[0.15em] block overflow-hidden pb-[0.15em]">
                  <span
                    className={`hero-line block ${i === profile.role.length - 1 ? 'text-accent' : ''}`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-fade mt-4 max-w-md text-base md:mt-10 md:text-lg text-ink/70">{profile.pitch}</p>
          </div>

          {/* Companies — bottom left, aligned with the bottom of the projects block */}
          <div className="hero-fade mt-6 md:absolute md:bottom-6 md:left-12 md:right-12 md:mt-0">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ink/50 md:text-xs">
              Where I&apos;ve worked
            </p>
            <ul className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-2 md:mt-4 xl:gap-x-10">
              {companies.map((company) => (
                <li key={company.name}>
                  <img
                    src={company.logo}
                    alt={company.name}
                    className={`${company.size} w-auto opacity-55 grayscale transition-opacity duration-500 hover:opacity-100`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
