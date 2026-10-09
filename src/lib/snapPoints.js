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
// Minimum time between the start of two steps, so steps (e.g. the project cards) don't follow
// each other too quickly. A swipe made sooner is played as soon as this time is up.
const MIN_INTERVAL = 550 // ms
// Share of a move before which a new swipe is ignored (it's most likely the same gesture going
// on); after it, the swipe is kept and played as soon as possible
const IGNORE_UNTIL = 0.35

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

let glide = null // the current move
let target = null // where the current move is going
let lastStart = -Infinity // when the last move started (ms)
let pending = null // timer of a swipe waiting for MIN_INTERVAL

function glideTo(y) {
  const html = document.documentElement
  html.style.scrollBehavior = 'auto' // the page's CSS smooth scrolling would fight the tween
  target = y
  lastStart = performance.now()
  const distance = Math.abs(y - window.scrollY)
  // Starts at full speed right after the swipe, slows down only on arrival. A new step can
  // interrupt the end of that slow-down and continue straight from where the page is.
  glide = gsap.to(window, {
    scrollTo: { y, autoKill: false },
    duration: gsap.utils.clamp(MIN_DURATION, MAX_DURATION, 0.4 + distance / 1800),
    ease: 'power2.out',
    overwrite: true,
    onComplete: () => {
      html.style.scrollBehavior = ''
      glide = null
      target = null
    },
  })
}

// Next / previous stop, counted from where the page is going (not where it is mid-move)
const stopAfter = (from) => stops.find((y) => y > from + 2)
const stopBefore = (from) => [...stops].reverse().find((y) => y < from - 2)

function step(direction) {
  if (glide && glide.progress() < IGNORE_UNTIL) return
  clearTimeout(pending)
  const go = () => {
    const from = target ?? window.scrollY
    const y = direction > 0 ? stopAfter(from) : stopBefore(from)
    if (y !== undefined) glideTo(y)
  }
  const wait = lastStart + MIN_INTERVAL - performance.now()
  if (wait > 0) pending = setTimeout(go, wait)
  else go()
}

gsap.matchMedia().add(PHONE, () => {
  document.documentElement.classList.add('stepped-scroll')

  // One swipe = one step: a gesture counts once, as soon as the finger starts moving, however
  // long it drags. A new gesture starts when the finger touches the screen again (or after a
  // pause in wheel/trackpad input).
  let gestureUsed = false
  const onSwipe = (direction) => {
    if (gestureUsed) return
    gestureUsed = true
    step(direction)
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
    onUp: () => onSwipe(1),
    onDown: () => onSwipe(-1),
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
    clearTimeout(pending)
    glideTo(y)
  }
  document.addEventListener('click', onAnchorClick, true)

  return () => {
    swipes.kill()
    clearTimeout(pending)
    window.removeEventListener('touchstart', onTouchStart)
    document.removeEventListener('click', onAnchorClick, true)
    document.documentElement.classList.remove('stepped-scroll')
  }
})
