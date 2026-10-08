// Messages shown in turn, separated by a sparkle
const MESSAGES = ['Open to work', 'User experience', 'User interface', 'Product design']
const REPEAT = 4

// Four-point sparkle placed between each message
function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 shrink-0 fill-current md:size-5">
      <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" />
    </svg>
  )
}

// Decorative copy of the message — the banner itself carries the accessible label
function Group() {
  return (
    <div aria-hidden="true" className="flex shrink-0 items-center">
      {Array.from({ length: REPEAT }, (_, i) =>
        MESSAGES.map((message) => (
          <span key={`${i}-${message}`} className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
            <span className="whitespace-nowrap">{message}</span>
            <Sparkle />
          </span>
        )),
      )}
    </div>
  )
}

function OpenToWorkBanner() {
  return (
    <div
      role="status"
      aria-label={MESSAGES.join(' — ')}
      className="relative z-10 mt-6 flex h-12 items-center overflow-hidden md:mt-10 bg-accent font-display text-sm font-bold uppercase tracking-[0.2em] text-paper md:h-16 md:text-lg"
    >
      {/* Two identical groups slide left; when the first is fully out, the loop restarts seamlessly */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Group />
        <Group />
      </div>
    </div>
  )
}

export default OpenToWorkBanner
