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
    padding: 30vw 0 40vw 0;
    gap: 25dvw;
  }
  @media (max-width: 330px) {
    padding: 15vw 0 40vw 0;
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
    @media (max-width: 1100px) {
    height: 30vh; /* Ajuste la hauteur selon tes besoins */
  }
    @media (max-width: 700px) {
     height: 150px; /* Ajuste la hauteur selon tes besoins */
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
  padding: 0 0 12vw 0;
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
    font-size: 21vw;
    line-height: 20vw;
  }
    @media (max-width: 700px) {
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
    font-size: 21vw;
    line-height: 20vw;
  }
    @media (max-width: 700px) {
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
  @media (max-width: 700px) {
    font-size: 6vw;
  }
`;

const ExitContainer = styled.div`
text-align: center;
padding: 5dvw 0 0 0;
  @media (max-width: 1100px) {
  padding: 12vw 0 0 0;
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
    font-size: 7vw;
  }
  @media (max-width: 700px) {
    font-size: 8vw;
  }
`;

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
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.40) 0.09%, rgba(0, 48, 87, 0.80) 99.91%);
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

const Icon = styled.img`
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

const ButtonIcon = styled.img`
  width: 1.4vw;
  height: 1.4vw;
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
    url: "https://tomsantoni.myportfolio.com/customer-satisfaction-platform",
    badges: [
      { icon: "/Design.svg", text: "UX/UI Design" },
      { icon: "/Figma.svg", text: "Figma" },
    ],
  },
  {
    title: "E-COMMERCE\nPRODUCT PAGES",
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
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200); // Laisse le temps à ScrollTrigger de finir l'init

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
    } else {
      applyPerspective(10, 10, 500); // 🖥️ Valeurs par défaut pour desktop
    }

    buttonContainerRefs.current.forEach((container, index) => {
      if (!container) return;

      // Valeurs scrollTrigger différentes
      const scrollSettings = isMobile
        ? { start: 'top 100%', end: 'top 50%' } // 📱 Mobile
        : { start: 'top 90%', end: 'top 45%' }; // 💻 Desktop

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
          </a>
        ))}
      </AppContainer>
    </>
  );
}

export default App;

