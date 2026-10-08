import { useState } from 'react'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import { sections } from '../data/sections'

function Navbar() {
  const [active, setActive] = useState(sections[0].id)
  const [scrolled, setScrolled] = useState(false)

  // Track which section is in the middle of the viewport
  useGSAP(() => {
    sections.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => self.isActive && setActive(id),
        refreshPriority: -1, // computed after the pinned Projects section adds its scroll space
      })
    })

    // Once the page scrolls, content can slide under the nav
    ScrollTrigger.create({
      start: 10,
      end: 'max',
      onToggle: (self) => setScrolled(self.isActive),
    })
  })

  return (
    <nav aria-label="Sections" className="fixed right-[var(--page-offset)] top-[var(--safe-top)] z-50 p-5 md:p-12">
      {/* Frosted, fading backdrop so the links stay readable over content.
          It always reaches the screen edge, even when the content is narrower than the screen.
          Hidden at the top of the page, where the hero leaves room for the nav. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-24 -left-32 right-[calc(-1*var(--page-offset))] top-0 bg-[radial-gradient(ellipse_100%_100%_at_top_right,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_90%,transparent)_30%,color-mix(in_srgb,var(--color-paper)_55%,transparent)_55%,color-mix(in_srgb,var(--color-paper)_20%,transparent)_78%,transparent_100%)] backdrop-blur-md transition-opacity duration-700 [mask-image:radial-gradient(ellipse_100%_100%_at_top_right,black_40%,transparent_100%)] ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <ul data-nav-links className="relative flex flex-col items-end gap-0.5 md:gap-3">
        {sections.map(({ id, label }) => {
          const isActive = id === active
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight transition-colors duration-700 ease-out md:gap-4 md:text-4xl ${
                  isActive ? 'text-accent' : 'text-ink/30 hover:text-ink'
                }`}
              >
                {/* Space is always reserved for the line so the nav never changes width */}
                <span
                  aria-hidden="true"
                  className={`h-[2px] w-5 origin-right rounded-full bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[3px] md:w-12 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
