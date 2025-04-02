import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import { gsap } from 'gsap';
import ModelViewer from "./ModelViewer"; // Importation du composant 3D
import Header from './Header'; // Importation du composant Header
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, #18323C 0.35%, #0B0E1A 99.65%);
  background-attachment: fixed;
  padding: 6dvw 0 15dvw 0;
  gap: 8dvw;
    @media (max-width: 1100px) {
    padding: 20vw 0 30vw 0;
    gap: 20dvw;
  }
  @media (max-width: 700px) {
    padding: 30vw 0 50vw 0;
    gap: 25dvw;
  }
`;

const Background = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh; /* Ajuste la hauteur selon tes besoins */
  background-image: url("/background.png");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 100% 100%;
  opacity: 1;
  z-index: 1; /* Place en arrière-plan */
    @media (max-width: 700px) {
     height: 250px; /* Ajuste la hauteur selon tes besoins */
  }
`;

const HeroSection = styled.div`
  display : flex;
  flex-direction: column;
  width: 60dvw;
  z-index: 0;
`;

const NameContainer = styled.div`
text-align: center;
  padding: 0 0 1dvw 0;
    @media (max-width: 1100px) {
  padding: 0 0 10vw 0;
  }
  @media (max-width: 700px) {
  padding: 0 0 15vw 0;
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
    font-size: 8vw;
  }
`;

const HeroContainer = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(45% 45% at 50% 50%, rgba(68, 154, 183, 0.50) 40%, rgba(68, 154, 183, 0.00) 100%);
  padding: 0 0 0 5vw;
    @media (max-width: 1100px) {
    padding: 0 0 0 4vw;
  }
    @media (max-width: 700px) {
    padding: 0 0 0 8vw;
  }
`;

const HeroTitleWrapper = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: "bueno", sans-serif;
  font-size: 16vw;
  font-weight: 700;
  font-style: normal;
  color: white;
  letter-spacing: 0.2vw;
  line-height: 15vw;
  text-align: center;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  position: relative;
  z-index: 1; /* Texte en premier plan */
    @media (max-width: 1100px) {
    font-size: 26vw;
    line-height: 25vw;
  }
`;


const HeroShadow = styled.h2`
  font-family: "bueno", sans-serif;
  font-size: 16vw;
  font-weight: 700;
  font-style: normal;
  color:rgb(68, 154, 183);
  letter-spacing: 0.2vw;
  line-height: 15vw;
  position: absolute;
  top: 0.4vw; /* Décalage de l'ombre */
  right: 1vw; /* Décalage de l'ombre */
  -webkit-text-stroke: 2px rgb(68, 154, 183);
  z-index: 0; /* Texte ombre derrière */
    @media (max-width: 1100px) {
    font-size: 26vw;
    line-height: 25vw;
  }
`;

const DescriptionContainer = styled.div`
text-align: center;
padding: 2dvw 0 0 0;
    @media (max-width: 1100px) {
    padding: 5dvw 0 0 0;
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
`;

const ExitContainer = styled.div`
text-align: center;
padding: 5dvw 0 0 0;
  @media (max-width: 1100px) {
  padding: 10vw 0 0 0;
  }
  @media (max-width: 700px) {
  padding: 15vw 0 0 0;
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
    font-size: 8vw;
  }
`;

const Projects = styled.div`
  width: 50dvw;
  height: 50dvh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1dvw;
  align-items: center;
  padding: 0 1dvw 0 0;
  cursor: pointer;
  opacity: 0;
  transform: translateY(100px);
  border-radius: 50px;
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.40) 0.09%, rgba(0, 48, 87, 0.80) 99.91%);
  box-shadow: 0px 0px 10px 1px rgba(96, 215, 255, 0.60);
  z-index: 2;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    width: 250px;
    height: 350px;
    padding: 0 2dvw 4dvw 2dvw;
    gap: 0;
    border-radius: 40px;
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
    margin: 0 0 2dvw 0;
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
    margin: 0 0 3dvw 0;
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
    padding: 3px 10px;
    border: 1px solid #97ADFF;
  }
`;

const Icon = styled.img`
  width: 0.9vw;
  height: 0.9vw;
  margin-right: 0.5dvw;
  @media (max-width: 1100px) {
    width: 2vw;
    height: 2.5vw;
    margin: 0 1dvw 0 0;
  }
`;

