// Every image placed in src/assets/projects/ (sub-folders included), found at build time.
// Lets the project pages show a visual as soon as its file exists — no code change needed.
const images = import.meta.glob('../assets/projects/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

// `file` is relative to src/assets/projects/, e.g. 'partner-offers/desktop-1.jpg'
export function projectImage(file) {
  return images[`../assets/projects/${file}`] ?? null
}
