import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/wordpress_site.glb", "/gltf/");

const RotatingModel = memo(({ speed }) => {
    const { scene } = useGLTF("/wordpress_site.glb", "/gltf/");
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += speed;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
});

const WordpressSiteModel = () => {
    const containerRef = useRef();
    const [speed, setSpeed] = useState(0.003);
    const [animate, setAnimate] = useState(false);
    const [dprValue, setDprValue] = useState(0.5);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setSpeed(isMobile ? 0.006 : 0.003);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    setDprValue(window.devicePixelRatio || 1);
                } else {
                    setAnimate(false);
                    setDprValue(0.5);
                }
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "100px",
            }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Canvas camera={{ position: [0, 0, 1] }} style={{ width: "100%", height: "100%" }} dpr={dprValue}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 2, 3]} intensity={2} />
                <pointLight position={[-2, -2, 2]} intensity={10} color="#97ADFF" />
                <RotatingModel speed={animate ? speed : 0} />
            </Canvas>
        </div>
    );
};

export default memo(WordpressSiteModel);