const Text = styled.span`
  color: #97ADFF;
  font-family: K2D;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 500;
  @media (max-width: 1100px) {
    font-size: 2.5vw;
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
    gap: 1dvw;
  }
`;

const ButtonIcon = styled.img`
  width: 1.4vw;
  height: 1.4vw;
  @media (max-width: 1100px) {
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
    font-size: 3vw;
  }
`;

const projectsData = [
  {
    title: "CUSTOMER DATA PLATFORM",
    modelPath: "/saas.glb",
    url: "https://tomsantoni.myportfolio.com/customer-satisfaction-platform",
    badges: [
      { icon: "/Design.svg", text: "UX/UI Design" },
      { icon: "/Figma.svg", text: "Figma" },
    ],
  },
  {
    title: "E-COMMERCE PRODUCT PAGES",
    modelPath: "/product_page.glb",
    url: "https://tomsantoni.myportfolio.com/product-pages-for-legrand",
    badges: [
      { icon: "/Design.svg", text: "UX/UI Design" },
      { icon: "/Photoshop.svg", text: "Photoshop" },
    ],
  },
  {
    title: "WORDPRESS WEBSITE",
    modelPath: "/wordpress_site.glb",
    url: "https://tomsantoni.myportfolio.com/new-cliking-website",
    badges: [
      { icon: "/Design.svg", text: "UX/UI Design" },
      { icon: "/Photoshop.svg", text: "Wordpress" },
    ],
  },
  {
    title: "LINKEDIN AD CAMPAIGN",
    modelPath: "/ebook.glb",
    url: "https://tomsantoni.myportfolio.com/marketing-campaign-for-cliking",
    badges: [
      { icon: "/Design.svg", text: "Photoshop" },
      { icon: "/Photoshop.svg", text: "After Effects" },
    ],
  },
];


function App() {
  const buttonContainerRefs = useRef([]);
  const buttonIconRefs = useRef([]);
  const heroTitleRef = useRef(null);
  const heroShadowRef = useRef(null);

  useEffect(() => {
    const shadow = heroShadowRef.current;
    const title = heroTitleRef.current;

    const applyPerspective = (rotationX, rotationY, perspective) => {
      gsap.to([shadow, title], {
        rotationX,
        rotationY,
        transformPerspective: perspective,
        duration: 0
      });
    };

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      applyPerspective(10, 10, 250); // 🔧 Valeurs pour mobile (moins fort, plus doux)

      setTimeout(() => {
        window.scrollTo(0, 0); // ✅ Scroll en haut après init GSAP
      }, 100);
    } else {
      applyPerspective(10, 10, 500); // 🖥️ Valeurs par défaut pour desktop
    }

    buttonContainerRefs.current.forEach((container, index) => {
      if (!container) return;

      // Valeurs scrollTrigger différentes
      const scrollSettings = isMobile
        ? { start: 'top 95%', end: 'top 55%' } // 📱 Mobile
        : { start: 'top 75%', end: 'top 45%' }; // 💻 Desktop

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
    });
  }, []);

  return (
    <>
      <Header />
      <AppContainer>
        <Background />
        <HeroSection>
          <NameContainer>
            <NameText>TOM SANTONI</NameText>
          </NameContainer>
          <HeroContainer>
            <HeroTitleWrapper>
              <HeroShadow ref={heroShadowRef}>UX-UI DESIGNER</HeroShadow>
              <HeroTitle ref={heroTitleRef}>UX-UI DESIGNER</HeroTitle>
            </HeroTitleWrapper>
          </HeroContainer>
          <DescriptionContainer>
            <HeroDescription>LOOKING FOR A WORK-STUDY OPPORTUNITY</HeroDescription>
          </DescriptionContainer>
          <ExitContainer>
            <ExitText>SELECTED WORK</ExitText>
          </ExitContainer>
        </HeroSection>
        {projectsData.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", width: "fit-content", zIndex: 2 }}
          >
            <Projects
              className="Projects"
              ref={(el) => (buttonContainerRefs.current[index] = el)}
            >
              <Model>
                <ModelViewer modelPath={project.modelPath} />
              </Model>
              <Description>
                <Title>{project.title}</Title>
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
          </a>
        ))}
      </AppContainer>
    </>
  );
}

export default App;

