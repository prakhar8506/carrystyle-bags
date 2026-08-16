import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Float } from '@react-three/drei';
import { StillBagModel } from './StillBagModel';
import { GiftBagModel } from './GiftBagModel';

interface StillBagSceneProps {
  variantId?: 'clear' | 'dawn' | 'dusk';
  isMobile?: boolean;
  useGlb?: boolean;
  idleMotion?: boolean;
  className?: string;
}

export const StillBagScene: React.FC<StillBagSceneProps> = ({
  variantId = 'clear',
  isMobile = false,
  useGlb = false,
  idleMotion = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCanvasVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      {isCanvasVisible && (
        <Canvas
          camera={{
            position: [0, 0.1, isMobile ? 5.8 : 4.8],
            fov: isMobile ? 46 : 40,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          frameloop={isCanvasVisible ? 'always' : 'never'}
        >
          <ambientLight intensity={0.9} color="#FAFAF8" />
          <directionalLight position={[5, 6, 5]} intensity={1.5} color="#FFEBB0" />
          <directionalLight position={[-5, 4, -2]} intensity={0.7} color="#BCD3D8" />

          <Suspense fallback={null}>
            <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
              {useGlb ? (
                <GiftBagModel scaleModifier={1.8} idleMotion={idleMotion} />
              ) : (
                <StillBagModel variantId={variantId} />
              )}
            </Float>

            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.5}
              scale={6.0}
              blur={2.0}
              far={3.5}
              color="#0F2242"
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.5}
          />
        </Canvas>
      )}
    </div>
  );
};
