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
// Short wait after each move before the next swipe is taken into account, so steps (e.g. the
// project cards) don't follow each other too quickly. Swipes made during it are ignored.
const COOLDOWN = 250 // ms

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
let glide = null // the current move
let queued = null // a swipe kept for later: () => stop position
// Share of the move after which a new swipe is kept (and played after the wait) rather than
// ignored: at the end of a move the card already looks in place, so the user swipes again
const QUEUE_FROM = 0.5

function scrollToStop(y) {
  if (moving) return
  moving = true
  const html = document.documentElement
  html.style.scrollBehavior = 'auto' // the page's CSS smooth scrolling would fight the tween
  const distance = Math.abs(y - window.scrollY)
  glide = gsap.to(window, {
    scrollTo: { y, autoKill: false },
    duration: gsap.utils.clamp(MIN_DURATION, MAX_DURATION, 0.4 + distance / 1800),
    // Starts at full speed right after the swipe, slows down only on arrival
    ease: 'power3.out',
    overwrite: true,
    onComplete: () => {
      html.style.scrollBehavior = ''
      glide = null
      setTimeout(() => {
        moving = false
        if (queued) {
          const getStop = queued
          queued = null
          const next = getStop()
          if (next !== undefined) scrollToStop(next)
        }
      }, COOLDOWN)
    },
  })
}

const nextStop = () => stops.find((y) => y > window.scrollY + 2)
const previousStop = () => [...stops].reverse().find((y) => y < window.scrollY - 2)

gsap.matchMedia().add(PHONE, () => {
  document.documentElement.classList.add('stepped-scroll')

  // One swipe = one step: a gesture counts once, as soon as the finger starts moving, however
  // long it drags. A new gesture starts when the finger touches the screen again (or after a
  // pause in wheel/trackpad input).
  let gestureUsed = false
  const onSwipe = (getStop) => {
    if (gestureUsed) return
    gestureUsed = true
    if (moving) {
      // Early in a move: ignored (keeps steps from following each other too fast).
      // Near the end of the move or during the wait: kept and played right after the wait.
      if (!glide || glide.progress() >= QUEUE_FROM) queued = getStop
      return
    }
    const y = getStop()
    if (y !== undefined) scrollToStop(y)
  }

  const swipes = Observer.create({
    target: window,
    type: 'touch,wheel',
    wheelSpeed: -1,
    tolerance: 8, // finger travel (px) needed before a swipe counts
    preventDefault: true, // no native scrolling
    // Don't hijack swipes inside the message field (it scrolls its own text)
    ignore: 'textarea',
    onStop: () => (gestureUsed = false),
    stopDelay: 0.15,
    onUp: () => onSwipe(nextStop),
    onDown: () => onSwipe(previousStop),
  })

  // A new gesture starts each time a finger touches the screen
  const onTouchStart = () => (gestureUsed = false)
  window.addEventListener('touchstart', onTouchStart, { passive: true })

  // Navbar / logo / "Back to top" links: glide to the section's first stop
  const onAnchorClick = (event) => {
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    const y = link.getAttribute('href') === '#' ? 0 : anchorStop(link.getAttribute('href'))
    if (y === null) return
    event.preventDefault()
    queued = null
    moving = false
    scrollToStop(y)
  }
  document.addEventListener('click', onAnchorClick, true)

  return () => {
    swipes.kill()
    window.removeEventListener('touchstart', onTouchStart)
    document.removeEventListener('click', onAnchorClick, true)
    document.documentElement.classList.remove('stepped-scroll')
  }
})
