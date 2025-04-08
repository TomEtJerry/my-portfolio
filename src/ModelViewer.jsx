import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Préchargement des modèles
useGLTF.preload("/saas.glb", "/gltf/");
useGLTF.preload("/product_page.glb", "/gltf/");
useGLTF.preload("/wordpress_site.glb", "/gltf/");
useGLTF.preload("/ebook.glb", "/gltf/");

const RotatingModel = memo(({ modelPath, speed }) => {
    const { scene } = useGLTF(modelPath, "/gltf/");
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

    const [shouldRender, setShouldRender] = useState(false);
    const [speed, setSpeed] = useState(0.003);
    const [dprValue, setDprValue] = useState(0.5);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setSpeed(isMobile ? 0.006 : 0.003);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true); // Montre le Canvas
                    setDprValue(window.devicePixelRatio || 1);
                }
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "100px", // ✅ Déclenche 300px avant d'entrer dans le viewport
            }
        );

        const currentRef = containerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
            {shouldRender && (
                <Canvas
                    camera={{ position: [0, 0, 1] }}
                    style={{ width: "100%", height: "100%" }}
                    dpr={dprValue}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 2, 3]} intensity={2} />
                    <pointLight position={[-2, -2, 2]} intensity={10} color="#97ADFF" />
                    <RotatingModel modelPath={modelPath} speed={speed} />
                </Canvas>
            )}
        </div>
    );
});

export default ModelViewer;
