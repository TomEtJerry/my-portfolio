import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const RotatingModel = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            // Rotation continue sur l'axe Y (vertical)
            modelRef.current.rotation.y += 0.003; // Ajuste la vitesse ici
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
};

const ModelViewer = ({ modelPath }) => {
    const containerRef = useRef();
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <Canvas style={{ width: size.width, height: "100%" }} camera={{ position: [0, 0, 1] }}
                resize={{ scroll: false, debounce: 0 }}>
                {/* Lumières */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 2, 3]} intensity={2} />
                <pointLight position={[-2, -2, 2]} intensity={10} color={"#97ADFF"} />
                <spotLight position={[0, 5, 5]} angle={0.3} intensity={2} castShadow />

                <RotatingModel modelPath={modelPath} />
            </Canvas>
        </div>
    );
};

export default ModelViewer;
