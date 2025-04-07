import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Préchargement des modèles pour éviter les délais de rendu
useGLTF.preload("/saas.glb");
useGLTF.preload("/product_page.glb");
useGLTF.preload("/wordpress_site.glb");
useGLTF.preload("/ebook.glb");

const RotatingModel = memo(({ modelPath, speed }) => {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += speed;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
});

const ModelViewer = memo(({ modelPath }) => {
    const containerRef = useRef();
    const [speed, setSpeed] = useState(0.003);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // Ajustement de la vitesse selon l'appareil
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setSpeed(isMobile ? 0.006 : 0.003);

        // Observer pour la redimension du conteneur (optionnel)
        const resizeObserver = new ResizeObserver(([entry]) => {
            // Vous pouvez ajuster des paramètres selon entry.contentRect si besoin
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Intersection Observer pour lancer le rendu avant l'apparition complète dans le viewport
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "200px", // Déclenche le rendu 200px avant que l'élément n'entre dans le viewport
            }
        );
        if (containerRef.current) {
            intersectionObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
                intersectionObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
            {isInView ? (
                <Canvas
                    camera={{ position: [0, 0, 1] }}
                    dpr={[1, 1]} // Limite le rendu aux pixels nécessaires
                    style={{ width: "100%", height: "100%" }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 2, 3]} intensity={2} />
                    <pointLight position={[-2, -2, 2]} intensity={10} color="#97ADFF" />
                    <spotLight position={[0, 5, 5]} angle={0.3} intensity={2} castShadow />
                    <RotatingModel modelPath={modelPath} speed={speed} />
                </Canvas>
            ) : (
                // Optionnel : affichage d'un placeholder si nécessaire
                null
            )}
        </div>
    );
});

export default ModelViewer;
