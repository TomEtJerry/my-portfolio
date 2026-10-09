import { gsap } from './gsap'

// Phones: a section shows its content in two parts, one after the other, at the same spot
// under the title. When the section reaches the top of the screen it stays in place (pinned)
// for a short scroll, during which the first part fades out and the second fades in,
// following the finger. If the scroll stops in between, it settles on one of the two parts.
// Uses the browser's own scrolling only (no swipe interception), so it behaves like normal
// scrolling in both directions.
// `first` and `second` must share the same place in the layout (e.g. the same grid cell).
// Call inside a gsap.matchMedia() handler; returns a cleanup function.

// Total scroll while the section is pinned, in screen heights. It includes a hold before the
// swap and a hold after it, so it takes a bit more than one swipe to move from one part (or
// section) to the next — like the project cards.
const PIN_DISTANCE = 1.5
// Timeline positions (0 → 1 over the pinned scroll)
const SWAP_START = 0.28 // first part stays until here
const SWAP_END = 0.62 // second part fully shown from here (then stays until the section leaves)

export function setupMobileSteps({ pin, first, second }) {
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: pin,
      pin,
      start: 'top top',
      end: () => `+=${window.innerHeight * PIN_DISTANCE}`,
      scrub: 0.3,
      invalidateOnRefresh: true,
      // Stopped in the middle of the swap: settle on the first or the second part.
      // Elsewhere (during the holds) leave the scroll where it is.
      snap: {
        snapTo: (value) =>
          value > SWAP_START && value < SWAP_END
            ? value < (SWAP_START + SWAP_END) / 2
              ? SWAP_START
              : SWAP_END
            : value,
        duration: { min: 0.2, max: 0.5 },
        delay: 0.08,
        ease: 'power1.inOut',
      },
    },
  })

  // First part stays, crossfade, second part stays
  const half = (SWAP_END - SWAP_START) / 2
  tl.fromTo(first, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -24, duration: half }, SWAP_START)
  tl.fromTo(second, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: half }, SWAP_START + half)
  tl.to({}, { duration: 1 - SWAP_END }, SWAP_END)

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    gsap.set([first, second], { clearProps: 'opacity,visibility,transform' })
  }
}
