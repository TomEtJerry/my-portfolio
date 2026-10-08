import { projectImage } from '../lib/projectImages'

// A project visual. Until its file exists in src/assets/projects/, shows a placeholder.
function Visual({ file, caption, className = '' }) {
  const src = projectImage(file)

  return (
    <figure>
      <div className={`relative overflow-hidden rounded-2xl bg-sand md:rounded-3xl ${className}`}>
        {src ? (
          <img src={src} alt={caption} loading="lazy" className="size-full object-cover object-left-top" />
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
