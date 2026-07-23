import React, { useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModelViewer from "../components/ModelViewer";
gsap.registerPlugin(ScrollTrigger);
// Ignore les "resize" causés par l'affichage/masquage de la barre
// d'adresse mobile pendant le scroll, pour éviter les recalculs intempestifs.
ScrollTrigger.config({ ignoreMobileResize: true });

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
  padding: 7dvw 6dvw;
  @media (max-width: 1100px) {
    padding: 14dvw 6dvw;
  }
`;

const SectionLabel = styled.span`
  display: block;
  font-family: "K2D", sans-serif;
  font-size: 0.85vw;
  font-weight: 600;
  letter-spacing: 0.2vw;
  text-transform: uppercase;
  color: #48B4F5;
  margin-bottom: 1.2vw;
  @media (max-width: 1100px) {
    font-size: 3vw;
    margin-bottom: 4vw;
  }
  @media (max-width: 700px) {
    font-size: 12px;
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
   CONTEXTE — le problème, en chiffre
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

const QuoteCard = styled.div`
  background: rgb(0, 65, 87);
  border-radius: 30px;
  padding: 2.5vw;
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.35);
  @media (max-width: 1100px) {
    border-radius: 24px;
    padding: 7vw;
  }
`;

const QuoteMark = styled.div`
  font-family: "bueno", sans-serif;
  font-size: 4vw;
  color: #48B4F5;
  line-height: 1;
  margin-bottom: 0.5vw;
  @media (max-width: 1100px) {
    font-size: 12vw;
  }
`;

const QuoteText = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1.3vw;
  font-style: italic;
  line-height: 1.5;
  color: white;
  margin: 0 0 1.2vw 0;
  @media (max-width: 1100px) {
    font-size: 4.2vw;
  }
  @media (max-width: 700px) {
    font-size: 17px;
  }
`;

const QuoteSource = styled.span`
  font-family: "K2D", sans-serif;
  font-size: 0.9vw;
  color: #97ADFF;
  @media (max-width: 1100px) {
    font-size: 3vw;
  }
  @media (max-width: 700px) {
    font-size: 13px;
  }
`;

/* ============================================
   TIMELINE — le parcours, façon "paiement validé"
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
   SCREENS GALLERY — mobile portrait mockups
   ============================================ */

const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.4vw;
  margin-top: 3vw;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
    gap: 5vw;
    margin-top: 8vw;
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
  width: 100%;
  max-width: ${p => p.$hero ? '18vw' : '18vw'};
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const GalleryCaption = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1vw;
  color: #6B7A99;
  margin: 0;
  display: flex;
  justify-content: center;
  @media (max-width: 1100px) {
    font-size: 3vw;
  }
  @media (max-width: 700px) {
    font-size: 13px;
  }
`;

/* ============================================
   USERTESTING — avant / après
   ============================================ */

const TestingGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vw;
  margin-top: 3vw;
  @media (max-width: 1100px) {
    gap: 10vw;
    margin-top: 8vw;
  }
`;

const TestingPair = styled.div`
  display: grid;
  grid-template-columns: 1fr 8vw 1fr;
  align-items: center;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const TestingArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 1100px) {
    flex-direction: column;
    width: 100%;
    height: 12vw;
    margin: 0 auto;
  }
`;

const TestingArrowLine = styled.div`
  flex: 1;
  height: 3px;
  background: linear-gradient(90deg, rgba(72, 180, 245, 0.2), #48B4F5);
  @media (max-width: 1100px) {
    width: 3px;
    height: auto;
    flex: 1;
    background: linear-gradient(180deg, rgba(72, 180, 245, 0.2), #48B4F5);
  }
`;

const TestingArrowHead = styled.div`
  flex-shrink: 0;
  width: 0;
  height: 0;
  border-top: 0.75vw solid transparent;
  border-bottom: 0.75vw solid transparent;
  border-left: 1.1vw solid #48B4F5;
  @media (max-width: 1100px) {
    border-top: 1.6vw solid #48B4F5;
    border-left: 3vw solid transparent;
    border-right: 3vw solid transparent;
    border-bottom: none;
  }
`;

const TestingCard = styled.div`
  background: ${p => p.$after ? 'rgba(62, 207, 160, 0.08)' : 'rgba(255, 107, 107, 0.06)'};
  border: 1px solid ${p => p.$after ? 'rgba(62, 207, 160, 0.4)' : 'rgba(255, 107, 107, 0.3)'};
  border-radius: 24px;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  @media (max-width: 1100px) {
    border-radius: 20px;
    padding: 6vw;
  }
`;

const TestingVisual = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 1;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.15);
`;

const TestingVisualImg = styled.img`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const TestingVisualHint = styled.span`
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1vw;
  text-align: center;
  font-family: "K2D", sans-serif;
  font-size: 0.75vw;
  line-height: 1.4;
  color: #6B7A99;
  @media (max-width: 1100px) {
    font-size: 2.6vw;
  }
`;

const TestingTag = styled.span`
  font-family: "K2D", sans-serif;
  font-size: 0.8vw;
  font-weight: 600;
  letter-spacing: 0.15vw;
  text-transform: uppercase;
  color: ${p => p.$after ? '#3ECFA0' : '#FF8A8A'};
  @media (max-width: 1100px) {
    font-size: 2.8vw;
  }
  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

const TestingFinding = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1.05vw;
  line-height: 1.6;
  color: white;
  margin: 0;
  @media (max-width: 1100px) {
    font-size: 3.6vw;
  }
  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

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
  box-sizing: border-box;
  padding: 6vw 6vw;
  transition: background 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
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

export default function Project5() {
  const heroModelRef = useRef(null);
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
        <HeroModelZone ref={heroModelRef}>
          <HeroGlow />
          <Suspense fallback={null}>
            <ModelViewer modelPath="/smartphone.glb" />
          </Suspense>
        </HeroModelZone>

        <HeroInfo>
          <Eyebrow>UX / UI Design</Eyebrow>
          <HeroTitle>Customer Payment Portal</HeroTitle>
          <HeroSummary>
            A dedicated space for visualizing and tracking insurance premium
            payments, designed for individual policyholders.
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
              <MetaValue>Figma · UserTesting</MetaValue>
            </MetaItem>
          </MetaRow>
        </HeroInfo>
      </Hero>

      {/* ===== CONTEXT ===== */}
      <Section data-reveal>
        <SectionLabel>The context</SectionLabel>
        <ContextGrid>
          <div>
            <SectionTitle>Information clients had to ask for instead of simply seeing</SectionTitle>
            <SectionText>
              Before this project, premium payment details were only visible
              to Allianz agents. For the simplest question — amount charged,
              next payment date, payment history — the client had to call or
              write to their agent, who then had to look up the information
              themselves. This friction generated an avoidable volume of
              requests and a frustrating experience for data that was
              actually simple to display.
            </SectionText>
          </div>
          <QuoteCard>
            <QuoteMark>"</QuoteMark>
            <QuoteText>
              I just wanted to know if this month's payment had gone through,
              and I had to call my agency for that.
            </QuoteText>
            <QuoteSource>— Recurring request reported by agents prior to the project</QuoteSource>
          </QuoteCard>
        </ContextGrid>
      </Section>

      {/* ===== PROCESS / TIMELINE ===== */}
      <Section data-reveal>
        <SectionLabel>The approach</SectionLabel>
        <SectionTitle>From wireframe to validated flow</SectionTitle>

        <Timeline ref={timelineRef}>
          <TimelineTrack ref={trackRef}>
            <TimelineTrackFill ref={trackFillRef} />
          </TimelineTrack>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Scoping the need</TimelineStepTitle>
              <TimelineStepText>
                Identifying the information clients expected, based on the
                most frequent requests reported by agencies: amount, date,
                status, and payment history.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Wireframing in Figma</TimelineStepTitle>
              <TimelineStepText>
                Designing several versions of the tracking space, exploring
                different information hierarchies: contract overview,
                per-installment detail, and quick access to the latest payment.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>User testing on UserTesting</TimelineStepTitle>
              <TimelineStepText>
                Confronting the wireframes with real clients to observe where
                they looked for information, what they misunderstood, and
                which details felt missing or unnecessary.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Refinements and final version</TimelineStepTitle>
              <TimelineStepText>
                Incorporating feedback to simplify access to payment status
                and clarify wording, before delivering the final mockups.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>
        </Timeline>
      </Section>

      {/* ===== SCREENS GALLERY ===== */}
      <Section data-reveal>
        <SectionLabel>The wireframes</SectionLabel>
        <SectionTitle>The payment tracking space</SectionTitle>
        <SectionText>
          A look at the key mobile screens of the customer portal, from the
          contract overview to the detail of a single premium installment.
        </SectionText>

        <Gallery>
          <GalleryItem $hero>
            <GalleryFrame $hero>
              {<GalleryImg src="paiements_modif_v1.jpg" alt="Contract overview" />}
            </GalleryFrame>
            <GalleryCaption>Contract status and next payment</GalleryCaption>
          </GalleryItem>

          <GalleryItem>
            <GalleryFrame>
              {<GalleryImg src="/details_close.jpg" alt="Payment history" />}
            </GalleryFrame>
            <GalleryCaption>Payment history open</GalleryCaption>
          </GalleryItem>

          <GalleryItem>
            <GalleryFrame>
              {<GalleryImg src="/details_open.jpg" alt="Installment detail" />}
            </GalleryFrame>
            <GalleryCaption>Payment history close</GalleryCaption>
          </GalleryItem>
        </Gallery>
      </Section>

      {/* ===== USERTESTING ===== */}
      <Section data-reveal>
        <SectionLabel>User testing</SectionLabel>
        <SectionTitle>What UserTesting revealed</SectionTitle>
        <SectionText>
          Several testing sessions surfaced friction points invisible on the
          wireframe alone, and the interface was adjusted accordingly.
        </SectionText>

        <TestingGrid>
          <TestingPair>
            <TestingCard>
              <TestingVisual>
                <TestingVisualImg
                  src="/testing-date-label-before.jpg"
                  alt="Visuel avant : libellé de la date de prélèvement"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <TestingVisualHint>
                  Dépose ton visuel ici :<br />public/testing-date-label-before.jpg
                </TestingVisualHint>
              </TestingVisual>
              <TestingTag>Before testing</TestingTag>
              <TestingFinding>
                Users confused the payment due date with the premium issue
                date, due to insufficiently explicit labeling.
              </TestingFinding>
            </TestingCard>
            <TestingArrow>
              <TestingArrowLine />
              <TestingArrowHead />
            </TestingArrow>
            <TestingCard $after>
              <TestingVisual>
                <TestingVisualImg
                  src="/testing-date-label-after.jpg"
                  alt="Visuel après : statut visuel distinct par échéance"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <TestingVisualHint>
                  Dépose ton visuel ici :<br />public/testing-date-label-after.jpg
                </TestingVisualHint>
              </TestingVisual>
              <TestingTag>After adjustment</TestingTag>
              <TestingFinding>
                Labels were reworded and a distinct visual status was added
                for each installment, removing the ambiguity seen in testing.
              </TestingFinding>
            </TestingCard>
          </TestingPair>

          <TestingPair>
            <TestingCard>
              <TestingVisual>
                <TestingVisualImg
                  src="/testing-history-access-before.jpg"
                  alt="Visuel avant : accès à l'historique en plusieurs clics"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <TestingVisualHint>
                  Dépose ton visuel ici :<br />public/testing-history-access-before.jpg
                </TestingVisualHint>
              </TestingVisual>
              <TestingTag>Before testing</TestingTag>
              <TestingFinding>
                Payment history required several clicks to reach, even though
                it was the most sought-after information among testers.
              </TestingFinding>
            </TestingCard>
            <TestingArrow>
              <TestingArrowLine />
              <TestingArrowHead />
            </TestingArrow>
            <TestingCard $after>
              <TestingVisual>
                <TestingVisualImg
                  src="/testing-history-access-after.jpg"
                  alt="Visuel après : accès direct à l'historique"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <TestingVisualHint>
                  Dépose ton visuel ici :<br />public/testing-history-access-after.jpg
                </TestingVisualHint>
              </TestingVisual>
              <TestingTag>After adjustment</TestingTag>
              <TestingFinding>
                History was promoted to direct access from the overview,
                reducing the journey to a single action.
              </TestingFinding>
            </TestingCard>
          </TestingPair>
        </TestingGrid>

        <InsightList>
          <InsightRow>
            <InsightMetric>5</InsightMetric>
            <InsightDesc>user testing sessions conducted on UserTesting to confront the wireframes with real clients.</InsightDesc>
          </InsightRow>
          <InsightRow>
            <InsightMetric>3</InsightMetric>
            <InsightDesc>Figma wireframe iterations between the first prototype and the validated version.</InsightDesc>
          </InsightRow>
          <InsightRow>
            <InsightMetric>1 click</InsightMetric>
            <InsightDesc>to access payment history, down from several steps in the first version.</InsightDesc>
          </InsightRow>
        </InsightList>
      </Section>

      {/* ===== NEXT PROJECT ===== */}
      <NextProject>
        <NextProjectLink to="/project1">
          <div>
            <NextLabel>Next project</NextLabel>
            <NextTitle>Customer Data Platform</NextTitle>
          </div>
          <NextArrow src="/ArrowRight.svg" alt="" />
        </NextProjectLink>
      </NextProject>

    </Page>
  );
}