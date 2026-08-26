import React, { useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModelViewer from '../components/ModelViewer';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   PAGE WRAPPER
   ============================================ */

const Page = styled.div`
  background-color: #0B0E1A;
  color: white;
  overflow-x: hidden;
`;

/* ============================================
   HERO — modèle 3D + métadonnées projet
   ============================================ */

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: 100vh;
  padding: 0 6dvw;
  gap: 2dvw;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 22vw 6dvw 10vw 6dvw;
    gap: 8dvw;
  }
`;

const HeroModelZone = styled.div`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1100px) {
    height: 45vh;
    order: 1;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(45% 45% at 50% 50%, rgba(72, 180, 245, 0.25) 0%, rgba(72, 180, 245, 0) 100%);
  pointer-events: none;
`;

const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2dvw;
  @media (max-width: 1100px) {
    order: 2;
    gap: 6vw;
    text-align: center;
    align-items: center;
  }
`;

const Eyebrow = styled.span`
  font-family: "K2D", sans-serif;
  font-size: 0.95vw;
  font-weight: 600;
  letter-spacing: 0.25vw;
  color: #48B4F5;
  text-transform: uppercase;
  @media (max-width: 1100px) {
    font-size: 3.2vw;
    letter-spacing: 0.3vw;
  }
  @media (max-width: 700px) {
    font-size: 13px;
  }
`;

const HeroTitle = styled.h1`
  font-family: "bueno", sans-serif;
  font-size: 4.2vw;
  font-weight: 700;
  line-height: 1.05;
  color: white;
  margin: 0;
  letter-spacing: 0.3vw;
  @media (max-width: 1100px) {
    font-size: 8vw;
  }
  @media (max-width: 700px) {
    font-size: 9vw;
  }
`;

const HeroSummary = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1.15vw;
  font-weight: 400;
  line-height: 1.6;
  color: #B4B4B4;
  max-width: 32vw;
  margin: 0;
  @media (max-width: 1100px) {
    font-size: 3.4vw;
    max-width: 90vw;
  }
  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  gap: 3vw;
  margin-top: 1vw;
  @media (max-width: 1100px) {
    gap: 8vw;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3vw;
`;

const MetaLabel = styled.span`
  font-family: "K2D", sans-serif;
  font-size: 0.75vw;
  letter-spacing: 0.15vw;
  text-transform: uppercase;
  color: #6B7A99;
  @media (max-width: 1100px) {
    font-size: 2.6vw;
  }
  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

const MetaValue = styled.span`
  font-family: "K2D", sans-serif;
  font-size: 1.05vw;
  font-weight: 600;
  color: white;
  @media (max-width: 1100px) {
    font-size: 3.4vw;
  }
  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

/* ============================================
   SECTION GÉNÉRIQUE
   ============================================ */

const Section = styled.section`
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 7dvw 6dvw;
  @media (min-width: 1600px) {
    padding: 7dvw 160px;
  }
  @media (max-width: 1100px) {
    padding: 14dvw 6dvw;
  }
`;

const SectionLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8vw;
  font-family: "K2D", sans-serif;
  font-size: 0.85vw;
  font-weight: 600;
  letter-spacing: 0.2vw;
  text-transform: uppercase;
  color: #48B4F5;
  margin-bottom: 1.2vw;
  &::before {
    content: "";
    width: 2vw;
    height: 2px;
    flex-shrink: 0;
    background: #48B4F5;
  }
  @media (max-width: 1100px) {
    font-size: 3vw;
    margin-bottom: 4vw;
    gap: 2.5vw;
    &::before {
      width: 6vw;
    }
  }
  @media (max-width: 700px) {
    font-size: 12px;
    gap: 8px;
    &::before {
      width: 24px;
    }
  }
`;

const SectionTitle = styled.h2`
  font-family: "bueno", sans-serif;
  font-size: 2.4vw;
  font-weight: 700;
  color: white;
  margin: 0 0 1.5vw 0;
  max-width: 40vw;
  letter-spacing: 0.2vw;
  @media (max-width: 1100px) {
    font-size: 6vw;
    max-width: 100%;
  }
  @media (max-width: 700px) {
    font-size: 26px;
  }
`;

const SectionText = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1.05vw;
  line-height: 1.7;
  color: #B4B4B4;
  max-width: 38vw;
  margin: 0;
  @media (max-width: 1100px) {
    font-size: 3.4vw;
    max-width: 100%;
  }
  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

/* ============================================
   CONTEXTE — le problème, et les objectifs
   ============================================ */

const ContextGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4vw;
  align-items: start;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 8vw;
  }
`;

const GoalsCard = styled.div`
  background: rgb(0, 65, 87);
  border-radius: 30px;
  padding: 2.5vw;
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.35);
  @media (max-width: 1100px) {
    border-radius: 24px;
    padding: 7vw;
  }
