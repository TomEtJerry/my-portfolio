import { useEffect, useRef, useState } from 'react'

// Project image in light WebP versions (see `?responsive` in vite.config.js): the browser picks
// the smallest width that's sharp enough for the screen. Fades in once loaded, over a light
// background instead of an empty block.
function ResponsiveImage({ image, alt = '', sizes = '100vw', priority = false, className = '' }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Already loaded from cache before React attached the listener
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      src={image.img.src}
      srcSet={image.sources.webp}
      sizes={sizes}
      width={image.img.w}
      height={image.img.h}
      alt={alt}
      // The visible image first; the others don't compete for the connection
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'low'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}

export default ResponsiveImage
