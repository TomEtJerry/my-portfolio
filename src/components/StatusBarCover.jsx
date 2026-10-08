// Beige strip at the very top of the screen, behind the phone's status bar (time, battery).
// Recent iOS Safari lets the page scroll visibly under that area and picks its color from a
// fixed, full-width, colored element touching the top edge — this is that element.
// - Height = the status bar height when the browser reports it (home screen apps)
// - iOS Safari doesn't report it: there, the strip extends above the page (see index.css)
function StatusBarCover() {
  return (
    <div
      aria-hidden="true"
      className="status-bar-cover pointer-events-none fixed inset-x-0 top-0 z-[100] h-[var(--safe-top)] bg-paper"
    />
  )
}

export default StatusBarCover
