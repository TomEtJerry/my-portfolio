import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { BeforeAfter } from '../components/BeforeAfter';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GradientHero = styled.section`
  height: 100vh; /* occupe tout l’écran */
  margin: 0;
  padding: 0;
  background: linear-gradient(90deg, rgb(12, 90, 99) 0.09%, rgb(0, 48, 87) 99.91%);
  display: flex;
  flex-direction: column;
`;

const HeroContainer = styled.div`
display: flex;
justify-content: right;
align-items: right;
text-align: right;
padding: 4dvw 8dvw 0 0;
  @media (max-width: 1000px) {
  justify-content: left;
  align-items: left;
  text-align: left;
  margin: 17dvw 0 0 0;
  }
  @media (max-width: 700px) {
  justify-content: left;
  align-items: left;
  text-align: left;
  margin: 22dvw 0 0 0;
  }
`;

const DescriptionContainer = styled.div`
display: flex;
flex-direction: column;
align-items: right;
text-align: right;
  @media (max-width: 1000px) {
  text-align: left;
  }
`;

const TitleContainer = styled.section`
display: flex;
text-align: right;
position: relative;
transform-style: preserve-3d;
perspective: 1000px;
will-change: transform;
gap: 1dvw;
  @media (max-width: 1000px) {
    gap: 2dvw;
  }
`;

const Square = styled.section`
background: #FFC338;
width: 1.5vw;
height: 100%;
`;

const Title = styled.h1`
  font-family: "K2D", sans-serif;
  font-size: 3.5vw;
  font-weight: bold;
  font-style: normal;
  color: white;
  white-space: nowrap; 
  @media (max-width: 1000px) {
   font-size: 6vw;
  }
`;

const Description = styled.h2`
  font-family: "K2D", sans-serif;
  font-size: 1.5vw;
  font-weight: 500;
  font-style: normal;
  color: #B4B4B4;
 @media (max-width: 1000px) {
   font-size: 3vw;
   margin: 0 0 0 4dvw;
  }
  @media (max-width: 700px) {
    font-size: 4vw;
    margin: 0 0 0 4dvw;
  }
`;

const Project = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1dvw;
  align-items: center;
  margin: 0 0 0 0;
  flex: 1;
  @media (max-width: 1000px) {
   grid-template-columns: 1fr; 
   gap: 0dvw;
   align-items: stretch;
  }
  `

const Model = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModelImage = styled.img`
  max-width: 100%;
  max-height: 70vh; 
  height: auto;
   @media (max-width: 1000px) {
   max-width: 100%;
   max-height: 30vh;
  }
`;

const Informations = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0 0 1dvw;
  gap: 3dvw;
  @media (max-width: 1000px) {
   gap: none;
  }
`;

const InfoRow = styled.div`
 flex: 1;
  @media (max-width: 1000px) {
  margin : 0 0 0 5dvw;
  }
  @media (max-width: 700px) {
   margin : 0 0 0 7dvw;
  }
`;

const InfoLabel = styled.p`
  font-family: "bueno", sans-serif;
  font-size: 1.7vw;
  font-weight: 700;
  color: white;
  letter-spacing: 0.1vw;
 @media (max-width: 1000px) {
  font-size: 4vw;
  letter-spacing: 0.2vw;
  }
  @media (max-width: 700px) {
   font-size: 5vw;
   letter-spacing: 0.3vw;
  }
`;

const InfoValue = styled.p`
  font-family: "K2D", sans-serif;
  font-size: 1.2vw;    /* un peu plus gros */
  font-weight: 500;
  font-style: normal;
  color: #B4B4B4;
 @media (max-width: 1000px) {
   font-size: 3vw;
  }
    @media (max-width: 700px) {
   font-size: 4vw;
  }
`;

const Content = styled.section`
  /* dès que l’on scroll hors du premier viewport, ce fond s’applique */
  background-color: #0B0E1A;
  color: white;        /* adapte tes textes */
    display: flex;
    gap: 2dvw;
    justify-content: center;
    padding: 4dvw 0;
      @media (max-width: 1000px) {
      padding: 6dvw 0;
  }
    @media (max-width: 700px) {
    padding: 8dvw 0;
    gap: 10dvw;
    flex-direction: column;
  }
`;

const Content1 = styled.div`
 display: flex;
 flex-direction: column;
 gap: 2dvw;
  @media (max-width: 1000px) {
  }
  @media (max-width: 700px) {
  align-items: center;
  gap: 10dvw;
  }
`;

const Content2 = styled.div`
 display: flex;
 flex-direction: column;
 gap: 2dvw;
  @media (max-width: 1000px) {
  }
  @media (max-width: 700px) {
  align-items: center;
  gap: 10dvw;
  }
`;