`;

const GoalsTitle = styled.p`
  font-family: "bueno", sans-serif;
  font-size: 1.2vw;
  font-weight: 700;
  letter-spacing: 0.1vw;
  color: #48B4F5;
  margin: 0 0 1.2vw 0;
  @media (max-width: 1100px) {
    font-size: 4.2vw;
    margin: 0 0 4vw 0;
  }
  @media (max-width: 700px) {
    font-size: 17px;
  }
`;

const GoalsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1vw;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: 1100px) {
    gap: 3.5vw;
  }
`;

const GoalsItem = styled.li`
  font-family: "K2D", sans-serif;
  font-size: 1.05vw;
  line-height: 1.5;
  color: white;
  padding-left: 1.4vw;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55vw;
    width: 0.5vw;
    height: 0.5vw;
    background: #48B4F5;
  }
  @media (max-width: 1100px) {
    font-size: 3.6vw;
    padding-left: 5vw;
    &::before {
      top: 1.9vw;
      width: 1.8vw;
      height: 1.8vw;
    }
  }
  @media (max-width: 700px) {
    font-size: 15px;
    &::before {
      top: 6px;
      width: 7px;
      height: 7px;
    }
  }
`;

/* ============================================
   TIMELINE — la démarche de design
   ============================================ */

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 2vw;
  @media (max-width: 1100px) {
    margin-top: 6vw;
  }
`;

const TimelineTrack = styled.div`
  position: absolute;
  left: 1.2vw;
  width: 2px;
  transform: translateX(-50%);
  background: #1A2E4F;
  overflow: hidden;
  @media (max-width: 1100px) {
    left: 4vw;
  }
`;

const TimelineTrackFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: top;
  background: #3ECFA0;
  box-shadow: 0 0 8px 1px rgba(62, 207, 160, 0.5);
`;

const TimelineStep = styled.div`
  display: grid;
  grid-template-columns: 2.4vw 1fr;
  gap: 1.4vw;
  @media (max-width: 1100px) {
    grid-template-columns: 8vw 1fr;
    gap: 4vw;
  }
`;

const TimelineMarker = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TimelineDot = styled.div`
  width: 1.4vw;
  height: 1.4vw;
  border-radius: 50%;
  background: #0B1F4A;
  border: 2px solid #48B4F5;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  &.is-active {
    background: #3ECFA0;
    border-color: #3ECFA0;
    box-shadow: 0 0 12px 2px rgba(62, 207, 160, 0.55);
  }
  @media (max-width: 1100px) {
    width: 5vw;
    height: 5vw;
  }
`;

const TimelineContent = styled.div`
  padding-bottom: 3vw;
  @media (max-width: 1100px) {
    padding-bottom: 8vw;
  }
`;

const TimelineStepTitle = styled.h3`
  font-family: "bueno", sans-serif;
  font-size: 1.4vw;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5vw 0;
  letter-spacing: 0.1vw;
  @media (max-width: 1100px) {
    font-size: 4.4vw;
  }
  @media (max-width: 700px) {
    font-size: 18px;
  }
`;

const TimelineStepText = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1vw;
  line-height: 1.6;
  color: #B4B4B4;
  margin: 0;
  max-width: 36vw;
  @media (max-width: 1100px) {
    font-size: 3.4vw;
    max-width: 100%;
  }
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

/* ============================================
   DESKTOP MOCKUP — format paysage, avec indice
   tant qu'aucun visuel n'est déposé
   ============================================ */

