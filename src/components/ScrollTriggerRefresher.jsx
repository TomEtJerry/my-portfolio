import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollTriggerRefresher() {
    const { pathname } = useLocation();

    useEffect(() => {
        // On laisse le temps à la nouvelle page de charger
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000); // 300ms suffisent pour recalculer les triggers après un changement de route

        return () => clearTimeout(timer);
    }, [pathname]);

    return null; // Ce composant n'affiche rien
}