const Content3 = styled.div`
 display: flex;
 flex-direction: column;
 gap: 2dvw;
  @media (max-width: 1000px) {
  }
  @media (max-width: 700px) {
  align-items: center;
  gap: 10dvw;
  }
`;


const SaasImage = styled.img`
  height: auto;
  width: 20dvw;
  object-fit: cover;
  border-radius: 10px; /* si tu veux un arrondi */
     @media (max-width: 1000px) {
   width: 27dvw;
  }
   @media (max-width: 700px) {
   width: 80dvw;
  }
`;

const NextProject = styled.section`
  margin: 0;
  padding: 0;
  background: linear-gradient(90deg, rgb(12, 90, 99) 0.09%, rgb(0, 48, 87) 99.91%);
  display: flex;
`;

const NextProjectLink = styled(Link)`      /* ← styled Link */
  display: inline-block;
  text-decoration: none;
`;

const ContenerNextProject = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin: 2dvw 0 2dvw 0;
  flex: 1;
  @media (max-width: 1000px) {
   grid-template-columns: 1fr; 
   gap: 0dvw;
   align-items: stretch;
   margin: 0 0 10dvw 0;
  }
  `

const Model2 = styled.div`
  flex: 1;
  height: 100%; /* Prend toute la hauteur disponible */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  padding: 0 0 0 1dvw;
  @media (max-width: 1100px) {
    order: 1;
    padding: 5dvw 0 5dvw 0;
  }
`;

const ModelImage2 = styled.img`
  max-width: 90%;
  height: auto;
   @media (max-width: 1000px) {
   max-width: 70%;
  }
   @media (max-width: 700px) {
   max-width: 75%;
  }
`;

const Description2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1dvw;
  @media (max-width: 1100px) {
    order: 2;
    text-align: center;
  }
`;

const Title2 = styled.p`
  font-family: "bueno", sans-serif;
  font-size: 3.3vw;
  font-weight: 700;
  font-style: normal;
  color: white;
  letter-spacing: 0.1vw;
  margin: 0 0 0dvw 0;
    @media (max-width: 1000px) {
    font-size: 5vw;
    margin: 0 0 1dvw 0;
    line-height: 6.5vw;
  }
  @media (max-width: 700px) {
    font-size: 6vw;
    margin: 0 0 1vw 0;
    line-height: 32px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1dvw;
  margin: 0 0 2dvw 0;
    @media (max-width: 1000px) {
    justify-content: center;
    margin: 0 0 4vw 0;
    gap: 2vw;
  }
  @media (max-width: 700px) {
    justify-content: center;
    margin: 0 0 6dvw 0;
    gap: 2dvw;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3dvw 0.8dvw;
  border-radius: 30px;
  border: 2px solid #97ADFF;
    @media (max-width: 1100px) {
    border: none;
    padding: 1vw 2vw;
    border: 2px solid #97ADFF;
  }
  @media (max-width: 700px) {
    border: none;
    padding: 1vw 3vw;
    border: 1px solid #97ADFF;
  }
`;

const Icon = styled.img.attrs({
  alt: "icon",
  loading: "lazy"
})`
  width: 0.9vw;
  height: 0.9vw;
  margin-right: 0.5dvw;
   @media (max-width: 1100px) {
    width: 2vw;
    height: 2vw;
    margin: 0 1.5vw 0 0;
  }
  @media (max-width: 700px) {
    width: 3vw;
    height: 3vw;
    margin: 0 2vw 0 0;
  }
`;

const Text = styled.span`
  color: #97ADFF;
  font-family: K2D;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 500;
   @media (max-width: 1100px) {
    font-size: 2vw;
  }
  @media (max-width: 700px) {
    font-size: 3vw;
  }
`;

const Button = styled.button`
  display: inline-flex;
  gap: 0.3dvw;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  @media (max-width: 1100px) {
  justify-content: center;
    gap: 1vw;
  }
  @media (max-width: 700px) {
  justify-content: center;
    gap: 1.5vw;
  }
`;

const ButtonIcon = styled.img`
  width: 1.4vw;
  height: 1.4vw;
  alt: "arrow"; 
    @media (max-width: 1100px) {
    width: 3.5vw;
    height: 3.5vw;
  }
  @media (max-width: 700px) {
    width: 4vw;
    height: 4vw;
  }
`;

const ButtonText = styled.span`
  font-family: K2D;
  font-size: 1vw;
  font-style: normal;
  font-weight: 500;
   @media (max-width: 1100px) {
    font-size: 2.5vw;
  }
  @media (max-width: 700px) {
    font-size: 3vw;
  }
`;


