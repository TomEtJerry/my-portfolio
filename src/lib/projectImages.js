// Every image placed in a sub-folder of src/assets/projects/ (case-study visuals), found at build time.
// Lets the project pages show a visual as soon as its file exists — no code change needed.
const images = import.meta.glob('../assets/projects/*/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

// `file` is relative to src/assets/projects/, e.g. 'partner-offers/desktop-1.jpg'
export function projectImage(file) {
  return images[`../assets/projects/${file}`] ?? null
}

// Same for videos (e.g. a walkthrough recording)
const videos = import.meta.glob('../assets/projects/*/**/*.{mp4,webm}', {
  eager: true,
  import: 'default',
})

export function projectVideo(file) {
  return videos[`../assets/projects/${file}`] ?? null
}
