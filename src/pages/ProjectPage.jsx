import { useEffect, useRef } from 'react'
import Logo from '../components/Logo'
import { EndBand, Eyebrow, Lead, SectionTitle } from '../components/PageParts'
import ResponsiveImage from '../components/ResponsiveImage'
import Visual from '../components/Visual'
import BeforeAfter from '../components/BeforeAfter'
import { projectVideo } from '../lib/projectImages'
import { projects } from '../data/projects'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

// Desktop: scroll distance (in screen heights) during which the approach section stays in place
// while its timeline fills
const PIN_SCROLL = 1.2

// Phone screens: thin dark bezel and rounded corners
const PHONE_FRAME =
  'aspect-[9/19.5] !rounded-[28px] border-[6px] border-ink shadow-[0_30px_60px_-30px_rgba(26,20,16,0.45)] md:!rounded-[36px]'
// Desktop screens
const SCREEN_FRAME = 'aspect-[16/9] shadow-[0_40px_80px_-40px_rgba(26,20,16,0.4)] ring-1 ring-ink/10'

const Phone = ({ visual }) => <Visual {...visual} fitWidth className={PHONE_FRAME} />

// Phone screens: one alone in the middle, or the first one large in the middle with the others around
function PhoneGallery({ visuals }) {
  if (visuals.length === 1)
    return (
      <div className="mx-auto w-3/5 max-w-xs">
        <Phone visual={visuals[0]} />
      </div>
    )
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 items-start gap-6 md:grid-cols-3 md:gap-10 lg:gap-14">
      {visuals.map((visual, i) => (
        <div
          key={visual.file}
          className={
            i === 0
              ? 'col-span-2 mx-auto w-3/5 md:order-2 md:col-span-1 md:w-full md:scale-110'
              : i === 1
                ? 'md:order-1'
                : 'md:order-3'
          }
        >
          <Phone visual={visual} />
        </div>
      ))}
    </div>
  )
}

function DesktopGallery({ visuals }) {
  return (
    // w-full: scrollable frames have no width of their own, they must stretch to the column
    <div className="mx-auto grid w-full max-w-5xl gap-14 md:gap-20">
      {visuals.map((visual) => (
        <Visual key={visual.file} {...visual} fitWidth className={SCREEN_FRAME} />
      ))}
    </div>
  )
}

// One desktop screen and one phone screen. Large screens: the phone overlaps the right edge of
// the desktop screen. Smaller screens: the phone first, then the desktop screen.
function DeviceDuo({ phone, screen }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-14 lg:relative lg:block">
      <div className="mx-auto w-3/5 max-w-xs lg:absolute lg:right-0 lg:top-1/2 lg:z-10 lg:w-[21%] lg:max-w-none lg:-translate-y-1/2">
        <Phone visual={phone} />
      </div>
      <div className="lg:w-[82%]">
        <Visual {...screen} className={SCREEN_FRAME} />
      </div>
    </div>
  )
}

// A screen recording: plays (muted, looping) only while it's on screen
function ShowcaseVideo({ file, caption }) {
  const video = useRef(null)
  const src = projectVideo(file)

  useEffect(() => {
    const el = video.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [src])

  if (!src) return <Visual file={file} caption={caption} className={SCREEN_FRAME} />
  return (
    <figure>
      <div className={`overflow-hidden rounded-2xl bg-sand md:rounded-3xl ${SCREEN_FRAME} !aspect-auto`}>
        {/* #t=0.001: makes iOS show the first frame instead of an empty box before it plays */}
        <video ref={video} src={`${src}#t=0.001`} muted loop playsInline autoPlay preload="metadata" aria-label={caption} className="block h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink/60 md:mt-4">{caption}</figcaption>}
    </figure>
  )
}

// Small "Mobile" / "Desktop" label above a group of screens
const DeviceLabel = ({ children }) => (
  <p className="mb-8 mt-14 font-display text-sm font-bold uppercase tracking-[0.2em] text-ink/40 md:mb-10 md:mt-20">
    {children}
  </p>
)