export default function Project2() {
  const HeroContainerRef = useRef(null);
  const iconRef = useRef(null);
  const containerIconRef = useRef(null);
  const videoRef = useRef(null);

  // on crée une ref-array pour les Content1
  const contentRefs = useRef([])
  contentRefs.current = []     // on vide à chaque rendu
  const addToRefs = el => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el)
    }
  }

  useEffect(() => {
    const container = HeroContainerRef.current;
    const videoEl = videoRef.current;
    const icon = iconRef.current;
    const hoverContainer = containerIconRef.current;
    const isMobile = window.matchMedia('(max-width:1000px)').matches;

    // 1️⃣ Toujours animer le Hero
    if (container) {
      gsap.to(container, {
        rotationX: isMobile ? 0 : 4,
        rotationY: isMobile ? 0 : -10,
        rotationZ: isMobile ? 0 : -2,
        transformPerspective: isMobile ? 0 : 600,
        duration: 0,
      });
    }

    gsap.utils.toArray('[data-animate]').forEach(el => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: isMobile ? 50 : 100 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 100%',
            end: 'top 0%',
            scrub: true,
          }
        }
      );
    });

    // 2️⃣ Toujours brancher l’IntersectionObserver sur la vidéo
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

    // 3️⃣ Seulement en desktop, monter la timeline hover
    let tl, onEnter, onLeave;
    if (!isMobile && icon && hoverContainer) {
      tl = gsap.timeline({ paused: true, repeat: -1 })
        .to(icon, { x: 20, opacity: 0, duration: 0.8, ease: 'power1.inOut' })
        .to(icon, { x: 0, opacity: 1, duration: 0.8, ease: 'power1.inOut' });

      onEnter = () => tl.play();
      onLeave = () => tl.pause().seek(0);

      hoverContainer.addEventListener('mouseenter', onEnter);
      hoverContainer.addEventListener('mouseleave', onLeave);
    }

    // 🔚 unique cleanup
    return () => {
      if (observer && videoEl) observer.disconnect();
      if (tl && hoverContainer) {
        hoverContainer.removeEventListener('mouseenter', onEnter);
        hoverContainer.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return (
    <>
      <GradientHero>
        <HeroContainer>
          <DescriptionContainer ref={HeroContainerRef}>
            <TitleContainer>
              <Square></Square>
              <Title>
                E-COMMERCE PRODUCT PAGE
              </Title>
            </TitleContainer>
            <Description>
              Design of several banners for product pages of the Debflex brand
            </Description>
          </DescriptionContainer>
        </HeroContainer>
        <Project>
          <Model>
            <ModelImage src="/page_product.png" alt="Aperçu du projet" />
          </Model>
          <Informations>
            <InfoRow>
              <InfoLabel>COMPANY</InfoLabel>
              <InfoValue>Legrand France</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>ROLE</InfoLabel>
              <InfoValue>UI Designer</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>TECH</InfoLabel>
              <InfoValue>Photoshop, Figma</InfoValue>
            </InfoRow>
          </Informations>
        </Project>
      </GradientHero>

      <Content>
        <Content1>
          <SaasImage src="/Cyklone.jpg" alt="Aperçu du projet" data-animate />
          <SaasImage src="/Enrouleurs.jpg" alt="Aperçu du projet" data-animate />
          <SaasImage src="/Blocs_multiprises.jpg" alt="Aperçu du projet" data-animate />
        </Content1>
        <Content2>
          <SaasImage src="/Caly.jpg" alt="Aperçu du projet" data-animate />
          <SaasImage src="/Coffrets.jpg" alt="Aperçu du projet" data-animate />
          <SaasImage src="/Fonctions_modulaires.jpg" alt="Aperçu du projet" data-animate />
        </Content2>
        <Content3>
          <SaasImage src="/Casual_Evo.jpg" alt="Aperçu du projet" data-animate />
          <SaasImage src="/Blok.jpg" alt="Aperçu du projet" data-animate />
          <SaasImage src="/Coffrets_etanches.jpg" alt="Aperçu du projet" data-animate />
        </Content3>
      </Content>
      <NextProject ref={containerIconRef}>
        <NextProjectLink to="../Project3">
          <ContenerNextProject>
            <Model2>
              <ModelImage2 src="/wordpress_site.png" alt="Aperçu du projet" />
            </Model2>
            <Description2>
              <Title2>WORDPRESS WEBSITE</Title2>
              <Container>
                <Badge>
                  <Icon src="/Design.svg" alt="Aperçu du projet"></Icon>
                  <Text>UX/UI Design</Text>
                </Badge>
                <Badge>
                  <Icon src="/Wordpress.svg" alt="Aperçu du projet"></Icon>
                  <Text>Wordpress</Text>
                </Badge>
              </Container>
              <Button>
                <ButtonText>NEXT PROJECT</ButtonText>
                <ButtonIcon
                  ref={iconRef}
                  src="/ArrowRight.svg"
                  alt="Aperçu du projet">
                </ButtonIcon>
              </Button>
            </Description2>
          </ContenerNextProject>
        </NextProjectLink>
      </NextProject>
    </>
  );
}