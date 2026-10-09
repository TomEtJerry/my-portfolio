import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { setupMobileSteps } from '../lib/mobileSteps'
import { contact, FORM_ENDPOINT } from '../data/contact'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
]

const YEAR = new Date().getFullYear()

const inputClass =
  'mt-2 w-full border-b border-ink/20 bg-transparent pb-3 font-display text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-accent md:text-xl'

function Contact() {
  const section = useRef(null)
  const pinned = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Mobile only: step-by-step scroll into the section (intro + LinkedIn, then the form)
      mm.add('(max-width: 47.999rem)', () =>
        setupMobileSteps({
          pin: pinned.current,
          first: section.current.querySelector('.contact-intro'),
          second: section.current.querySelector('.contact-form'),
          // The swap fills the whole step and ends at the very bottom of the page
          distance: 0.8,
          swapStart: 0,
          swapEnd: 1,
        }),
      )

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.contact-reveal', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          // Triggered by the title, and only once (page re-measurements can't replay it)
          scrollTrigger: { trigger: '#contact h2', start: 'top 85%', once: true },
        })
      })
    },
    { scope: section },
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          _subject: 'New message from your portfolio',
          _template: 'table',
        }),
      })
      const result = await response.json()
      if (!response.ok || String(result.success) !== 'true') throw new Error(result.message)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    // The id sits on this wrapper so it also covers the pinned scroll distance (for the navbar)
    <section id="contact" ref={section} className="lg:-mt-16">
      <div
        ref={pinned}
        className="mx-auto flex max-w-page flex-col px-5 pb-6 pt-12 max-md:h-[100svh] max-md:pt-[clamp(6.5rem,calc(100svh-34rem),13.5rem)] md:px-12 md:pb-8 md:pt-24 lg:pt-[7.5rem]"
      >
        <div className="max-md:mb-16">
          <h2 className="contact-reveal font-display text-4xl font-bold tracking-tight md:text-6xl">
            Contact<span className="text-accent">.</span>
          </h2>

          <div className="mt-7 grid gap-14 md:mt-12 lg:grid-cols-12 lg:gap-16">
            {/* Intro + direct links */}
            {/* Intro + LinkedIn. Phones: shares the same spot as the form, shown one after the other */}
            <div className="contact-intro col-start-1 row-start-1 md:row-start-auto lg:col-span-5">
              <p className="contact-reveal font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl md:leading-tight">
                Let’s build something <span className="text-accent">great together.</span>
              </p>
              <p className="contact-reveal mt-6 max-w-md text-base text-ink/70 md:text-lg">
                A role, a project or just a question? Send me a message and I’ll get back to you
                quickly.
              </p>

              <dl className="contact-reveal mt-10 border-t border-ink/10">
                <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">LinkedIn</dt>
                  <dd>
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display font-medium transition-colors hover:text-accent md:text-lg"
                    >
                      Tom Santoni ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="contact-reveal contact-form col-start-1 row-start-1 md:row-start-auto lg:col-span-6 lg:col-start-7"
            >
              <div className="grid gap-8 md:grid-cols-2">
                {FIELDS.map((field) => (
                  <label key={field.name} className="block">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
                      {field.label}
                    </span>
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      className={inputClass}
                    />
                  </label>
                ))}
              </div>

              <label className="mt-8 block">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">Message</span>
                <textarea
                  required
                  name="message"
                  rows={3}
                  placeholder="Tell me about your project or role…"
                  className={`${inputClass} resize-none`}
                />
              </label>

              {/* Honeypot: hidden field that only spam bots fill in */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-medium text-paper transition-colors hover:bg-accent-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </button>

                <p role="status" aria-live="polite" className="text-sm">
                  {status === 'sent' && (
                    <span className="text-ink/70">Thanks! Your message has been sent.</span>
                  )}
                  {status === 'error' && (
                    <span className="text-accent-dark">
                      Something went wrong. Please try again, or reach me on{' '}
                      <a href={contact.linkedin} target="_blank" rel="noreferrer" className="underline">
                        LinkedIn
                      </a>
                      .
                    </span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 flex max-md:mt-auto md:mt-20 items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink/50">
          <span>© {YEAR} Tom Santoni</span>
          <a href="#home" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  )
}

export default Contact
