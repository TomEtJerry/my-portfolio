import { ScrollTrigger } from './gsap'

// Phones: the page always comes to rest on one of a list of "stops" (the hero, each project
// card, each part of About and Contact). It uses the browser's native scroll snapping
// (see `.snap-point` in index.css), which is smooth on iPhone and can't skip a stop.
//
// Each section registers a function returning its stops (page scroll positions in px, read
// from its ScrollTrigger). Invisible 1px markers are placed at those positions, and rebuilt
// every time ScrollTrigger re-measures the page.

const providers = new Set()
let layer

function rebuild() {
  if (!layer) {
    layer = document.createElement('div')
    layer.setAttribute('aria-hidden', 'true')
    layer.className = 'snap-points'
    document.body.appendChild(layer)
  }
  const stops = [...new Set([0, ...[...providers].flatMap((get) => get()).map(Math.round)])]
    .filter((y) => Number.isFinite(y) && y >= 0)
    .sort((a, b) => a - b)
  layer.replaceChildren(
    ...stops.map((y) => {
      const point = document.createElement('div')
      point.className = 'snap-point'
      point.style.top = `${y}px`
      return point
    }),
  )
}

ScrollTrigger.addEventListener('refresh', rebuild)

// Returns an unregister function (for cleanups)
export function registerSnapPoints(getStops) {
  providers.add(getStops)
  ScrollTrigger.refresh()
  return () => {
    providers.delete(getStops)
    rebuild()
  }
}
