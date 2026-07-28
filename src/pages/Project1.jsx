import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BeforeAfter } from '../components/BeforeAfter';

gsap.registerPlugin(ScrollTrigger);

const ModelViewer = lazy(() => import("../components/ModelViewer"));

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
   BEFORE / AFTER — comparateur amélioré
   ============================================ */

const CompareTags = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65dvw;
  margin: 3vw auto 1vw auto;
  @media (max-width: 1100px) {
    width: 100dvw;
    margin: 8dvw -6dvw 4vw -6dvw;
    padding: 0 6dvw;
    box-sizing: border-box;
  }
`;

const CompareTag = styled.span`
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

const CompareWrapper = styled.div`
  width: 65dvw;
  margin: 0 auto 0 auto;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.35);
  overflow: hidden;
  @media (max-width: 1100px) {
    width: 100dvw;
    margin: 0 -6dvw;
    border-radius: 0;
    box-shadow: none;
  }
`;

const CompareHint = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 0.9vw;
  color: #6B7A99;
  text-align: center;
  margin: 1.2vw 0 0 0;
  @media (max-width: 1100px) {
    font-size: 3vw;
    margin: 4vw 0 0 0;
  }
  @media (max-width: 700px) {
    font-size: 13px;
  }
`;

/* ============================================
   SHOWCASE — captures du SaaS (format paysage)
   ============================================ */

const ShowcaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5vw;
  margin-top: 3vw;
  align-items: center;
  @media (max-width: 1100px) {
    gap: 10vw;
    margin-top: 8vw;
  }
`;

const ShowcaseItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8vw;
  @media (max-width: 1100px) {
    gap: 2.5vw;
  }
`;

const ShowcaseFrame = styled.div`
  width: 65dvw;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.35);
  @media (max-width: 1100px) {
    width: 100dvw;
    border-radius: 0;
    box-shadow: none;
  }
`;

const ShowcaseImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const ShowcaseVideo = styled.video`
  display: block;
  width: 100%;
  height: auto;
