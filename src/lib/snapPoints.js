import { gsap, Observer, ScrollTrigger } from './gsap'

// Phones: the page moves from "stop" to "stop" (the hero, each project card, each part of
// About and Contact). Native scrolling is turned off: each swipe plays one smooth, eased
// scroll to the next (or previous) stop. All scroll animations follow that movement exactly,
// so nothing lags behind or jumps.
//
// Each section registers a function returning its stops (page scroll positions in px, read
// from its ScrollTrigger); they're re-read every time ScrollTrigger re-measures the page.

const PHONE = '(max-width: 47.999rem)'
const MIN_DURATION = 0.45 // s, for short moves (between two project cards)
const MAX_DURATION = 0.95 // s, for long moves (hero → projects)
const COOLDOWN = 250 // ms after each move before the next swipe is taken into account

const providers = new Set()
let stops = [0]

function readStops() {
  stops = [...new Set([0, ...[...providers].flatMap((get) => get()).map(Math.round)])]
    .filter((y) => Number.isFinite(y) && y >= 0)
    .sort((a, b) => a - b)
}
ScrollTrigger.addEventListener('refresh', readStops)

// Returns an unregister function (for cleanups)
export function registerSnapPoints(getStops) {
  providers.add(getStops)
  ScrollTrigger.refresh()
  return () => {
    providers.delete(getStops)
    readStops()
  }
}

// Section anchors (#home, #projects…) → the stop where each section starts
const anchorStop = (hash) => {
  const section = document.querySelector(hash)
  if (!section) return null
  const top = section.getBoundingClientRect().top + window.scrollY
  return stops.find((y) => y >= top - 4) ?? stops[stops.length - 1]
}

let moving = false

function scrollToStop(y) {
  if (moving) return
  moving = true
  const html = document.documentElement
  html.style.scrollBehavior = 'auto' // the page's CSS smooth scrolling would fight the tween
  const distance = Math.abs(y - window.scrollY)
  gsap.to(window, {
    scrollTo: { y, autoKill: false },
    duration: gsap.utils.clamp(MIN_DURATION, MAX_DURATION, 0.4 + distance / 1800),
    ease: 'power2.inOut',
    overwrite: true,
    onComplete: () => {
      html.style.scrollBehavior = ''
      setTimeout(() => (moving = false), COOLDOWN)
    },
  })
}

const nextStop = () => stops.find((y) => y > window.scrollY + 2)
const previousStop = () => [...stops].reverse().find((y) => y < window.scrollY - 2)

gsap.matchMedia().add(PHONE, () => {
  document.documentElement.classList.add('stepped-scroll')

  const swipes = Observer.create({
    target: window,
    type: 'touch,wheel',
    wheelSpeed: -1,
    tolerance: 8, // finger travel (px) needed before a swipe counts
    preventDefault: true, // no native scrolling
    // Don't hijack swipes inside the message field (it scrolls its own text)
    ignore: 'textarea',
    onUp: () => {
      const y = nextStop()
      if (y !== undefined) scrollToStop(y)
    },
    onDown: () => {
      const y = previousStop()
      if (y !== undefined) scrollToStop(y)
    },
  })

  // Navbar / logo / "Back to top" links: glide to the section's first stop
  const onAnchorClick = (event) => {
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    const y = link.getAttribute('href') === '#' ? 0 : anchorStop(link.getAttribute('href'))
    if (y === null) return
    event.preventDefault()
    moving = false
    scrollToStop(y)
  }
  document.addEventListener('click', onAnchorClick, true)

  return () => {
    swipes.kill()
    document.removeEventListener('click', onAnchorClick, true)
    document.documentElement.classList.remove('stepped-scroll')
  }
})
