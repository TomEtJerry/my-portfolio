import { useEffect } from 'react'
import Logo from '../components/Logo'

function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Tom Santoni'
  }, [])

  return (
    <>
      <Logo href="/" />
      <main className="mx-auto flex min-h-screen max-w-page flex-col justify-center px-5 font-sans md:px-12">
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
          Page not found<span className="text-accent">.</span>
        </h1>
        <a
          href="/"
          className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-accent px-7 py-4 font-medium text-paper transition-colors hover:bg-accent-dark"
        >
          ← Back to home
        </a>
      </main>
    </>
  )
}

export default NotFound
