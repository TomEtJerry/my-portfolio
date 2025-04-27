import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Préchargement des modèles
useGLTF.preload("/saas.glb", "/gltf/");
useGLTF.preload("/product_page.glb", "/gltf/");
useGLTF.preload("/wordpress_site.glb", "/gltf/");
useGLTF.preload("/ebook.glb", "/gltf/");

const RotatingModel = ({ modelPath, speed }) => {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();

    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += speed * delta * 60;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
};

const ModelViewer = memo(({ modelPath }) => {
    const containerRef = useRef();

    const [shouldRender, setShouldRender] = useState(false);
    const [dprValue, setDprValue] = useState(0.5);
    const [animate, setAnimate] = useState(false);
    const [speed, setSpeed] = useState(0.006); // Même vitesse partout

    // Observer pour rendre le Canvas (300px avant d'entrer)
    useEffect(() => {
        const renderObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                }
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "300px",
            }
        );

        const current = containerRef.current;
        if (current) renderObserver.observe(current);

        return () => {
            if (current) renderObserver.unobserve(current);
        };
    }, []);

    // Observer pour activer animation + haute résolution (à 50px)
    useEffect(() => {
        const dprAndAnimationObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDprValue(window.devicePixelRatio || 1);
                    setAnimate(true);
                } else {
                    setDprValue(0.5);
                    setAnimate(false);
                }
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "100px", // ✅ animation + dpr déclenchés en même temps
            }
        );

        const current = containerRef.current;
        if (current) dprAndAnimationObserver.observe(current);

        return () => {
            if (current) dprAndAnimationObserver.unobserve(current);
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
                    <RotatingModel modelPath={modelPath} speed={animate ? speed : 0} />
                </Canvas>
            )}
        </div>
    );
});

export default ModelViewer;