// One side of a before / after comparison: beige and tilted left before the tests,
// dark and tilted right after (it overlaps the "before" card)
function TestingCard({ file, text, after = false }) {
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-[20px] p-5 shadow-[0_30px_60px_-30px_rgba(26,20,16,0.45)] md:gap-5 md:rounded-[28px] md:p-8 ${
        after
          ? 'z-10 -mt-4 rotate-1 bg-ink text-paper md:mt-0 md:-ml-6 md:rotate-2'
          : '-rotate-1 bg-sand text-ink md:-rotate-2'
      }`}
    >
      <Visual
        file={file}
        alt={after ? 'Interface after the tests' : 'Interface before the tests'}
        fitWidth
        className="aspect-[3/1] !rounded-xl ring-1 ring-ink/10"
      />
      <span
        className={`self-start rounded-full px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] md:text-xs ${
          after ? 'bg-accent text-paper' : 'bg-ink/10 text-ink/70'
        }`}
      >
        {after ? 'After adjustment' : 'Before testing'}
      </span>
      <p className={`text-[0.9375rem] leading-relaxed md:text-lg ${after ? 'text-paper/80' : 'text-ink/75'}`}>
        {text}
      </p>
    </div>
  )
}

function ProjectPage({ project }) {
  const page = useRef(null)
  const timeline = useRef(null)
  const approach = useRef(null)
  const study = project.caseStudy
  const meta = [...study.meta, { label: 'Year', value: project.year }]

  // Next project that has its own page (loops back to the first one)
  const withPage = projects.filter((p) => p.caseStudy && !p.caseStudy.draft)
  const next = withPage[(withPage.indexOf(project) + 1) % withPage.length]
  const hasNext = next && next !== project

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${project.title} — Tom Santoni`
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [project.title])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero: everything comes in together on load
        gsap.from('.hero-in', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
        gsap.from('.hero-visual', { scale: 0.94, opacity: 0, duration: 1.2, ease: 'power3.out' })

        // Each section rises and fades in once, as it comes into view (like the home page). Played
        // as a short animation rather than tied to the scroll: nothing is recomputed while the
        // finger scrolls, which kept phones from scrolling smoothly.
        gsap.utils.toArray('[data-reveal]').forEach((section) => {
          gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 85%', once: true },
          })
        })
      })

      // Approach timeline: an orange line fills with the scroll and lights each step's dot as it
      // reaches it. Vertical on phones and tablets, horizontal (steps side by side) on desktop.
      const steps = gsap.utils.toArray('[data-step]', timeline.current)
      const dots = steps.map((step) => step.querySelector('[data-dot]'))
      const track = timeline.current.querySelector('[data-track]')
      const fill = timeline.current.querySelector('[data-fill]')

      const setupTimeline = (horizontal) => {
        // The track runs from the center of the first dot to the center of the last one
        const placeTrack = () => {
          const box = timeline.current.getBoundingClientRect()
          const center = (dot) => {
            const r = dot.getBoundingClientRect()
            return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
          }
          const first = center(dots[0])
          const last = center(dots[dots.length - 1])
          Object.assign(track.style, {
            left: `${horizontal ? first.x : first.x - 1}px`,
            top: `${horizontal ? first.y - 1 : first.y}px`,
            width: horizontal ? `${Math.max(last.x - first.x, 1)}px` : '2px',
            height: horizontal ? '2px' : `${Math.max(last.y - first.y, 1)}px`,
          })
        }
        gsap.set(fill, horizontal
          ? { scaleX: 0, scaleY: 1, transformOrigin: 'left center' }
          : { scaleY: 0, scaleX: 1, transformOrigin: 'center top' })
        placeTrack()
        ScrollTrigger.addEventListener('refreshInit', placeTrack)

        // Fill the line and light the dots for a given progress (0 → 1)
        // (cheap on every scroll frame: one transform, and the dots only change when they're reached)
        const setFill = gsap.quickSetter(fill, horizontal ? 'scaleX' : 'scaleY')
        let litCount = -1
        const render = (progress) => {
          setFill(progress)
          const lit = steps.filter((_, i) => progress >= i / Math.max(steps.length - 1, 1) - 0.001).length
          if (lit === litCount) return
          litCount = lit
          steps.forEach((step, i) => step.classList.toggle('is-active', i < lit))
        }

        if (horizontal) {
          // Desktop: the section stays in place (pinned) while the line fills, so the scroll
          // goes into the timeline instead of moving the page. The line is complete at 85% of
          // the pinned scroll; the rest is a short pause on the finished timeline.
          ScrollTrigger.create({
            trigger: approach.current,
            pin: approach.current,
            // Centered on screen, or from its top if it's taller than the screen
            start: () =>
              approach.current.offsetHeight > window.innerHeight ? 'top top' : 'center center',
            end: () => `+=${window.innerHeight * PIN_SCROLL}`,
            scrub: true,
            // Starts pinning a hair early when scrolling fast, so it doesn't land with a jolt
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Measured first: the sections below are pushed down by the pinned scroll, and their
            // own scroll animations must take that into account
            refreshPriority: 1,
            onUpdate: (self) => render(Math.min(self.progress / 0.85, 1)),
          })
        } else {
          ScrollTrigger.create({
            trigger: timeline.current,
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: true,
            onUpdate: (self) => render(self.progress),
          })
        }

        return () => ScrollTrigger.removeEventListener('refreshInit', placeTrack)
      }

      mm.add('(min-width: 64rem)', () => setupTimeline(true))
      mm.add('(max-width: 63.999rem)', () => setupTimeline(false))
    },
    { scope: page },
  )

  return (
    // overflow-x-clip: the hero glow spreads past the screen edge; clip it so the page never
    // scrolls sideways (clip, unlike hidden, keeps the fixed logo and back link working)
    <div ref={page} className="overflow-x-clip font-sans">
      <Logo href="/" />

      {/* Back link (top right, where the navbar sits on the home page) */}
      <a
        href="/#projects"
        className="fixed right-[var(--page-offset)] top-[var(--safe-top)] z-50 m-5 rounded-full bg-paper/80 px-4 py-2 font-display text-base font-bold tracking-tight text-ink/60 backdrop-blur-md transition-colors hover:text-accent md:m-12 md:text-xl"
      >
        ← All projects
      </a>

      <main>
        {/* ===== HERO: visual + project info ===== */}
        <section className="mx-auto grid max-w-page items-center gap-7 px-5 pb-8 pt-[calc(5.5rem+var(--safe-top))] max-md:flex max-md:min-h-[100svh] max-md:flex-col max-md:items-stretch max-md:[@media(max-height:720px)]:pt-[calc(5rem+var(--safe-top))] md:gap-10 md:px-12 md:pb-24 md:pt-40 lg:min-h-screen lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-32">
          {/* Visual with a soft orange glow behind it */}
          {/* Phones: takes all the height left above the text, so the hero fills the screen */}
          <div className="relative max-md:flex max-md:min-h-36 max-md:flex-1 max-md:flex-col lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_28%,transparent),transparent)] blur-2xl md:-inset-14"
            />
            <div className="hero-visual relative overflow-hidden rounded-[20px] max-md:flex-1 md:aspect-[4/3] bg-sand shadow-[0_40px_80px_-40px_rgba(26,20,16,0.45)] ring-1 ring-ink/10 md:rounded-[32px]">
              <ResponsiveImage
                image={project.image}
                alt={project.title}
                priority
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover object-left"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:order-1">
            <div className="hero-in">
              <Eyebrow>{project.category}</Eyebrow>
            </div>
            <h1 className="hero-in mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight md:mt-5 md:text-7xl xl:text-8xl">
              {project.title}
            </h1>
            <p className="hero-in mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ink/70 md:mt-8 md:text-xl">
              {study.intro}
            </p>
            <dl className="hero-in mt-6 grid grid-cols-4 gap-x-3 border-t border-ink/10 pt-4 md:mt-12 md:gap-x-6 md:pt-6">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.625rem] font-medium uppercase tracking-[0.15em] text-ink/50 md:text-xs md:tracking-[0.2em]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-sm font-medium leading-tight md:mt-2 md:text-xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ===== APPROACH: scroll-filled timeline ===== */}
        <section
          ref={approach}
          className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28"
        >
          {/* The fade-in moves this inner block, not the section: the section gets pinned on
              desktop, and moving it at the same time made the page jump when the pin started */}
          <div data-reveal>
            <Eyebrow>The approach</Eyebrow>
            <SectionTitle>{study.approach.title}</SectionTitle>
            {/* Short context, so the steps can be understood on their own */}
            {study.approach.intro && <Lead>{study.approach.intro}</Lead>}

            <ol ref={timeline} className="relative mt-12 md:mt-16 lg:grid lg:grid-cols-4 lg:gap-10 xl:gap-14">
              {/* Track (between the first and the last dot) and its orange fill */}
              <span
                aria-hidden="true"
                data-track
                className="absolute overflow-hidden rounded-full bg-ink/10"
              >
                <span data-fill className="absolute inset-0 bg-accent" />
              </span>

              {study.approach.steps.map((step, i) => (
                <li
                  key={step.title}
                  data-step
                  className="group relative grid grid-cols-[1.5rem_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-[2rem_1fr] md:gap-8 md:pb-16 lg:grid-cols-1 lg:content-start lg:gap-7 lg:pb-0"
                >
                  {/* Dot: outlined, filled orange once the line reaches it */}
                  <span data-dot className="relative z-10 mt-0.5 size-6 rounded-full border-2 border-accent bg-paper transition-[background-color,box-shadow] duration-500 group-[.is-active]:bg-accent group-[.is-active]:shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] md:size-8" />
                  <div>
                    <span className="font-display text-sm tabular-nums text-ink/40 transition-colors duration-500 group-[.is-active]:text-accent">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold tracking-tight md:text-3xl lg:text-2xl xl:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/70 md:mt-3 md:text-lg lg:text-base xl:text-lg">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== BEFORE / AFTER: slider between the old and the new version ===== */}
        {study.comparison && (
          <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
            <Eyebrow>Before / after</Eyebrow>
            <SectionTitle>{study.comparison.title}</SectionTitle>
            <Lead>{study.comparison.text}</Lead>
            <div className="mx-auto mt-12 max-w-5xl md:mt-16">
              <BeforeAfter before={study.comparison.before} after={study.comparison.after} />
              <p className="mt-3 text-sm text-ink/60 md:mt-4">Drag the handle, or keep scrolling, to compare</p>
            </div>
          </section>
        )}

        {/* ===== MOBILE SHOWCASE: the main screen large in the middle, the two others around ===== */}
        {study.mobile && (
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>{study.mobile.eyebrow ?? 'The mobile experience'}</Eyebrow>
          <SectionTitle>{study.mobile.title}</SectionTitle>
          <Lead>{study.mobile.text}</Lead>
          <div className="mt-12 md:mt-16">
            <PhoneGallery visuals={study.mobile.visuals} />
          </div>
        </section>
        )}

        {/* ===== DESKTOP SHOWCASE ===== */}
        {study.desktop && (
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>The desktop experience</Eyebrow>
          <SectionTitle>{study.desktop.title}</SectionTitle>
          <Lead>{study.desktop.text}</Lead>
          <div className="mt-12 md:mt-16">
            <DesktopGallery visuals={study.desktop.visuals} />
          </div>
        </section>
        )}

        {/* ===== SHOWCASES: one section per part of the project, each with its mobile and desktop screens ===== */}
        {study.showcases?.map((showcase) => (
          <section key={showcase.title} data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
            <Eyebrow>{showcase.eyebrow}</Eyebrow>
            <SectionTitle>{showcase.title}</SectionTitle>
            <Lead>{showcase.text}</Lead>
            {showcase.visuals ? (
              // Desktop screens only, with an optional recording first
              <div className="mx-auto mt-12 grid max-w-5xl gap-14 md:mt-16 md:gap-20">
                {showcase.video && <ShowcaseVideo {...showcase.video} />}
                <DesktopGallery visuals={showcase.visuals} />
              </div>
            ) : showcase.mobile.length === 1 && showcase.desktop.length === 1 ? (
              <div className="mt-12 md:mt-16">
                <DeviceDuo phone={showcase.mobile[0]} screen={showcase.desktop[0]} />
              </div>
            ) : (
              <>
                <DeviceLabel>Mobile</DeviceLabel>
                <PhoneGallery visuals={showcase.mobile} />
                <DeviceLabel>Desktop</DeviceLabel>
                <DesktopGallery visuals={showcase.desktop} />
              </>
            )}
          </section>
        ))}

        {/* ===== USER TESTING: what changed after the tests, as before / after cards ===== */}
        {study.testing && (
          <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
            <Eyebrow>User testing</Eyebrow>
            <SectionTitle>{study.testing.title}</SectionTitle>
            <Lead>{study.testing.text}</Lead>
            <div className="mx-auto mt-12 grid max-w-6xl gap-16 md:mt-16 md:gap-24">
              {study.testing.changes.map((change) => (
                // The two cards are slightly tilted and overlap, the "after" one on top
                <div key={change.before.file} className="grid md:grid-cols-2 md:px-6">
                  <TestingCard {...change.before} />
                  <TestingCard {...change.after} after />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== KEY FIGURES ===== */}
        <section data-reveal className="mx-auto max-w-page px-5 py-16 md:px-12 md:py-28">
          <Eyebrow>Key figures</Eyebrow>
          <div className="mt-8 border-t border-ink/10 md:mt-10">
            {study.results.map((result) => (
              <div
                key={result.text}
                className="grid items-center gap-2 border-b border-ink/10 py-6 md:grid-cols-[14rem_1fr] md:gap-10 md:py-8"
              >
                <span className="font-display text-4xl font-bold text-accent md:text-7xl">
                  {result.value}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-ink/70 md:text-xl">{result.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== NEXT PROJECT (or back to all projects) ===== */}
      <EndBand
        href={hasNext ? `/projects/${next.slug}` : '/#projects'}
        label={hasNext ? 'Next project' : 'Keep exploring'}
        title={hasNext ? next.title : 'All projects'}
      />
    </div>
  )
}

export default ProjectPage
