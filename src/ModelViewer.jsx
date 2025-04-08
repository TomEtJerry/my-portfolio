import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Préchargement des modèles avec le chemin du décodeur (exemple : "/gltf/")
// Remplacez "/gltf/" par votre dossier approprié (par exemple, "/draco-gltf/" si vous hébergez Draco localement)
useGLTF.preload("/saas.glb", "/gltf/");
useGLTF.preload("/product_page.glb", "/gltf/");
useGLTF.preload("/wordpress_site.glb", "/gltf/");
useGLTF.preload("/ebook.glb", "/gltf/");

const RotatingModel = memo(({ modelPath, speed }) => {
    // Utilisation de useGLTF avec le chemin vers le décodeur
    const { scene } = useGLTF(modelPath, "/gltf/");
    const modelRef = useRef();

    useFrame(() => {
        if (modelRef.current) {
            // La rotation s'effectue seulement si 'speed' est non nul
            modelRef.current.rotation.y += speed;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
});

const ModelViewer = memo(({ modelPath }) => {
    const containerRef = useRef();

    // Vitesse de rotation (adaptée en fonction du device)
    const [speed, setSpeed] = useState(0.003);
    // Contrôle de l'animation : on ne la fait tourner que quand l'objet est proche du viewport
    const [animate, setAnimate] = useState(false);
    // Contrôle du devicePixelRatio (dpr) du Canvas
    const [dprValue, setDprValue] = useState(0.5); // Démarrage en basse résolution

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setSpeed(isMobile ? 0.006 : 0.008);
    }, []);

    useEffect(() => {
        // Intersection Observer pour changer dpr et activer l'animation lorsque l'objet s'approche
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    // Augmente la résolution pour une meilleure qualité (ici, on prend le devicePixelRatio)
                    setDprValue(window.devicePixelRatio || 1);
                } else {
                    setAnimate(false);
                    // Réduit la résolution lorsque l'objet est éloigné du viewport
                    setDprValue(0.5);
                }
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "100px" // Déclenche à 100px avant l'entrée dans le viewport
            }
        );
        if (containerRef.current) observer.observe(containerRef.current);
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
                style={{ width: "100%", height: "100%" }}
                dpr={dprValue} // Utilise l'état qui passe de basse à haute résolution
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

