import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        ScrollTrigger.refresh()
    }, [pathname])
    return null
}