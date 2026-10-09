import { gsap, Observer, ScrollTrigger } from './gsap'

// Phones: scrolling down into a section happens in two steps.
//  1. The page glides so the section title sits near the top, showing only the `first` part.
//  2. The next swipe fades the `first` part out and the `second` part in, at the same spot
//     (the title stays). Then normal scrolling resumes.
// `first` and `second` must share the same place in the layout (e.g. the same grid cell).
// Call inside a gsap.matchMedia() handler; returns a cleanup function.

const STEP_DURATION = 0.7 // seconds of the automatic scroll
const STEP_PAUSE = 450 // ms during which the page stays still after each step
export const TITLE_TOP = 200 // px between the top of the screen and the title during the steps
// Height needed below the title for the tallest part (the contact form with its button):
// on short phones the title goes up so nothing gets cut
const CONTENT_BELOW_TITLE = 540
const MIN_TITLE_TOP = 100 // stays clear of the logo

export function setupMobileSteps({ title, first, second, hash }) {
  const showFirst = () => {
    gsap.set(first, { autoAlpha: 1, y: 0 })
    gsap.set(second, { autoAlpha: 0, y: 0 })
  }
  const showSecondNow = () => {
    gsap.set(first, { autoAlpha: 0, y: 0 })
    gsap.set(second, { autoAlpha: 1, y: 0 })
  }
  const showSecond = () =>
    gsap
      .timeline()
      .to(first, { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in' })
      .fromTo(second, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  showFirst()

  // Where the title sits on screen during the steps (+ the status bar strip on iPhone)
  const offset = () =>
    Math.max(MIN_TITLE_TOP, Math.min(TITLE_TOP, window.innerHeight - CONTENT_BELOW_TITLE)) +
    (document.querySelector('.status-bar-cover')?.offsetHeight ?? 0)
  const titleY = () => title.getBoundingClientRect().top + window.scrollY

  let step = 0 // 0 = normal scroll, 1 = showing the first part
  let busy = false

  const goTo = (y, done) => {
    busy = true
    const html = document.documentElement
    html.style.scrollBehavior = 'auto' // the page's CSS smooth scrolling would fight the animation
    // Stops the finger's momentum (iPhone keeps scrolling after a quick swipe) during the step
    html.style.overflow = 'hidden'
    gsap.to(window, {
      scrollTo: { y, autoKill: false },
      duration: STEP_DURATION,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => {
        html.style.scrollBehavior = ''
        setTimeout(() => {
          html.style.overflow = ''
          busy = false
          done?.()
        }, STEP_PAUSE)
      },
    })
  }

  // While enabled, swipes don't scroll the page: each one moves to the next step
  const steps = Observer.create({
    type: 'wheel,touch',
    wheelSpeed: -1,
    tolerance: 12,
    preventDefault: true,
    onUp: () => {
      // Swipe up (= scroll down): second part in place of the first, then normal scrolling
      if (busy || step !== 1) return
      step = 0
      busy = true
      showSecond().eventCallback('onComplete', () =>
        setTimeout(() => {
          busy = false
          steps.disable()
        }, STEP_PAUSE),
      )
    },
    onDown: () => {
      // Swipe down (= scroll up): step back above the section, then normal scrolling
      if (busy || step !== 1) return
      step = 0
      goTo(titleY() - window.innerHeight * 0.95, () => steps.disable())
    },
  })
  steps.disable()

  // Clicking a navbar link scrolls through the page: don't hijack that.
  // When the link targets this section, start the steps once the page has arrived.
  let navigating = false
  let navTimer
  const onAnchorClick = (event) => {
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    navigating = true
    clearTimeout(navTimer)
    navTimer = setTimeout(() => {
      navigating = false
      if (hash && link.getAttribute('href') === hash) {
        showFirst()
        step = 1
        steps.enable()
      }
    }, 1200)
  }
  document.addEventListener('click', onAnchorClick)

  const trigger = ScrollTrigger.create({
    trigger: title,
    start: 'top 85%',
    // Scrolling down, as soon as the title comes up from the bottom of the screen
    onEnter: () => {
      if (navigating) return
      showFirst()
      step = 1
      steps.enable()
      goTo(titleY() - offset())
    },
    // Coming back up from below: show the second part directly (the one closest to below)
    onEnterBack: () => {
      if (step === 0) showSecondNow()
    },
    // Back above the section: reset to the first part for the next time
    onLeaveBack: () => {
      if (step === 0 && !busy) showFirst()
    },
  })

  return () => {
    steps.kill()
    trigger.kill()
    document.removeEventListener('click', onAnchorClick)
    clearTimeout(navTimer)
    document.documentElement.style.overflow = ''
    document.documentElement.style.scrollBehavior = ''
  }
}