`;

const ShowcaseCaption = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1vw;
  color: #6B7A99;
  margin: 0 0 0 0;
  text-align: center;
  @media (max-width: 1100px) {
    font-size: 3.2vw;
    margin: 0 0 0 0;
  }
  @media (max-width: 700px) {
    font-size: 13px;
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

export default function Project1() {
  const videoRef = useRef(null);
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

    const videoEl = videoRef.current;
    let observer;
    if (videoEl) {
      observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          isIntersecting ? videoEl.play() : videoEl.pause();
        },
        { threshold: 0.25 }
      );
      observer.observe(videoEl);
    }

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
      if (observer && videoEl) observer.disconnect();
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
            <ModelViewer modelPath="/tablet.glb" />
          </Suspense>
        </HeroModelZone>

        <HeroInfo>
          <Eyebrow>UX / UI Design</Eyebrow>
          <HeroTitle>Customer Data Platform</HeroTitle>
          <HeroSummary>
            Visual redesign of Cliking's customer satisfaction platform — turning
            a dense, inconsistent dashboard into a clear, branded interface, and
            extending it with a brand new social media module.
          </HeroSummary>
          <MetaRow>
            <MetaItem>
              <MetaLabel>Company</MetaLabel>
              <MetaValue>Cliking</MetaValue>
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
            <SectionTitle>An interface that no longer matched the product's ambitions</SectionTitle>
            <SectionText>
              Cliking's platform lets businesses track customer satisfaction
              across surveys, reviews and client data. As the product grew,
              its interface accumulated inconsistent components, dense tables
              and a visual identity that no longer reflected the brand. The
              brief focused entirely on visual and interaction design: redesign
              the core dashboard and extend the platform with a new module.
            </SectionText>
          </div>
          <GoalsCard>
            <GoalsTitle>Redesign goals</GoalsTitle>
            <GoalsList>
              <GoalsItem>Build one consistent visual language across every screen</GoalsItem>
              <GoalsItem>Make satisfaction data easier to scan at a glance</GoalsItem>
              <GoalsItem>Design a brand new social media monitoring module</GoalsItem>
            </GoalsList>
          </GoalsCard>
        </ContextGrid>
      </Section>

      {/* ===== APPROACH / TIMELINE ===== */}
      <Section data-reveal>
        <SectionLabel>The approach</SectionLabel>
        <SectionTitle>From audit to a unified design system</SectionTitle>

        <Timeline ref={timelineRef}>
          <TimelineTrack ref={trackRef}>
            <TimelineTrackFill ref={trackFillRef} />
          </TimelineTrack>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Auditing the existing screens</TimelineStepTitle>
              <TimelineStepText>
                Going through every page of the platform to spot inconsistent
                components, redundant layouts and the screens clients open
                most often.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Defining a design system</TimelineStepTitle>
              <TimelineStepText>
                Setting typography, color and component rules in Figma, then
                applying them consistently across cards, tables and navigation.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Redesigning the dashboard</TimelineStepTitle>
              <TimelineStepText>
                Reworking the satisfaction overview, survey results and client
                database into clearer, lighter screens.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>

          <TimelineStep>
            <TimelineMarker>
              <TimelineDot data-timeline-dot />
            </TimelineMarker>
            <TimelineContent>
              <TimelineStepTitle>Designing the social media module</TimelineStepTitle>
              <TimelineStepText>
                Adding a new section for monitoring posts and channel
                performance, built with the same design system from day one.
              </TimelineStepText>
            </TimelineContent>
          </TimelineStep>
        </Timeline>
      </Section>

      {/* ===== BEFORE / AFTER ===== */}
      <Section data-reveal>
        <SectionLabel>Before / after</SectionLabel>
        <SectionTitle>A new visual identity for the dashboard</SectionTitle>
        <SectionText>
          Drag the slider to compare the previous dashboard with the
          redesigned version.
        </SectionText>

        <CompareTags>
          <CompareTag $after>Newer</CompareTag>
          <CompareTag>Older</CompareTag>
        </CompareTags>
        <CompareWrapper>
          <BeforeAfter
            beforeSrc="/after.png"
            afterSrc="/before.png"
          />
        </CompareWrapper>
        <CompareHint>Drag the handle, or scroll, to compare</CompareHint>
      </Section>

      {/* ===== DASHBOARD SHOWCASE ===== */}
      <Section data-reveal>
        <SectionLabel>The dashboard</SectionLabel>
        <SectionTitle>Clearer data, from the overview to the client file</SectionTitle>
        <SectionText>
          The redesign covers the full journey: the satisfaction overview,
          the detail of a survey, and the client database, all built with
          the new design system.
        </SectionText>

        <ShowcaseList>
          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseVideo
                ref={videoRef}
                src="/video_saas.mp4"
                muted
                loop
                playsInline
              />
            </ShowcaseFrame>
            <ShowcaseCaption>Walkthrough of the redesigned satisfaction dashboard</ShowcaseCaption>
          </ShowcaseItem>

          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseImage src="/saas_1.png" alt="Satisfaction overview" />
            </ShowcaseFrame>
            <ShowcaseCaption>Satisfaction overview with real-time alerts and reviews</ShowcaseCaption>
          </ShowcaseItem>

          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseImage src="/saas_2.png" alt="Survey detail" />
            </ShowcaseFrame>
            <ShowcaseCaption>Survey detail with CSAT, NPS and client segmentation</ShowcaseCaption>
          </ShowcaseItem>

          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseImage src="/saas_4.png" alt="Client database" />
            </ShowcaseFrame>
            <ShowcaseCaption>Searchable client database</ShowcaseCaption>
          </ShowcaseItem>
        </ShowcaseList>
      </Section>

      {/* ===== SOCIAL MEDIA MODULE ===== */}
      <Section data-reveal>
        <SectionLabel>New module</SectionLabel>
        <SectionTitle>A dedicated space for social media monitoring</SectionTitle>
        <SectionText>
          Built from scratch with the same design system, this module lets
          clients compare channel performance, browse past posts and plan
          ahead.
        </SectionText>

        <ShowcaseList>
          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseImage src="/social_media_1.png" alt="Cross-channel comparison" />
            </ShowcaseFrame>
            <ShowcaseCaption>Cross-channel performance comparison</ShowcaseCaption>
          </ShowcaseItem>

          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseImage src="/social_media_2.png" alt="Channel-level analysis" />
            </ShowcaseFrame>
            <ShowcaseCaption>Channel-level analysis with semantic feedback reading</ShowcaseCaption>
          </ShowcaseItem>

          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseImage src="/social_media_3.png" alt="Post library" />
            </ShowcaseFrame>
            <ShowcaseCaption>Library of published and scheduled posts</ShowcaseCaption>
          </ShowcaseItem>

          <ShowcaseItem>
            <ShowcaseFrame>
              <ShowcaseImage src="/social_media_4.png" alt="Editorial calendar" />
            </ShowcaseFrame>
            <ShowcaseCaption>Editorial calendar across channels</ShowcaseCaption>
          </ShowcaseItem>
        </ShowcaseList>

        <InsightList>
          <InsightRow>
            <InsightMetric>4</InsightMetric>
            <InsightDesc>dashboard screens redesigned with one consistent visual language.</InsightDesc>
          </InsightRow>
          <InsightRow>
            <InsightMetric>1</InsightMetric>
            <InsightDesc>new social media module designed from scratch.</InsightDesc>
          </InsightRow>
          <InsightRow>
            <InsightMetric>1</InsightMetric>
            <InsightDesc>unified Figma design system applied platform-wide.</InsightDesc>
          </InsightRow>
        </InsightList>
      </Section>

      {/* ===== NEXT PROJECT ===== */}
      <NextProject>
        <NextProjectLink to="/project2">
          <div>
            <NextLabel>Next project</NextLabel>
            <NextTitle>E-commerce product pages</NextTitle>
          </div>
          <NextArrow src="/ArrowRight.svg" alt="" />
        </NextProjectLink>
      </NextProject>

    </Page>
  );
}
