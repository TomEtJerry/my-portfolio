import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ModelViewer = lazy(() => import("../components/ModelViewer"));

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0dvw 0 15dvw 0;
  gap: 4dvw;
  background-color: #0B0E1A;
  @media (max-width: 1100px) {
    padding: 18vw 0 30vw 0;
    gap: 15dvw;
  }
  @media (max-width: 700px) {
    padding: 27vw 0 40vw 0;
    gap: 15dvw;
  }
  @media (max-width: 330px) {
    padding: 18vw 0 40vw 0;
    gap: 15dvw;
  }
`;

const Background = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40vh; /* Ajuste la hauteur selon tes besoins */
  background-image: url("/background.webp");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 1;
  z-index: 1; /* Place en arrière-plan */
    @media (max-width: 1100px) {
    height: 30vh; /* Ajuste la hauteur selon tes besoins */
  }
    @media (max-width: 700px) {
     height: 150px; /* Ajuste la hauteur selon tes besoins */
  }
    @media (max-width: 330px) {
     height: 120px; /* Ajuste la hauteur selon tes besoins */
  }
`;

const HeroSection = styled.div`
  display : flex;
  flex-direction: column;
  width: 60dvw;
  z-index: 0;
  @media (max-width: 700px) {
  width: 95dvw;
  }
`;

const FirstPrint = styled.div`
@media (min-width: 1100px) {
  display : flex;
  flex-direction: column;
  justify-content: center;
  height: 100dvh;
  }
`;

const NameContainer = styled.div`
text-align: center;
  padding: 0 0 1.5dvw 0;
    @media (max-width: 1100px) {
  padding: 0 0 18vw 0;
  }
  @media (max-width: 700px) {
  padding: 0 0 27vw 0;
  }
  @media (max-width: 330px) {
  padding: 0 0 18vw 0;
  }
`;

const NameText = styled.h2`
font-family: "bueno", sans-serif;
font-size: 3vw;
font-style: normal;
color: rgb(68, 154, 183);
letter-spacing: 0.1vw;
justify-content: center;
align-items: center;
  @media (max-width: 1100px) {
    font-size: 7vw;
  }
  @media (max-width: 700px) {
    font-size: 8vw;
  }
`;

const HeroContainer = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(40% 40% at 50% 50%, rgba(68, 154, 183, 0.50) 30%, rgba(68, 154, 183, 0.00) 100%);
  padding: 0 0 0 2vw;
    @media (max-width: 1100px) {
    padding: 0 0 0 4vw;
  }
    @media (max-width: 700px) {
  }
`;

/* Pour regrouper le titre et l'ombre dans un conteneur commun */
const HeroTitleContainer = styled.div`
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: "bueno", sans-serif;
  font-size: 15vw;
  font-weight: 700;
  font-style: normal;
  color: white;
  letter-spacing: 0.2vw;
  line-height: 14vw;
  margin: 0;
  position: relative;
  z-index: 1; /* Texte en premier plan */
  @media (max-width: 1100px) {
    font-size: 21vw;
    line-height: 20vw;
  }
  @media (max-width: 700px) {
    font-size: 24vw;
    line-height: 23vw;
  }
`;

const HeroShadow = styled.h2`
  font-family: "bueno", sans-serif;
  font-size: 15vw;
  font-weight: 700;
  font-style: normal;
  color: rgb(68, 154, 183);
  letter-spacing: 0.2vw;
  line-height: 14vw;
  position: absolute;
  top: 0.4vw; /* Décalage de l'ombre */
  right: 1vw; /* Décalage de l'ombre */
  -webkit-text-stroke: 2px rgb(68, 154, 183);
  margin: 0;
  z-index: 0; /* Texte ombre derrière */
  @media (max-width: 1100px) {
    font-size: 21vw;
    line-height: 20vw;
  }
  @media (max-width: 700px) {
    font-size: 24vw;
    line-height: 23vw;
  }
`;

const DescriptionContainer = styled.div`
text-align: center;
padding: 2.5dvw 0 0 0;
    @media (max-width: 1100px) {
    padding: 18dvw 5dvw 0 5dvw;
      }
    @media (max-width: 700px) {
    padding: 27dvw 10dvw 0 10dvw;
      }
        @media (max-width: 330px) {
    padding: 18dvw 10dvw 0 10dvw;
      }
`;

const HeroDescription = styled.h2`
font-family: "bueno", sans-serif;
font-size: 2vw;
font-style: normal;
color: rgb(68, 154, 183);
letter-spacing: 0.1vw;
justify-content: center;
align-items: center;
  @media (max-width: 1100px) {
    font-size: 5vw;
  }
  @media (max-width: 700px) {
    font-size: 6vw;
    line-height: 7vw;
  }
