import { useEffect } from 'react'
import About from '../components/About'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import OpenToWorkBanner from '../components/OpenToWorkBanner'
import Projects from '../components/Projects'
import { ScrollTrigger } from '../lib/gsap'

// Scrolls to the section named in the URL (e.g. /#projects when coming back from a project page)
const scrollToHash = () => {
  const target = window.location.hash && document.querySelector(window.location.hash)
  if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: 'instant' })
}

function Home() {
  // Scroll animations measure the page when they're created. Pinned sections and late-loading
  // fonts/images change the page height afterwards, so measure everything again once the page
  // is complete (this effect runs after all the sections have set up their own animations).
  useEffect(() => {
    document.title = 'Tom Santoni — Product Designer'
    const refresh = () => ScrollTrigger.refresh()
    refresh()
    scrollToHash()
    document.fonts?.ready.then(() => {
      refresh()
      scrollToHash()
    })
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <Logo />
      <Navbar />
      <main className="font-sans">
        <Hero />
        {/* Transition between Home and Projects */}
        <OpenToWorkBanner />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  )
}

export default Home
