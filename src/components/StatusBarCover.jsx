// Beige strip over the phone's status bar area (time, battery): on iPhone the page would
// otherwise scroll visibly underneath it. Zero height on computers.
function StatusBarCover() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[var(--safe-top)] bg-paper"
    />
  )
}

export default StatusBarCover
