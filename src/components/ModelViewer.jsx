import React, { useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Préchargement des modèles
useGLTF.preload("/tablet.glb", "/gltf/");
useGLTF.preload("/product_page.glb", "/gltf/");
useGLTF.preload("/wordpress_site.glb", "/gltf/");
useGLTF.preload("/ebook.glb", "/gltf/");
useGLTF.preload("/smartphone.glb", "/gltf/"); // ← nouvelle ligne


const RotatingModel = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath, true);
    const modelRef = useRef();
    const { gl } = useThree();

    // Par défaut, three.js charge les textures avec anisotropy: 1, ce qui les
    // rend plus floues dès que la texture (ex: capture d'écran sur le
    // mockup) est vue avec un léger angle — ce qui arrive en permanence ici
    // vu que le modèle oscille. On relève l'anisotropie au max supporté par
    // le GPU.
    useEffect(() => {
        const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
        scene.traverse((child) => {
            if (!child.isMesh || !child.material) return;
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((material) => {
                ["map", "normalMap", "roughnessMap", "metalnessMap"].forEach((key) => {
                    const texture = material[key];
                    if (texture) {
                        texture.anisotropy = maxAnisotropy;
                        texture.needsUpdate = true;
                    }
                });
            });
        });
    }, [scene, gl]);

    useFrame(({ clock }) => {
        if (!modelRef.current) return;
        const t = clock.elapsedTime;
        // Flottement vertical doux
        modelRef.current.position.y = Math.sin(t * 0.6) * 0.06;
        // Léger balancement gauche/droite (max ~8°)
        modelRef.current.rotation.y = Math.sin(t * 0.4) * 0.16;
        // Très légère inclinaison avant/arrière
        modelRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    });

    return <primitive ref={modelRef} object={scene} scale={0.55} />;
};

const ModelViewer = memo(({ modelPath }) => {
    const containerRef = useRef();

    const [shouldRender, setShouldRender] = useState(false);
    const [dprValue, setDprValue] = useState(1);
    const [animate, setAnimate] = useState(false);
    const [speed, setSpeed] = useState(0.005); // Même vitesse partout

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
                    // Fixé à 2 (et non dérivé de window.devicePixelRatio) :
                    // sur un écran standard (dpr=1), Math.min(dpr, 2) valait 1
                    // et ne suréchantillonnait donc jamais le rendu, ce qui
                    // laissait les textures (ex: capture d'écran sur le
                    // mockup) minifiées et floues. Une valeur fixe force le
                    // suréchantillonnage quel que soit l'écran, sans changer
                    // le cadrage/la taille apparente du modèle. Plafonné à 2
                    // pour rester raisonnable sur mobile, où un dpr élevé
                    // rendu en continu alourdit le thread principal et gêne
                    // le scroll tactile.
                    setDprValue(2);
                    setAnimate(true);
                } else {
                    setDprValue(1);
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
                    shadows={false}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 2, 3]} intensity={2} />
                    <RotatingModel modelPath={modelPath} speed={animate ? speed : 0} />
                </Canvas>
            )}
        </div>
    );
});

export default ModelViewer;
