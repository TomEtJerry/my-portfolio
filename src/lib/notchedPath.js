// Builds an SVG path for a rounded rectangle whose top-right corner is cut out
// (notch), with rounded corners inside the notch too.
//   w, h   — size of the block
//   r      — radius of the outer corners
//   nw, nh — width and height of the notch
//   nr     — radius of the three corners around the notch
export function notchedPath(w, h, r, nw, nh, nr) {
  nw = Math.min(Math.max(nw, 0), w - r - nr)
  nh = Math.min(Math.max(nh, 0), h - r - nr)
  if (nw <= 0 || nh <= 0) {
    return `M${r},0 H${w - r} A${r},${r} 0 0 1 ${w},${r} V${h - r} A${r},${r} 0 0 1 ${w - r},${h} H${r} A${r},${r} 0 0 1 0,${h - r} V${r} A${r},${r} 0 0 1 ${r},0 Z`
  }
  const x = w - nw
  return [
    `M${r},0`,
    `H${x - nr}`,
    `A${nr},${nr} 0 0 1 ${x},${nr}`, // outer corner, top of the notch
    `V${nh - nr}`,
    `A${nr},${nr} 0 0 0 ${x + nr},${nh}`, // inner (hollow) corner
    `H${w - nr}`,
    `A${nr},${nr} 0 0 1 ${w},${nh + nr}`, // outer corner, right of the notch
    `V${h - r}`,
    `A${r},${r} 0 0 1 ${w - r},${h}`,
    `H${r}`,
    `A${r},${r} 0 0 1 0,${h - r}`,
    `V${r}`,
    `A${r},${r} 0 0 1 ${r},0`,
    'Z',
  ].join(' ')
}