`;

const ExitContainer = styled.div`
text-align: center;
padding: 0dvw 0 0 0;
  @media (max-width: 1100px) {
  padding: 18vw 0 0 0;
  }
  @media (max-width: 700px) {
  padding: 27vw 0 0 0;
  }
    @media (max-width: 330px) {
  padding: 18vw 0 0 0;
  }
`;

const ExitText = styled.h2`
font-family: "bueno", sans-serif;
font-size: 3.5vw;
font-style: normal;
color: rgb(68, 154, 183);
letter-spacing: 0.1vw;
justify-content: center;
align-items: center;
  @media (max-width: 1100px) {
    font-size: 7vw;
  }
  @media (max-width: 700px) {
    font-size: 8vw;
  }
`;

const Content = styled.div`
display: flex;
flex-direction: column;
gap: 8dvw;
  @media (max-width: 1100px) {
    gap: 20dvw;
  }
  @media (max-width: 700px) {
    gap: 30dvw;
  }
  @media (max-width: 330px) {
    gap: 15dvw;
  }
`

const Projects = styled.div`
  width: 55dvw;
  height: 55dvh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1dvw;
  align-items: center;
  padding: 0 0 0 0;
  cursor: pointer;
  opacity: 0;
  transform: translateY(100px);
  border-radius: 50px;
  background: rgb(0, 65, 87);
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.60);
  overflow-x: hidden;
  z-index: 2;
    @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    width: 60dvw;
    height: 600px;
    padding: 0 1vw 3vw 1vw;
    gap: 0;
    border-radius: 50px;
    box-shadow: 0px 0px 7px 1px rgba(96, 215, 255, 0.60);
    justify-content: center;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    width: 250px;
    height: 450px;
    padding: 0 10px 20px 10px;
    gap: 0;
    border-radius: 40px;
    box-shadow: 0px 0px 7px 1px rgba(96, 215, 255, 0.60);
    justify-content: center;
  }
  @media (max-width: 330px) {
    grid-template-columns: 1fr;
    width: 220px;
    height: 300px;
    padding: 0 10px 10px 10px;
    gap: 0;
    border-radius: 40px;
    box-shadow: 0px 0px 7px 1px rgba(96, 215, 255, 0.60);
    justify-content: center;
  }
`;

const Model = styled.div`
  flex: 1;
  height: 100%; /* Prend toute la hauteur disponible */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  padding: 0 0 0 1dvw;
  @media (max-width: 1100px) {
    order: 1;
  }
`;

const Description = styled.div`
  flex: 1;
  padding: 0 0 0 1dvw;
  @media (max-width: 1100px) {
    order: 2;
    text-align: center;
  }
