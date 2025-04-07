import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

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
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [speed, setSpeed] = useState(0.003);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setSpeed(isMobile ? 0.006 : 0.003);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
            <Canvas
                camera={{ position: [0, 0, 1] }}
                resize={{ scroll: false, debounce: 0 }}
                style={{ width: "100%", height: "100%" }}
                Canvas frameloop="always"
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 2, 3]} intensity={2} />
                <pointLight position={[-2, -2, 2]} intensity={10} color="#97ADFF" />
                <spotLight position={[0, 5, 5]} angle={0.3} intensity={2} castShadow />

                <RotatingModel modelPath={modelPath} speed={speed} />
            </Canvas>
        </div>
    );
});

export default ModelViewer;
