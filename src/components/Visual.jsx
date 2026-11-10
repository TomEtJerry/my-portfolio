import { useState } from 'react'
import { projectImage } from '../lib/projectImages'

// A project visual. Until its file exists in src/assets/projects/, shows a placeholder.
// - alt: description of the image (defaults to the caption)
// - fitWidth: the whole image is shown at the frame's width, and the frame takes the image's
//   height — for phone screens, where cutting the sides would hide content
// - scroll: a full-page screenshot (much taller than the frame) — the frame keeps its shape and
//   the visitor scrolls inside it; a small hint shows until they do
function Visual({ file, caption, alt = caption, className = '', fitWidth = false, scroll = false }) {
  const src = projectImage(file)
  const [scrolled, setScrolled] = useState(false)

  return (
    <figure>
      {/* fitWidth + an image: the frame takes the image's own height (no empty band) */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-sand md:rounded-3xl ${className} ${
          fitWidth && src && !scroll ? '!aspect-auto' : ''
        }`}
      >
        {src && scroll ? (
          <>
            <div
              tabIndex={0}
              aria-label={`${alt} (scrollable)`}
              onScroll={() => setScrolled(true)}
              className="absolute inset-0 overflow-y-auto [scrollbar-width:thin]"
            >
              <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
            </div>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/80 px-3 py-1.5 text-[0.625rem] font-medium text-paper backdrop-blur transition-opacity duration-500 md:bottom-4 md:text-xs ${
                scrolled ? 'opacity-0' : ''
              }`}
            >
              Scroll to explore ↓
            </span>
          </>
        ) : src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={fitWidth ? 'block h-auto w-full' : 'size-full object-cover object-left-top'}
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 border-2 border-dashed border-ink/15 p-6 text-center text-ink/40 md:rounded-3xl">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.5" />
              <path d="m21 16-5-5L5 20" />
            </svg>
            <span className="text-sm font-medium">Visual coming soon</span>
            {/* Only while developing: where to put the file */}
            {import.meta.env.DEV && (
              <code className="text-xs text-ink/50">src/assets/projects/{file}</code>
            )}
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink/60 md:mt-4">{caption}</figcaption>}
    </figure>
  )
}

export default Visual