`;

const Title = styled.h2`
  font-family: "bueno", sans-serif;
  font-size: 3.3vw;
  font-weight: 700;
  font-style: normal;
  color: white;
  letter-spacing: 0.1vw;
  margin: 0 0 0.5dvw 0;
    @media (max-width: 1100px) {
    font-size: 6vw;
    margin: 0 0 10px 0;
    line-height: 6.5vw;
  }
  @media (max-width: 700px) {
    font-size: 28px;
    margin: 0 0 10px 0;
    line-height: 32px;
  }
  @media (max-width: 330px) {
    font-size: 26px;
    margin: 0 0 5px 0;
    line-height: 30px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1dvw;
  margin: 0 0 2dvw 0;
    @media (max-width: 1100px) {
    justify-content: center;
    margin: 0 0 3vw 0;
    gap: 2vw;
  }
  @media (max-width: 700px) {
    justify-content: center;
    margin: 0 0 20px 0;
    gap: 10px;
  }
  @media (max-width: 330px) {
    justify-content: center;
    margin: 0 0 10px 0;
    gap: 5px;
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
    padding: 3px 10px;
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
    margin: 0 1vw 0 0;
  }
  @media (max-width: 700px) {
    width: 12px;
    height: 12px;
    margin: 0 5px 0 0;
  }
  @media (max-width: 330px) {
    width: 10px;
    height: 10px;
    margin: 0 5px 0 0;
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
    font-size: 12px;
  }
  @media (max-width: 330px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3dvw;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  @media (max-width: 1100px) {
    gap: 1vw;
  }
  @media (max-width: 700px) {
    gap: 5px;
  }
`;

const ButtonIcon = styled.img.attrs({
  alt: "ButtonIcon",
  loading: "lazy"
})`
  width: 1.4vw;
  height: 1.4vw;
  alt: "arrow"; 
    @media (max-width: 1100px) {
    width: 3.5vw;
    height: 3.5vw;
  }
  @media (max-width: 700px) {
    width: 18px;
    height: 18px;
  }
  @media (max-width: 330px) {
    width: 14px;
    height: 14px;
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
    font-size: 14px;
  }
  @media (max-width: 330px) {
    font-size: 12px;
  }
`;

const projectsData = [
  {
    title: "CUSTOMER\nDATA PLATFORM",
    modelPath: "/saas.glb",
    path: "/project1",
    badges: [
      { icon: "/Design.svg", text: "UX/UI Design" },
      { icon: "/Figma.svg", text: "Figma" },
    ],
  },
  {
    title: "E-COMMERCE\nPRODUCT PAGES",
    modelPath: "/product_page.glb",
    path: "/project2",
    badges: [
      { icon: "/Design.svg", text: "UI Design" },
      { icon: "/Photoshop.svg", text: "Photoshop" },
    ],
  },
  {
    title: "WORDPRESS WEBSITE",
    modelPath: "/wordpress_site.glb",
    path: "/project3",
    badges: [
      { icon: "/Design.svg", text: "UX/UI Design" },
      { icon: "/Wordpress.svg", text: "Wordpress" },
    ],
  },
  {
    title: "LINKEDIN AD CAMPAIGN",
    modelPath: "/ebook.glb",
    path: "/project4",
    badges: [
      { icon: "/Photoshop.svg", text: "Photoshop" },
      { icon: "/Aftereffects.svg", text: "After Effects" },
    ],
  },
];


export default function Home() {
  const buttonContainerRefs = useRef([]);
  const buttonIconRefs = useRef([]);
  const heroContainerRef = useRef(null);

  useEffect(() => {
    const container = heroContainerRef.current;
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200); // Laisse le temps à ScrollTrigger de finir l'init

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const perspectiveValue = isMobile ? 400 : 600;

    gsap.to(container, {
      rotationX: 10,
      rotationY: 10,
      transformPerspective: perspectiveValue,
      duration: 0
    });

    buttonContainerRefs.current.forEach((container, index) => {
      if (!container) return;

      // Valeurs scrollTrigger différentes
      const scrollSettings = isMobile
        ? { start: 'top 100%', end: 'top 50%' } // 📱 Mobile
        : { start: 'top 100%', end: 'top 50%' }; // 💻 Desktop

      gsap.fromTo(container,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            ...scrollSettings,
            scrub: true, // ← permet d’animer en fonction du scroll
          }
        }
      );

      const icon = buttonIconRefs.current[index];

      if (!isMobile) {
        const tl = gsap.timeline({ paused: true, repeat: -1 });

        tl.to(icon, {
          x: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        }).to(icon, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        });

        container.addEventListener("mouseenter", () => tl.play());
        container.addEventListener("mouseleave", () => tl.pause().seek(0));
      }
    });
    return () => clearTimeout(timeout); // Nettoyage du timeout
  }, []);

  return (
    <AppContainer>
      <Background />
      <HeroSection>
        <FirstPrint>
          <NameContainer>
            <NameText>TOM SANTONI</NameText>
          </NameContainer>
          <HeroContainer>
            <HeroTitleContainer ref={heroContainerRef}>
              <HeroShadow>UX-UI DESIGNER</HeroShadow>
              <HeroTitle>UX-UI DESIGNER</HeroTitle>
            </HeroTitleContainer>
          </HeroContainer>
          <DescriptionContainer>
            <HeroDescription>LOOKING FOR A WORK-STUDY OPPORTUNITY</HeroDescription>
          </DescriptionContainer>
        </FirstPrint>
        <ExitContainer>
          <ExitText>SELECTED WORK</ExitText>
        </ExitContainer>
      </HeroSection>
      <Content>
        {projectsData.map((project, index) => (
          <Link
            key={index}
            to={project.path}
            style={{ textDecoration: 'none', width: 'fit-content', zIndex: 2 }}
          >
            <Projects
              className="Projects"
              ref={(el) => (buttonContainerRefs.current[index] = el)}
            >
              <Model>
                <Suspense fallback={null}>
                  <ModelViewer modelPath={project.modelPath} />
                </Suspense>
              </Model>
              <Description>
                <Title> {project.title.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}</Title>
                <Container>
                  {project.badges.map((badge, i) => (
                    <Badge key={i}>
                      <Icon src={badge.icon} />
                      <Text>{badge.text}</Text>
                    </Badge>
                  ))}
                </Container>
                <Button>
                  <ButtonText>OPEN PROJECT</ButtonText>
                  <ButtonIcon
                    ref={(el) => (buttonIconRefs.current[index] = el)}
                    src="/ArrowRight.svg"
                  />
                </Button>
              </Description>
            </Projects>
          </Link>
        ))}
      </Content>
    </AppContainer>
  );
}
