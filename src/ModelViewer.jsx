import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Préchargement des modèles pour éviter les délais de rendu
useGLTF.preload("/saas.glb", "/gltf/");
useGLTF.preload("/product_page.glb", "/gltf/");
useGLTF.preload("/wordpress_site.glb", "/gltf/");
useGLTF.preload("/ebook.glb", "/gltf/");

const RotatingModel = memo(({ modelPath, speed }) => {
    const { scene } = useGLTF(modelPath, "/gltf/");
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            // Appliquer la rotation uniquement si la vitesse est non nulle
            modelRef.current.rotation.y += speed;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
});

const ModelViewer = memo(({ modelPath }) => {
    const containerRef = useRef();
    const [speed, setSpeed] = useState(0.003);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Ajustement de la vitesse en fonction de l'appareil
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setSpeed(isMobile ? 0.006 : 0.003);
    }, []);

    useEffect(() => {
        // Intersection Observer pour déclencher l'animation 200px avant l'entrée dans le viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                setAnimate(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "100px"
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
            <Canvas
                camera={{ position: [0, 0, 1] }}
                style={{ width: "100%", height: "100%" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 2, 3]} intensity={2} />
                <pointLight position={[-2, -2, 2]} intensity={10} color="#97ADFF" />
                <RotatingModel modelPath={modelPath} speed={animate ? speed : 0} />
            </Canvas>
        </div>
    );
});

export default ModelViewer;