const DesktopShowcase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8vw;
  margin-top: 3vw;
  @media (max-width: 1100px) {
    gap: 2.5vw;
    margin-top: 8vw;
  }
`;

const DesktopFrame = styled.div`
  position: relative;
  width: 65dvw;
  aspect-ratio: 16 / 9;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.35);
  @media (max-width: 1100px) {
    width: 100dvw;
    border-radius: 0;
    box-shadow: none;
  }
`;

const DesktopImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MockupHint = styled.span`
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2vw;
  text-align: center;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  font-family: "K2D", sans-serif;
  font-size: 0.85vw;
  line-height: 1.4;
  color: #6B7A99;
  @media (max-width: 1100px) {
    font-size: 3vw;
  }
  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

const MockupCaption = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1vw;
  color: #6B7A99;
  margin: 0;
  text-align: center;
  @media (max-width: 1100px) {
    font-size: 3.2vw;
  }
  @media (max-width: 700px) {
    font-size: 13px;
  }
`;

/* ============================================
   MOBILE MOCKUPS — format portrait, avec indice
   tant qu'aucun visuel n'est déposé
   ============================================ */

const MobileSolo = styled.div`
  display: flex;
  justify-content: center;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.4vw;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
    gap: 5vw;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    gap: 6vw;
  }
`;

const GalleryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
  ${p => p.$hero && `grid-row: 1 / 3;`}
  @media (max-width: 1100px) {
    ${p => p.$hero && `grid-column: 1 / -1; grid-row: auto;`}
    gap: 2.4vw;
  }
`;

const GalleryFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 15vw;
  margin: 0 auto;
  border-radius: 28px;
  overflow: hidden;
  background: rgb(0, 65, 87);
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.35);
  border: 3px solid #16203A;
  aspect-ratio: 9 / 19.5;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1100px) {
    max-width: ${p => p.$hero ? '50vw' : '38vw'};
    border-radius: 22px;
  }
  @media (max-width: 700px) {
    max-width: ${p => p.$hero ? '60vw' : '42vw'};
    border-radius: 18px;
  }
`;

const GalleryImg = styled.img`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const GalleryHint = styled.span`
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1vw;
  text-align: center;
  font-family: "K2D", sans-serif;
  font-size: 0.65vw;
  line-height: 1.4;
  color: #6B7A99;
  @media (max-width: 1100px) {
    font-size: 2.2vw;
  }
  @media (max-width: 700px) {
    font-size: 10px;
  }
`;

const GalleryCaption = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1vw;
  color: #6B7A99;
  margin: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  @media (max-width: 1100px) {
    font-size: 3vw;
  }
  @media (max-width: 700px) {
    font-size: 13px;
  }
`;

/* ============================================
   BLOC DESKTOP + MOBILE — deux espaces côte à côte
   ============================================ */

const WorkBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vw;
  margin-top: 3vw;
  @media (max-width: 1100px) {
    gap: 8vw;
    margin-top: 8vw;
  }
`;

const WorkBlockLabel = styled.p`
  font-family: "bueno", sans-serif;
  font-size: 1.1vw;
  font-weight: 700;
  color: #48B4F5;
  margin: 0;
  letter-spacing: 0.1vw;
  @media (max-width: 1100px) {
    font-size: 3.8vw;
    text-align: center;
  }
  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

/* ============================================
   HIGHLIGHTS
   ============================================ */

const InsightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4vw;
  margin-top: 3vw;
  @media (max-width: 1100px) {
    gap: 5vw;
    margin-top: 8vw;
  }
`;

const InsightRow = styled.div`
  display: grid;
  grid-template-columns: 0.35fr 1fr;
  gap: 2vw;
  padding: 1.4vw 0;
  border-bottom: 1px solid #1A2E4F;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 2vw;
    padding: 5vw 0;
  }
`;

const InsightMetric = styled.span`
  font-family: "bueno", sans-serif;
  font-size: 2.2vw;
  font-weight: 700;
  color: #48B4F5;
  @media (max-width: 1100px) {
    font-size: 8vw;
  }
`;

