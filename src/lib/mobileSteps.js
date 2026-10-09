import { gsap } from './gsap'

// Phones: a section shows its content in two parts, one after the other, at the same spot
// under the title. When the section reaches the top of the screen it stays in place (pinned)
// for a short scroll, during which the first part fades out and the second fades in,
// following the finger. If the scroll stops in between, it settles on one of the two parts.
// Uses the browser's own scrolling only (no swipe interception), so it behaves like normal
// scrolling in both directions.
// `first` and `second` must share the same place in the layout (e.g. the same grid cell).
// Call inside a gsap.matchMedia() handler; returns a cleanup function.

const SWAP_DISTANCE = 0.7 // scroll needed to go from the first to the second part, in screen heights

export function setupMobileSteps({ pin, first, second }) {
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: pin,
      pin,
      start: 'top top',
      end: () => `+=${window.innerHeight * SWAP_DISTANCE}`,
      scrub: 0.3,
      invalidateOnRefresh: true,
      // Settle on the first or the second part, never in between
      snap: { snapTo: [0, 1], duration: { min: 0.2, max: 0.5 }, delay: 0.08, ease: 'power1.inOut' },
    },
  })

  // First part stays a moment, crossfade in the middle, second part stays a moment
  tl.fromTo(first, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -24, duration: 0.35 }, 0.15)
  tl.fromTo(second, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.45)
  tl.to({}, { duration: 0.2 }, 0.8)

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    gsap.set([first, second], { clearProps: 'opacity,visibility,transform' })
  }
}
