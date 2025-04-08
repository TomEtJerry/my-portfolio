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
        if (modelRef.current && speed > 0) {
            modelRef.current.rotation.y += speed;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
});

const ModelViewer = memo(({ modelPath, previewImage }) => {
    const containerRef = useRef();

    const [shouldRender, setShouldRender] = useState(false);
    const [dprValue, setDprValue] = useState(0.5);
    const [animate, setAnimate] = useState(false);
    const [speed, setSpeed] = useState(0.003);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setSpeed(isMobile ? 0.006 : 0.003);
    }, []);

    // Canvas rendering (300px)
    useEffect(() => {
        const renderObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                }
            },
            { root: null, threshold: 0, rootMargin: "300px" }
        );

        const current = containerRef.current;
        if (current) renderObserver.observe(current);

        return () => {
            if (current) renderObserver.unobserve(current);
        };
    }, []);

    // dpr + animation (50px)
    useEffect(() => {
        const animObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDprValue(window.devicePixelRatio || 1);
                    setAnimate(true);
                } else {
                    setDprValue(0.5);
                    setAnimate(false);
                }
            },
            { root: null, threshold: 0, rootMargin: "100px" }
        );

        const current = containerRef.current;
        if (current) animObserver.observe(current);

        return () => {
            if (current) animObserver.unobserve(current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            {/* 👇 Spacer invisible qui préserve la hauteur */}
            <div
                style={{
                    paddingTop: "100%", // 👈 change selon ton ratio (100% = carré)
                    visibility: "hidden",
                }}
            />

            {/* 👇 Fallback image */}
            {!shouldRender && previewImage && (
                <img
                    src={previewImage}
                    alt="3D preview"
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />
            )}

            {/* 👇 Canvas 3D */}
            {shouldRender && (
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                    }}
                >
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
                </div>
            )}
        </div>
    );
});

export default ModelViewer;