const InsightDesc = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1.05vw;
  line-height: 1.6;
  color: #B4B4B4;
  margin: 0;
  align-self: center;
  @media (max-width: 1100px) {
    font-size: 3.6vw;
  }
  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

/* ============================================
   NEXT PROJECT
   ============================================ */

const NextProject = styled.section`
  background: rgb(0, 65, 87);
`;

const NextProjectLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: white;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 6vw 6vw;
  transition: background 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  @media (min-width: 1600px) {
    padding: 6vw 192px;
  }
  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 6vw;
    text-align: center;
    padding: 14vw 6vw;
  }
`;

const NextLabel = styled.span`
  font-family: "K2D", sans-serif;
  font-size: 0.9vw;
  letter-spacing: 0.15vw;
  text-transform: uppercase;
  color: #97ADFF;
  @media (max-width: 1100px) {
    font-size: 3.6vw;
  }
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const NextTitle = styled.h3`
  font-family: "bueno", sans-serif;
  font-size: 2.2vw;
  font-weight: 700;
  margin: 0.3vw 0 0 0;
  @media (max-width: 1100px) {
    font-size: 8vw;
  }
  @media (max-width: 700px) {
    font-size: 32px;
  }
`;

const NextArrow = styled.img`
  width: 2vw;
  height: 2vw;
  @media (max-width: 1100px) {
    width: 9vw;
    height: 9vw;
  }
  @media (max-width: 700px) {
    width: 36px;
    height: 36px;
  }
`;

