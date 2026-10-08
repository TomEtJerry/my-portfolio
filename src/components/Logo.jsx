import { useState } from 'react'
import logo from '../assets/logo.svg'
import { ScrollTrigger, useGSAP } from '../lib/gsap'

// Three parallel slanted lines (like backslashes) along the left side of the logo.
// Drawn as parallelograms so their ends are flat (horizontal), not cut on the slant.
// Fainter as they move away from the logo.
const SPACING = 6.5 // horizontal distance between two lines
const THICKNESS = 3.5 // horizontal width of each line
const SLANT = 9 // horizontal distance covered by each line from top to bottom
const HEIGHT = 56
const SLASHES = [
  { x: 0, opacity: 0.3 },
  { x: SPACING, opacity: 0.6 },
  { x: SPACING * 2, opacity: 1 },
]

function Slashes() {
  return (
    <svg
      viewBox={`0 0 ${SPACING * 2 + THICKNESS + SLANT} ${HEIGHT}`}
      aria-hidden="true"
      className="h-9 w-auto shrink-0 fill-accent md:h-14"
    >
      {SLASHES.map(({ x, opacity }) => (
        <polygon
          key={x}
          points={`${x},0 ${x + THICKNESS},0 ${x + THICKNESS + SLANT},${HEIGHT} ${x + SLANT},${HEIGHT}`}
          opacity={opacity}
        />
      ))}
    </svg>
  )
}

function Logo({ href = '#home' }) {
  const [scrolled, setScrolled] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      start: 10,
      end: 'max',
      onToggle: (self) => setScrolled(self.isActive),
    })
  })

  return (
    <a href={href} aria-label={href === '#home' ? 'Back to top' : 'Home'} className="fixed left-[var(--page-offset)] top-0 z-50 p-5 md:p-12">
      {/* Soft fade so the logo stays readable over images — reaches the screen edge.
          On mobile it only shows once scrolled, so it doesn't tint the projects block. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-16 -right-32 left-[calc(-1*var(--page-offset))] top-0 transition-opacity duration-700 md:opacity-100 ${scrolled ? 'opacity-100' : 'opacity-0'} bg-[radial-gradient(ellipse_100%_100%_at_top_left,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_85%,transparent)_35%,color-mix(in_srgb,var(--color-paper)_35%,transparent)_65%,transparent_100%)]`}
      />
      <span className="group relative flex items-stretch gap-1 md:gap-1.5">
        <Slashes />
        <img src={logo} alt="Logo" className="h-9 w-auto md:h-14" />
      </span>
    </a>
  )
}

export default Logo
