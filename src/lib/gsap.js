import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Observer } from 'gsap/Observer'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, Observer)

export { gsap, Observer, ScrollTrigger, useGSAP }