export default function Project4() {
  const timelineRef = useRef(null);
  const trackRef = useRef(null);
  const trackFillRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Timeline interactive : une ligne unique se remplit au scroll,
    // les points ne s'allument que lorsque le remplissage les atteint.
    const timelineEl = timelineRef.current;
    const trackEl = trackRef.current;
    const trackFillEl = trackFillRef.current;
    let dotEls = [];
    let dotThresholds = [];

    const measureTimeline = () => {
      if (!timelineEl || !trackEl) return;
      dotEls = gsap.utils.toArray('[data-timeline-dot]', timelineEl);
      if (dotEls.length === 0) return;

      const timelineRect = timelineEl.getBoundingClientRect();
      const firstDotRect = dotEls[0].getBoundingClientRect();
      const lastDotRect = dotEls[dotEls.length - 1].getBoundingClientRect();

      const trackTop = (firstDotRect.top + firstDotRect.height / 2) - timelineRect.top;
      const trackBottom = (lastDotRect.top + lastDotRect.height / 2) - timelineRect.top;
      const trackHeight = Math.max(trackBottom - trackTop, 1);

      trackEl.style.top = `${trackTop}px`;
      trackEl.style.height = `${trackHeight}px`;

      dotThresholds = dotEls.map((dot) => {
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = (dotRect.top + dotRect.height / 2) - timelineRect.top;
        return (dotCenter - trackTop) / trackHeight;
      });
    };

    // Toutes les animations/ScrollTriggers créées ici sont suivies par ce
    // contexte GSAP, pour être proprement détruites au nettoyage (évite les
    // ScrollTriggers dupliqués/orphelins qui font saccader le scroll).
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 50%',
              scrub: true,
            }
          }
        );
      });

      measureTimeline();

      ScrollTrigger.create({
        trigger: timelineEl,
        start: 'top 65%',
        end: 'bottom 65%',
        scrub: true,
        onUpdate: (self) => {
          if (trackFillEl) trackFillEl.style.transform = `scaleY(${self.progress})`;
          dotEls.forEach((dot, i) => {
            dot.classList.toggle('is-active', self.progress >= dotThresholds[i] - 0.001);
          });
        },
      });
    });

    // Sur mobile, l'apparition/disparition de la barre d'adresse déclenche
    // un "resize" (hauteur seule) en pleine action de scroll : on l'ignore
    // et ne réagit qu'à un vrai changement de largeur (rotation, fenêtre).
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measureTimeline();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <Page>

      {/* ===== HERO ===== */}
      <Hero>
        <HeroModelZone>
          <HeroGlow />
          <Suspense fallback={null}>
            <ModelViewer modelPath="/imac.glb" />
          </Suspense>
        </HeroModelZone>

        <HeroInfo>
          <Eyebrow>UX / UI Design</Eyebrow>
          <HeroTitle>Health Experience Evolution</HeroTitle>
          <HeroSummary>
            Redesign of the health insurance hub in Allianz's client area —
            a more dynamic homepage with money-for-value content, health
            tips and clearer quick access, plus a full rework of how
            policyholders view their guarantees and benefit usage.
          </HeroSummary>
          <MetaRow>
            <MetaItem>
              <MetaLabel>Company</MetaLabel>
              <MetaValue>Allianz</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Role</MetaLabel>
              <MetaValue>UX/UI Designer</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Tools</MetaLabel>
              <MetaValue>Figma</MetaValue>
            </MetaItem>
          </MetaRow>
        </HeroInfo>
      </Hero>

      {/* ===== CONTEXT ===== */}
      <Section data-reveal>
        <SectionLabel>The context</SectionLabel>
        <ContextGrid>
          <div>
            <SectionTitle>A health hub that needed to work harder</SectionTitle>
            <SectionText>
              Allianz's health insurance hub inside the client area had
              grown flat and static: quick access to key actions was hard
              to find, and the guarantees a policyholder had subscribed to
              could only be checked by downloading a PDF. The brief covered
              two connected pieces of work — redesigning the hub itself,
              and rebuilding how guarantees are displayed — starting with a
              deep benchmark of competitor health platforms to map their
              strengths and weaknesses.
            </SectionText>
          </div>
          <GoalsCard>
            <GoalsTitle>Project goals</GoalsTitle>
            <GoalsList>
              <GoalsItem>Make the health hub more dynamic, with money‑for‑value and health tips content</GoalsItem>
              <GoalsItem>Give quick access a clearer hierarchy and better visibility</GoalsItem>
              <GoalsItem>Turn the guarantees PDF into a native, dynamic page with real‑time benefit usage</GoalsItem>
            </GoalsList>
          </GoalsCard>
        </ContextGrid>
      </Section>

      {/* ===== APPROACH / TIMELINE ===== */}
      <Section data-reveal>
        <SectionLabel>The approach</SectionLabel>
        <SectionTitle>From competitor benchmark to two connected redesigns</SectionTitle>

        <Timeline ref={timelineRef}>
          <TimelineTrack ref={trackRef}>
            <TimelineTrackFill ref={trackFillRef} />
          </TimelineTrack>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Benchmarking competitor health platforms</TimelineStepTitle>
              <TimelineStepText>
                Reviewing competitor insurers' health platforms to map
                their strengths and weaknesses, on both the hub experience
                and how they display guarantees.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Redesigning the health hub</TimelineStepTitle>
              <TimelineStepText>
                Restructuring the hub around money‑for‑value content,
                personalized health tips, and a clearer hierarchy for
                quick access shortcuts.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Rebuilding the guarantees experience</TimelineStepTitle>
              <TimelineStepText>
                Replacing the static PDF with a native, dynamic page
                showing every guarantee and its benefit usage updated in
                real time.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Designing for desktop and mobile</TimelineStepTitle>
              <TimelineStepText>
                Designing the full experience in Figma for both desktop
                and mobile, so every improvement carries across screens.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>
        </Timeline>
      </Section>

      {/* ===== HEALTH HUB ===== */}
      <Section data-reveal>
        <SectionLabel>The health hub</SectionLabel>
        <SectionTitle>A hub that surfaces what matters</SectionTitle>
        <SectionText>
          The hub's homepage was redesigned around money‑for‑value content,
          personalized health tips and a clearer hierarchy for quick
          access shortcuts.
        </SectionText>

        <WorkBlock>
          <div>
            <WorkBlockLabel>Desktop</WorkBlockLabel>
            <DesktopShowcase>
              <DesktopFrame>
                <DesktopImage
                  src="/health-hub-desktop-1.jpg"
                  alt="Redesigned health hub, desktop"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <MockupHint>
                  Drop your visual here:<br />public/health-hub-desktop-1.jpg
                </MockupHint>
              </DesktopFrame>
              <MockupCaption>Desktop view of the redesigned health hub</MockupCaption>
            </DesktopShowcase>
          </div>

          <div>
            <WorkBlockLabel>Mobile</WorkBlockLabel>
            <DesktopShowcase>
              <MobileSolo>
                <GalleryFrame>
                  <GalleryImg
                    src="/health-hub-mobile-1.jpg"
                    alt="Redesigned health hub, mobile"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <GalleryHint>
                    Drop your visual here:<br />public/health-hub-mobile-1.jpg
                  </GalleryHint>
                </GalleryFrame>
              </MobileSolo>
              <MockupCaption>Mobile view of the redesigned health hub</MockupCaption>
            </DesktopShowcase>
          </div>
        </WorkBlock>
      </Section>

      {/* ===== GUARANTEES EXPERIENCE ===== */}
      <Section data-reveal>
        <SectionLabel>The guarantees experience</SectionLabel>
        <SectionTitle>From a static PDF to a live, native page</SectionTitle>
        <SectionText>
          The guarantees a policyholder subscribed to used to live in a
          PDF. They now live in a native, dynamic page showing benefit
          usage updated in real time.
        </SectionText>

        <WorkBlock>
          <div>
            <WorkBlockLabel>Desktop</WorkBlockLabel>
            <DesktopShowcase>
              <DesktopFrame>
                <DesktopImage
                  src="/health-guarantees-desktop-1.jpg"
                  alt="New native guarantees page, desktop"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <MockupHint>
                  Drop your visual here:<br />public/health-guarantees-desktop-1.jpg
                </MockupHint>
              </DesktopFrame>
              <MockupCaption>Desktop view of the new native guarantees page</MockupCaption>
            </DesktopShowcase>
          </div>

          <div>
            <WorkBlockLabel>Mobile</WorkBlockLabel>
            <Gallery>
              <GalleryItem $hero>
                <GalleryFrame $hero>
                  <GalleryImg
                    src="/health-guarantees-mobile-1.jpg"
                    alt="Guarantee detail with real-time benefit usage"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <GalleryHint>
                    Drop your visual here:<br />public/health-guarantees-mobile-1.jpg
                  </GalleryHint>
                </GalleryFrame>
                <GalleryCaption>Guarantee detail with real‑time benefit usage</GalleryCaption>
              </GalleryItem>

              <GalleryItem>
                <GalleryFrame>
                  <GalleryImg
                    src="/health-guarantees-mobile-2.jpg"
                    alt="Overview of subscribed guarantees"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <GalleryHint>
                    Drop your visual here:<br />public/health-guarantees-mobile-2.jpg
                  </GalleryHint>
                </GalleryFrame>
                <GalleryCaption>Overview of subscribed guarantees</GalleryCaption>
              </GalleryItem>

              <GalleryItem>
                <GalleryFrame>
                  <GalleryImg
                    src="/health-guarantees-mobile-3.jpg"
                    alt="Benefit usage breakdown"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <GalleryHint>
                    Drop your visual here:<br />public/health-guarantees-mobile-3.jpg
                  </GalleryHint>
                </GalleryFrame>
                <GalleryCaption>Benefit usage breakdown</GalleryCaption>
              </GalleryItem>
            </Gallery>
          </div>
        </WorkBlock>

        <InsightList>
          <InsightRow>
            <InsightMetric>2</InsightMetric>
            <InsightDesc>connected pieces of work delivered: the health hub and the guarantees experience.</InsightDesc>
          </InsightRow>
          <InsightRow>
            <InsightMetric>1</InsightMetric>
            <InsightDesc>full benchmark of competitor health platforms, strengths and weaknesses mapped.</InsightDesc>
          </InsightRow>
          <InsightRow>
            <InsightMetric>1</InsightMetric>
            <InsightDesc>guarantees PDF turned into a native page with real‑time benefit usage.</InsightDesc>
          </InsightRow>
        </InsightList>
      </Section>

      {/* ===== NEXT PROJECT ===== */}
      <NextProject>
        <NextProjectLink to="/project1">
          <div>
            <NextLabel>Next project</NextLabel>
            <NextTitle>Customer data platform</NextTitle>
          </div>
          <NextArrow src="/ArrowRight.svg" alt="" />
        </NextProjectLink>
      </NextProject>

    </Page>
  );
}
