import { useRef } from 'react'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import { projectImage } from '../lib/projectImages'

// Compares two screens of the same size: the "before" image covers the "after" one up to a handle.
// While the visitor scrolls past it, the handle sweeps from right to left, revealing the new version.
// It can also be dragged (mouse or finger) or moved with the keyboard; from then on the scroll
// leaves it where the visitor put it.
function BeforeAfter({ before, after, beforeLabel = 'Before', afterLabel = 'After' }) {
  const box = useRef(null)
  const input = useRef(null)
  const touched = useRef(false)
  const beforeSrc = projectImage(before)
  const afterSrc = projectImage(after)

  // Position of the handle, in % from the left (written straight to a CSS variable: no re-render)
  const setPos = (pct) => {
    const value = Math.min(100, Math.max(0, pct))
    box.current?.style.setProperty('--pos', `${value}%`)
    if (input.current) input.current.value = Math.round(value)
  }

  useGSAP(
    () => {
      if (!beforeSrc || !afterSrc) return
      setPos(100)
      ScrollTrigger.create({
        trigger: box.current,
        start: 'top 75%',
        end: 'bottom 35%',
        onUpdate: (self) => {
          if (!touched.current) setPos(100 - self.progress * 100)
        },
      })
    },
    { scope: box },
  )

  if (!beforeSrc || !afterSrc)
    return (
      <div className="grid aspect-[16/9] place-items-center rounded-2xl border-2 border-dashed border-ink/15 bg-sand text-sm font-medium text-ink/40 md:rounded-3xl">
        Visuals coming soon
      </div>
    )

  const fromPointer = (event) => {
    const rect = box.current.getBoundingClientRect()
    setPos(((event.clientX - rect.left) / rect.width) * 100)
  }

  return (
    <div
      ref={box}
      // touch-action pan-y: a vertical swipe still scrolls the page, a horizontal one moves the handle
      className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-sand shadow-[0_40px_80px_-40px_rgba(26,20,16,0.4)] ring-1 ring-ink/10 [--pos:100%] md:rounded-3xl"
      onPointerDown={(event) => {
        touched.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        fromPointer(event)
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) fromPointer(event)
      }}
    >
      <img src={afterSrc} alt={`${afterLabel} the redesign`} draggable="false" className="block h-auto w-full" />
      <img
        src={beforeSrc}
        alt={`${beforeLabel} the redesign`}
        draggable="false"
        className="absolute inset-0 size-full object-cover [clip-path:inset(0_calc(100%-var(--pos))_0_0)]"
      />

      {/* Labels, in the top corners */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-paper backdrop-blur md:left-5 md:top-5 md:text-xs">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-paper md:right-5 md:top-5 md:text-xs">
        {afterLabel}
      </span>

      {/* Handle: a line and a round knob */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[var(--pos)] w-[3px] -translate-x-1/2 bg-paper shadow-[0_0_12px_rgba(26,20,16,0.35)]">
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-paper shadow-[0_8px_20px_-6px_rgba(26,20,16,0.5)] ring-4 ring-paper md:size-14">
          <svg viewBox="0 0 24 24" className="size-5 md:size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>

      {/* Keyboard and screen readers: an invisible slider driving the same handle */}
      <input
        ref={input}
        type="range"
        min="0"
        max="100"
        defaultValue="100"
        aria-label="Compare the dashboard before and after the redesign"
        onChange={(event) => {
          touched.current = true
          setPos(Number(event.target.value))
        }}
        className="sr-only"
      />
    </div>
  )
}

export default BeforeAfter
