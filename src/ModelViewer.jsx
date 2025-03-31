import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const FloatingModel = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();

    useFrame(({ clock }) => {
        if (modelRef.current) {
            // Rotation automatique sur X et Z pour l'effet de perspective
            modelRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.8) * 0.02;
            modelRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.04;
            modelRef.current.rotation.y = Math.sin(clock.elapsedTime * 1) * 0.03;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={1} />;
};

const ModelViewer = ({ modelPath }) => {
    const containerRef = useRef();
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setSize({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <Canvas style={{ width: size.width, height: "100%" }} camera={{ position: [0, 0, 0.6] }}
                resize={{ scroll: false, debounce: 0 }}>
                {/* Lumières */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 2, 3]} intensity={2} />
                <pointLight position={[-2, -2, 2]} intensity={10} color={"#97ADFF"} />
                <spotLight position={[0, 5, 5]} angle={0.3} intensity={2} castShadow />

                <FloatingModel modelPath={modelPath} />
            </Canvas>
        </div>
    );
};

export default ModelViewer;
